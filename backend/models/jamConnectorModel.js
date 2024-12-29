const mongoose = require("mongoose");

const jamConnectorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  jam: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jam",
    },
  ],
});

module.exports = mongoose.model("JamConnector", jamConnectorSchema);
