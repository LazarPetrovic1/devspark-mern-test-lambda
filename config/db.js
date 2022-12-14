const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log("Mongo DB connected...");
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

module.exports = connectDB;