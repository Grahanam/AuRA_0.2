const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  picture: {
    url: {
      type: String,
    },
    filepath: {
      type: String,
    },
  },
  type: {
    type: String,
    default: "mood",
  },
});

module.exports = new mongoose.model("Mood", moodSchema);
