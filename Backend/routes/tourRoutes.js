const express = require('express');
const tourController = require('../controllers/tourController');
const tour = require('../models/tourModel');
const authController = require('../controllers/authController');

const router = express.Router();

router.param('id', tourController.checkID);

router.route('/get-tour-states').get(tourController.getStats);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .all(authController.protect)
  .get(tourController.allTours)
  .post(
    authController.restrictTo('admin', 'lead-guide'),
    tourController.creatTour
  );

router
  .route('/:id')
  .all(authController.protect, authController.restrictTo('admin', 'lead-guide'))
  .get(tourController.getTour)
  .delete(tourController.deletTour)
  .patch(tourController.updateTour);

module.exports = router;
