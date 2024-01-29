const mongoose = require("mongoose");

const allListSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const AllLists = mongoose.model("lists", allListSchema);

module.exports = AllLists;
