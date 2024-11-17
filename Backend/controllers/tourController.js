const tour = require('../models/tourModel');
const Tour = require('../models/tourModel');
const ApiFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handler');

exports.allTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, { path: 'guides' });
exports.creatTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deletTour = factory.deleteOne(Tour);

exports.getStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: '$difficulty',
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
    ]);

    console.log('Hello');
    res.status(200).json({
      status: 'Success',
      data: {
        stats,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: 'Failed',
      message: e.message,
    });
  }
};

exports.checkID = (req, res, next, val) => {
  if (!val) {
    res.status(404).json({
      status: 'Failed',
      message: 'No id Found',
    });
  }
  next();
};

//Geo Location
// /tours-within/233/center/34.111745,-118.113491/unit/mi

exports.getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    return next(new AppError('Provide Valid Lat-Lng or Change its order', 404));
  }

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: 'Success',
    data: {
      tours,
    },
  });
});

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitutr and longitude in the format lat,lng.',
        400
      )
    );
  }

  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $addFields: {
        distance: {
          $round: [{ $toDouble: '$distance' }, 2],
        },
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: distances,
    },
  });
});
