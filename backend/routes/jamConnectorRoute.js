const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const UUID = require("uuid-v4");
const bucket = require("../firebaseadmin");
const admin = require("firebase-admin");
const uploadFile = require("../firebasestorage/upload");

//S3 Admin sdk
const s3 = require("../s3/s3");

// Configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

//Genre Model
const jamConnectorModel = require("../models/jamConnectorModel");

const bucketName = process.env.S3_BUCKET;
const bucketRegion = process.env.S3_REGION;

//Filename generator
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

//S3 bucket upload object
const uploadfile = (file, fileName) => {
  let params = {
    Bucket: bucketName,
    Key: fileName + file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  return (command = new PutObjectCommand(params));
};

//S3 bucket delete object
const deletefile = (url) => {
  const urlsegment = url.split("/");
  const filename = urlsegment[urlsegment.length - 1];
  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: filename,
  });
  return deleteObjectCommand;
};

//Create Genre
router.post("/", async (req, res) => {
  try {
    const { user, jam } = req.body;
    const jamConnector = new jamConnectorModel({
      user: user,
      jam: jam,
    });
    await jamConnector.save();
    res.status(200).json({ message: "Jamconnector Saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const jamConnector = await jamConnectorModel.find({ user: req.params.id });

    res.status(200).json({ data: jamConnector, message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: err, message: "Internal Server Error!" });
  }
});

router.put("/update", upload.single("file"), async (req, res) => {
  try {
    // console.log(req.body)

    if (!req.file) {
      const genre = await jamConnectorModel.findByIdAndUpdate(
        req.body.id,
        req.body,
        { new: true }
      );
      console.log(genre);
    } else {
      const genre = await jamConnectorModel.findById(req.body.id);
      await bucket.file(genre.filepath).delete();
      // const deleteObjectCommand=deletefile(genre.picture)
      // const deleteresponse=await s3.send(deleteObjectCommand)
      console.log("deleted successfully");
      const filename = `aura/genre_pic/${Date.now()}_${req.file.originalname}`;
      const uuid = UUID();
      const fileURL = await uploadFile(
        req.file.buffer,
        filename,
        req.file.mimetype,
        uuid
      );
      genre.picture = fileURL;
      genre.filepath = filename;
      const updategenre = await jamConnectorModel.findByIdAndUpdate(
        genre._id,
        genre,
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
    const jamConnector = await jamConnectorModel.findById(req.params.id);
    //delete picture ojbect in s3 bucket
    await bucket.file(jamConnector.filepath).delete();
    // const deleteObjectCommand=deletefile(jamConnector.picture)
    // const deleteresponse=await s3.send(deleteObjectCommand)
    console.log("deleted successfully");
    //delete jamConnector in database
    const jamConnectordelete = await jamConnectorModel.findByIdAndDelete(
      jamConnector._id
    );
    res.status(200).json("jamConnector deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
});

router.get("/single/:id", async (req, res) => {
  try {
    const genre = await jamConnectorModel.findById(req.params.id);
    res.status(200).json({ data: genre, message: "success" });
  } catch (err) {
    // console.log(err)
    res.status(500).json({ data: err, message: "Internal Server Error" });
  }
});

module.exports = router;
