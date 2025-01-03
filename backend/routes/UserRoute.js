const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const userModel = require("../models/userModel");

router.post("/googletoken", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token.credential,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload.sub;
    console.log(payload, userId);
    console.log("Google token verified for user ID:", userId);
    const finduser = await userModel.findOne({ googleid: userId });
    let data = null;
    if (finduser) {
      data = {
        token: null,
        userid: finduser._id,
        googleid: finduser.googleid,
        mailid: finduser.mailid,
        fullname: finduser.fullname,
        picture: payload.picture,
      };
    } else {
      const newUser = new userModel({
        googleid: payload.sub,
        mailid: payload.email,
        fullname: payload.name,
        picture: payload.picture,
      });
      const response = await newUser.save();
      console.log(response);
      data = {
        token: null,
        timestamp: null,
        userid: response._id,
        googleid: newUser.googleid,
        mailid: newUser.mailid,
        fullname: newUser.fullname,
        picture: payload.picture,
      };
    }
    const tokenexpirationstamp = Math.floor(Date.now() / 1000) + 43200;
    const createtoken = await jwt.sign(
      { googleid: data.googleid, exp: tokenexpirationstamp },
      secret_key
    );

    data.token = createtoken;
    data.timestamp = tokenexpirationstamp;
    res.status(200).json({ data: data, message: "Googl Auth Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/user/search", async (req, res) => {
  try {
    let query = null;
    if (req.query.q) {
      query = { fullname: { $regex: req.query.q, $options: "i" } };
    }
    const users = await userModel.find(query);

    res.status(200).json({ data: users, message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: err, message: "Internal Server Error!" });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json({ data: user, message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: err, message: "Internal Server Error!" });
  }
});

module.exports = router;
