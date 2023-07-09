const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  content: String
},{
  timestamps: true
});

module.exports = mongoose.model("Blog",BlogSchema)
