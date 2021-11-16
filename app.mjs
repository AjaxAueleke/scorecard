import express from "express";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import Mongoose from "mongoose";
import { StringDecoder } from "string_decoder";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const uri = `mongodb+srv://admin:admin@cluster0.uj1ij.mongodb.net/scorecard`;
const __dirname = path.resolve();
const scoreSchema = new Mongoose.Schema({
  side1: {
    name: String,
    batting: Boolean,
    bowling: Boolean,
  },
  side2: {
    name: String,
    batting: Boolean,
    bowling: Boolean,
  },
  wickets: {
    type: Number,
  },
  runs: {
    type: Number,
  },
  batting: {
    bat1: {
      name: String,
      score: Number,
    },
    bat2: {
      name: String,
      score: Number,
    },
    onStrike: Number,
  },
  overs: {
    type: Number,
  },
  bowling: {
    currBowler: String,
    oversBowled: Number,
    wicketTaken: Number,
  },
});

const scoreCardModel = Mongoose.model("Scorecard", scoreSchema);
const scores = new scoreCardModel({
  side1: "Australia",
  side2: "Pakistan",
  wickets: 5,
  runs: 110,
  batting: {
    bat1: { name: "Babar Azam", score: 56 },
    bat2: { name: "Muhammad Rizwan", score: 95 },
    onStrike: 1,
  },
  overs: 50,
  bowling: {
    currBowler: "Imran Tahir",
    oversBowled: 10,
    wicketsTaken: 5,
  },
});

io.on("connection", (stream) => {
  console.log("Connected");
  stream.on("chat_message", (msg) => {
    console.log(stream.id);
    console.log(msg);
    stream.broadcast.emit("chat_message", msg);
  });
  stream.on("disconnect", () => console.log("Diconnected"));
});
app.get("/score", (req, res, next) => {
  res.status(200).json({
    side1: user.side1,
    side2: user.side2,
    wickets: user.wickets,
    runs: user.runs,
    batting: user.batting,
    overs: 50,
    bowling: user.bowling,
  });
});

Mongoose.connect(uri, { useUnifiedTopology: true })
  .then(() => {
    server.listen(5000, () => {
      console.log("listening on *:5000");
    });
    console.log("Database connected");
    scores.save((err) => {
      if (err) console.error(err);
    });
  })
  .catch((err) => {
    console.error("Could not connect to database");
    console.error(err);
  });
