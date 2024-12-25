const express = require("express");

const router = express.Router();
const path = require("path");

const multer = require("multer");

// Configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

const jamModel = require("../models/jamModel");

//firebase
const UUID = require("uuid-v4");
const bucket = require("../firebaseadmin");
const admin = require("firebase-admin");
const uploadFile = require("../firebasestorage/upload");
const trackModel = require("../models/trackModel");

//Create jam
router.post("/", async (req, res) => {
  try {
    let jam;
    if (!req.file) {
      jam = new jamModel({
        title: req.body.title,
        picture: "",
        filepath: "",
        user: req.body.user,
        tracks: [],
      });
      // jam=await jamModel.findByIdAndUpdate(req.body.id,req.body,{new:true})
      await jam.save();
      //  console.log(jam)
    } else {
      // console.log(file)
      const filename = `aura/jam_pic/${Date.now()}_${req.file.originalname}`;
      const uuid = UUID();
      const fileURL = await uploadFile(
        req.file.buffer,
        filename,
        req.file.mimetype,
        uuid
      );
      //unique filename

      //genre object
      jam = new jamModel({
        title: req.body.title,
        picture: fileURL,
        filepath: filename,
        user: req.body.user,
        tracks: req.body.tracks,
      });
      //console.log(genre)
      //saving object to database
      await jam.save();
    }
    res.status(200).json({ message: "jam Saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/update", upload.single("file"), async (req, res) => {
  try {
    // console.log(req.body)
    if (!req.file) {
      const jam = await jamModel.findByIdAndUpdate(req.body.id, req.body, {
        new: true,
      });
      //  console.log(jam)
    } else {
      const jam = await jamModel.findById(req.body.id);

      await bucket.file(jam.filepath).delete();

      const filename = `aura/jam_pic/${Date.now()}_${req.file.originalname}`;
      const uuid = UUID();
      const fileURL = await uploadFile(
        req.file.buffer,
        filename,
        req.file.mimetype,
        uuid
      );
      jam.picture = fileURL;
      jam.filepath = filename;
      const updatejam = await jamModel.findByIdAndUpdate(artist._id, artist, {
        new: true,
      });
    }
    res.status(200).json({ message: "jam Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    // console.log(req.params.id)
    //find genre in database using id
    const jam = await jamModel.findById(req.params.id);

    //delete picture object in firebase bucket
    await bucket.file(jam.filepath).delete();
    console.log("deleted successfully");
    //delete artist in database
    const jamdelete = await jamModel.findByIdAndDelete(jam._id);
    res.status(200).json("jam deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
});

router.get("/single/:id", async (req, res) => {
  try {
    const jam = await jamModel.findById(req.params.id).populate("tracks");
    console.log(jam);

    res.status(200).json({ data: jam, message: "Single jam successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: err, message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    let query = null;
    if (req.query.q) {
      query = { name: { $regex: req.query.q, $options: "i" } };
    }
    const jam = await jamModel.find(query);

    res.status(200).json({ data: jam, message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: err, message: "Internal Server Error!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const jam = await jamModel.find({ user: req.params.id });
    console.log("check this line");
    console.log(req.params.id, jam);
    res.status(200).json({ data: jam, message: "success" });
  } catch (err) {
    // console.log(err)
    res.status(500).json({ data: err, message: "Internal Server Error!" });
  }
});

router.put("/add/:id", async (req, res) => {
  try {
    // console.log(req.body)
    const jam = await jamModel.findById(req.params.id);
    const track = await trackModel.findById(req.body.id);
    if (!jam || !track) {
      res.status(500).json({ message: "jam not found" });
    }
    jam.tracks.push(track);
    await jam.save();

    res.status(200).json({ message: "song Added successfully" });
  } catch (err) {
    res.status(500).json({ data: err, message: "Internal Server Error!" });
  }
});

router.put("/remove/:id", async (req, res) => {
  try {
    // console.log(req.body)
    const jam = await jamModel.findById(req.params.id);
    const trackid = req.body.track;
    if (!jam) {
      res.status(500).json({ message: "jam not found" });
    }

    const trackIndex = jam.tracks.findIndex(
      (track) => track.toString() === trackid
    );

    if (trackIndex === -1) {
      res.status(500).json({ message: "Track not found in the jam" });
      return;
    }

    // Remove the track from the jam's tracks array
    jam.tracks.splice(trackIndex, 1);

    await jam.save();

    res.status(200).json({ message: "Track removed successfully" });
  } catch (err) {
    res.status(500).json({ data: err, message: "Internal Server Error!" });
  }
});

module.exports = router;
