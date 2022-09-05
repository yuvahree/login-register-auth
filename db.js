const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //console.log("hello", process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URL);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
