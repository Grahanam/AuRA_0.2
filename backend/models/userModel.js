const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleid: {
    type: String,
    require: true,
  },
  mailid: {
    type: String,
    require: true,
  },
  fullname: {
    type: String,
    require: true,
  },
  picture: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("UserG", userSchema);
