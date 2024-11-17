const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../models/tourModel');
const Review = require('../models/reviewModel');
const User = require('../models/userModel');

dotenv.config({ path: './config.env' });

// save as example.js
console.log(process.argv);

const DB =
  'mongodb+srv://isahil27582:1234@cluster0.b94t9.mongodb.net/IN-Tours?retryWrites=true';

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!'));

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
// );

const importData = async () => {
  try {
    // await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

importData();
