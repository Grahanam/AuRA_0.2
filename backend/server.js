require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");

const { Server } = require("socket.io");
const path = require("path");
const saltedMd5 = require("salted-md5");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const port = process.env.PORT || 4000;
const url = process.env.url;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow this origin
    methods: ["GET", "POST"], // Allow these HTTP methods
    credentials: true, // Allow credentials (optional)
  },
});

const UserRoute = require("./routes/UserRoute");
const trackRoute = require("./routes/trackRoute");
const artistRoute = require("./routes/artistRoute");
const genreRoute = require("./routes/genreRoute");
const playlistRoute = require("./routes/playlistRoute");
const albumRoute = require("./routes/albumRoute");
const jamRoute = require("./routes/jamRoute");
const jamConnectorRoute = require("./routes/jamConnectorRoute");

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Routers
app.use("/api/", UserRoute);
app.use("/api/track", trackRoute);
app.use("/api/genre", genreRoute);
app.use("/api/artist", artistRoute);
app.use("/api/playlist", playlistRoute);
app.use("/api/album", albumRoute);
app.use("/api/jam", jamRoute);
app.use("/api/jamConnector", jamConnectorRoute);

//frontend Static page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

//Jam Socket connect

const jamModel = require("./models/jamModel");
const jamConnectorModel = require("./models/jamConnectorModel");

const jamUsers = {};
const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.user;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  console.log("New client connected:", socket.id);

  socket.on("create-jam", async (jam, callback) => {
    try {
      const newJam = new jamModel({
        title: jam.title,
        user: jam.user,
        tracks: [],
        users: jam.users,
      });
      await newJam.save();
      console.log(newJam);
      console.log(userSocketMap);
      for (let x of jam.users) {
        if (x in userSocketMap) {
          console.log("user found", x);
          let connector = await jamConnectorModel.findOne({
            user: x,
          });
          if (!connector) {
            connector = new jamConnectorModel({
              user: req.params.id,
              jam: [newJam._id],
            });
            connector = await connector.save();
          } else {
            connector.jam.push(newJam._id);
            await connector.save();
          }
          io.to(userSocketMap[x]).emit("jam-connector", newJam);
        } else {
          let connector = await jamConnectorModel.findOne({
            user: x,
          });
          if (!connector) {
            connector = new jamConnectorModel({
              user: req.params.id,
              jam: [newJam._id],
            });
            connector = await connector.save();
            io.to(userSocketMap[x]).emit("jam-connector", newJam);
          } else {
            if (!connector.jam.includes(newJam._id)) {
              connector.jam.push(newJam._id); // Add only if it's not already present
              await connector.save();
              io.to(userSocketMap[x]).emit("jam-connector", newJam);
            } else {
              console.log("Jam already connected for this user.");
            }
          }
        }
      }
      // Send a success response with the created jam's ID
      callback({
        success: true,
        id: newJam._id,
      });
    } catch (error) {
      console.log(error, "error creating jam");
      callback({
        success: false,
        error: error.message,
      });
    }
  });

  socket.on("join-jam", async ({ jamId, token }) => {
    try {
      const jam = await jamModel.findById(jamId);

      if (!jam) {
        // If the jam does not exist, emit an error or handle appropriately
        socket.emit("error", { message: "Jam not found" });
        console.log(
          `User ${token.fullname} attempted to join non-existent jam: ${jamId}`
        );
        return;
      }

      // If the jam exists, allow the user to join
      socket.join(jamId);
      console.log(
        `Connected with socket id: ${socket.id}, jamId: ${jamId}, user: ${token.fullname}`
      );
    } catch (error) {
      console.log(error);
    }

    // Initialize the jam in the jamUsers object if it doesn't exist
    if (typeof jamUsers[jamId] === "undefined") {
      console.log(`Initializing jamUsers for jamId: ${jamId}`);
      jamUsers[jamId] = [];
    }

    // Check if the user is already in the jam to prevent duplicate entries
    const existingUser = jamUsers[jamId].find(
      (user) => user.token.userid === token.userid
    );
    if (!existingUser) {
      console.log(`Adding new user ${token.fullname} to jam ${jamId}`);
      jamUsers[jamId].push({ id: socket.id, token, status: true });

      // Notify other users in the jam that a new user has joined
      socket.to(jamId).emit("user-joined", token.fullname);
      // socket.broadcast.to(jamId).emit('user-joined', username);
      console.log(
        `Notified other users in jam ${jamId} of new user ${token.fullname}`
      );
    } else {
      for (user of jamUsers[jamId]) {
        if (user["token"].userid == token.userid) {
          user["id"] = socket.id;
          user.status = true;
        }
      }
      const userid = token.userid;
      socket.to(jamId).emit("useronline", { userid, jamId });
      console.log(
        `User ${token.fullname} already in jam ${jamId}, not re-adding or notifying.`
      );
    }
    console.log(JSON.stringify(jamUsers));
    let arr = jamUsers[jamId].map((user) => ({
      token: user.token,
      status: user.status,
    }));
    console.log(arr);
    //Broadcast the list of connected users to everyone in the jam except him
    io.in(jamId).emit(
      "connected-users",
      jamUsers[jamId].map((user) => ({
        token: user.token,
        status: user.status,
      }))
    );
    // send array of UserNames

    //send updated playlist
    const jam = await jamModel.findById(jamId).populate({
      path: "tracks",
      populate: {
        path: "artist",
        model: "Artist",
      },
    });
    io.in(jamId).emit("added-tracks", jam.tracks);
  });

  socket.on("add-user", async ({ jam, nuser }) => {
    console.log("shit");
    console.log(nuser, jam);
    try {
      if (nuser._id in userSocketMap) {
        let connector = await jamConnectorModel.findOne({
          user: nuser._id,
        });
        if (!connector) {
          connector = new jamConnectorModel({
            user: nuser._id,
            jam: [jam._id],
          });
          connector = await connector.save();
        } else {
          if (!connector.jam.includes(jam._id)) {
            connector.jam.push(jam._id); // Add only if it's not already present
            await connector.save();
            io.to(userSocketMap[nuser._id]).emit("jam-connector", jam);
          } else {
            console.log("Jam already connected for this user.");
          }
        }
      } else {
        let connector = await jamConnectorModel.findOne({
          user: nuser._id,
        });
        if (!connector) {
          connector = new jamConnectorModel({
            user: nuser._id,
            jam: [jam._id],
          });
          connector = await connector.save();
          io.to(userSocketMap[nuser._id]).emit("jam-connector", jam);
        } else {
          if (!connector.jam.includes(jam._id)) {
            connector.jam.push(jam._id); // Add only if it's not already present
            await connector.save();
            io.to(userSocketMap[nuser._id]).emit("jam-connector", jam);
          } else {
            console.log("Jam already connected for this user.");
          }
        }
      }
    } catch (error) {}
  });

  socket.on("add-track", async ({ jamId, track }) => {
    try {
      // Check if the jam exists
      const jam = await jamModel.findById(jamId).populate("tracks");
      if (!jam) {
        socket.emit("error", { message: "Jam not found" });
        console.log(`Jam ${jamId} not found.`);
        return;
      }
      // Add the track to the jam's playlist
      jam.tracks.push(track);
      await jam.save(); // Save updated jam to the database
      console.log(`Track "${track}" added to jam ${jamId}.`);

      // Broadcast updated playlist to all users in the jam room
      io.in(jamId).emit("added-tracks", jam.tracks);
    } catch (error) {
      console.error("Error adding track:", error);
      socket.emit("error", { message: "Failed to add track." });
    }
  });

  socket.on("remove-track", async ({ jamId, trackId }) => {
    try {
      // console.log(req.body)
      const jam = await jamModel.findById(jamId);
      if (!jam) {
        res.status(500).json({ message: "jam not found" });
      }

      const trackIndex = jam.tracks.findIndex(
        (track) => track.toString() === trackId
      );

      if (trackIndex === -1) {
        socket.emit("error", { message: "track not found." });
        return;
      }

      // Remove the track from the jam's tracks array
      jam.tracks.splice(trackIndex, 1);

      await jam.save();
      io.in(jamId).emit("added-tracks", jam.tracks);
    } catch (err) {
      console.error("Error removing track:", error);
      socket.emit("error", { message: "Failed to remove track." });
    }
  });

  socket.on("current-track", ({ jamId, track }) => {
    try {
      console.log(`Received current track for jam ${jamId}:`, track);

      // Broadcast the track to all users in the room except the sender
      socket.to(jamId).emit("current-track", track);
    } catch (error) {
      console.error("Error broadcasting current track:", error);
    }
  });

  socket.on("leave-room", ({ jamId, token }) => {
    socket.leave(jamId);
    console.log(`User  ${token.fullname}  left from Room: ${jamId}`);
    // Remove the user from the room list
    jamUsers[jamId] = jamUsers[jamId].filter(
      (user) => user.token.userid !== token.userid
    );

    // Notify other users in the room
    socket.to(jamId).emit("user-left", token);

    // Update the list of connected users in Current ROOM // Broadcasting not on all available rooms
    io.in(jamId).emit(
      "connected-users",
      jamUsers[jamId].map((user) => ({
        token: user.token,
        status: user.status,
      }))
    );
  });

  socket.on("disconnect", () => {
    let token, jamId;
    console.log(socket.id);
    console.log(jamUsers);
    for (user in jamUsers) {
      for (x of jamUsers[user]) {
        console.log(x);
        if (x["id"] == socket.id) {
          token = x["token"];
          jamId = user;
        }
      }
    }
    socket.to(jamId).emit("useroffline", { token });
    if (jamId in jamUsers) {
      for (user of jamUsers[jamId]) {
        if (user.token.userid == token.userid) {
          user.status = false;
        }
      }
    }
    if (jamId in jamUsers) {
      io.in(jamId).emit(
        "connected-users",
        jamUsers[jamId].map((user) => ({
          token: user.token,
          status: user.status,
        }))
      );
    }
    delete userSocketMap[userId];
    console.log("User disconnected");
  });
});

//starting server
server.listen(port, () => {
  console.log(`Listening on port:${port}`);
});

//Database
mongoose.connect(url);
const db = mongoose.connection;
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB");
});
