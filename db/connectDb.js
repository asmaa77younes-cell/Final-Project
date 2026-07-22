const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const config = require("../config/config");
    await mongoose.connect(config.MONGO_URI, {
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDb;