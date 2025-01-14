const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  name: {
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
  audio: {
    url: {
      type: String,
    },
    filepath: {
      type: String,
    },
  },
  duration: {
    type: Number,
  },
  artist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
    },
  ],
  genre: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
  mood: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mood",
    },
  ],
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
  },
  track_number: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    default: "track",
  },
});

module.exports = mongoose.model("Track", trackSchema);
