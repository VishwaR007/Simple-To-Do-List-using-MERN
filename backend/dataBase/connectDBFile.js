const mongoose = require("mongoose");

// Connect DB :
mongoose.connect("mongodb://localhost:27017/to-do-list");

const connectDb = async () => {
  try {
    console.log("Connection done to DB");
  } catch {
    console.log("DB Connection Failed");
    process.exit(0);
  }
};

module.exports = connectDb;
