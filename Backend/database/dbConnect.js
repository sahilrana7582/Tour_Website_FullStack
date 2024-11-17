const mongoose = require('mongoose');

const URL = process.env.URL;

const dbConnect = async () => {
  try {
    await mongoose.connect(URL);
    console.log('Database Connected');
  } catch (e) {
    console.log(e, 'DB Connection');
  }
};

module.exports = dbConnect;
