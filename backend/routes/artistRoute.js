const express = require("express");

const multer = require("multer");

const UUID = require("uuid-v4");
const bucket = require("../firebaseadmin");
const admin = require("firebase-admin");
const uploadFile = require("../firebasestorage/upload");
// Configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();
const artistModel = require("../models/artistModel");

//Create Artist
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const filename = `aura/artist_img/${Date.now()}_${req.file.originalname}`;
    const uuid = UUID();
    const fileURL = await uploadFile(
      req.file.buffer,
      filename,
      req.file.mimetype,
      uuid
    );
    const artist = new artistModel({
      name: req.body.name,
      picture: {
        url: fileURL,
        filepath: filename,
      },
    });
    await artist.save();
    res.status(200).json({ message: "Artist Saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    let query = null;
    let artist = null;
    if (req.query.q) {
      query = { name: { $regex: req.query.q, $options: "i" } };
      artist = await artistModel.find(query);
    } else {
      // artist = await artistModel.find(query).limit(5);
      artist = await artistModel.aggregate([
        { $sample: { size: 5 } }, // Get 4 random tracks
      ]);
    }
    res.status(200).json({ data: artist, message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: err, message: "Internal Server Error!" });
  }
});

router.put("/update", upload.single("file"), async (req, res) => {
  try {
    // console.log(req.body)

    if (!req.file) {
      const artist = await artistModel.findByIdAndUpdate(
        req.body.id,
        req.body,
        { new: true }
      );
      console.log(artist);
    } else {
      const artist = await artistModel.findById(req.body.id);

      await bucket.file(artist.filepath).delete();

      const filename = `aura/artist_pic/${Date.now()}_${req.file.originalname}`;
      const uuid = UUID();
      const fileURL = await uploadFile(
        req.file.buffer,
        filename,
        req.file.mimetype,
        uuid
      );
      artist.picture = fileURL;
      artist.filepath = filename;
      const updateartist = await artistModel.findByIdAndUpdate(
        artist._id,
        artist,
        { new: true }
      );
    }
    res.status(200).json({ message: "Genre Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    // console.log(req.params.id)
    //find genre in database using id
    const artist = await artistModel.findById(req.params.id);

    //delete picture object in firebase bucket
    await bucket.file(artist.filepath).delete();
    console.log("deleted successfully");
    //delete artist in database
    const artistdelete = await artistModel.findByIdAndDelete(artist._id);
    res.status(200).json("Genre deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
});

router.get("/single/:id", async (req, res) => {
  try {
    const artist = await artistModel.findById(req.params.id);
    res.status(200).json({ data: artist, message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: err, message: "Internal Server Error" });
  }
});

module.exports = router;
