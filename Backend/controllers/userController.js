const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'Sucess',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  res.status(200).json({
    status: 'Sucess',
    data: {
      user,
    },
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.status(200).json({
    status: 'Sucess',
    data: {
      user,
    },
  });
});
exports.deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);
  res.status(200).json({
    status: 'Sucess',
    data: {
      Msg: 'Delete All User',
    },
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: 'Sucess',
    data: {
      user,
    },
  });
});
