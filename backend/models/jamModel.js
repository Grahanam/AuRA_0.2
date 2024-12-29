const mongoose = require("mongoose");

const jamSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserG",
  },
  tracks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Track",
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserG",
    },
  ],
});

module.exports = mongoose.model("Jam", jamSchema);
