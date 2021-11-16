import express from "express";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import Mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    allowedHeaders: "*",
    credentials: true,
  },
});
const uri = `mongodb+srv://admin:admin@cluster0.uj1ij.mongodb.net/scorecard`;
const __dirname = path.resolve();
const scoreSchema = new Mongoose.Schema({
  side1: {
    name: String,
    batting: Boolean,
  },
  side2: {
    name: String,
    batting: Boolean,
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
  side1: {
    name: "Australia",
    batting: true,
  },
  side2: { name: "Pakistan", batting: false },
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
app.get("/", (req,res) => {
  res.sendFile(__dirname + '/web/build')
})
app.get("/score", (req, res, next) => {
  res.status(200).json({
    side1: scores.side1,
    side2: scores.side2,
    wickets: scores.wickets,
    runs: scores.runs,
    batting: scores.batting,
    overs: 50,
    bowling: scores.bowling,
  });
});
app.post("/score", (req, res, next) => {
  const data = req.body;
  console.log(data);
  scores.side1 = {
    name: req.body.side1.name ? req.body.side1.name : scores.side1.name,
    batting: req.body.side1.batting
      ? req.body.side1.batting
      : scores.side1.batting,
  };
  scores.side2 = {
    name: req.body.side2.name ? req.body.side2.name : scores.side2.name,
    batting: req.body.side2.batting
      ? req.body.side2.batting
      : scores.side2.batting,
  };
  scores.wickets = req.body.wickets ? req.body.wickets : scores.wickets;
  scores.runs = req.body.runs ? req.body.runs : scores.runs;
  scores.batting = {
    bat1: {
      name: req.body.batting.bat1?.name
        ? req.body.batting.bat1.name
        : scores.batting.bat1.name,
      score: req.body.batting.bat1?.score
        ? req.body.batting.bat1.score
        : scores.batting.bat1.score,
    },
    bat2: {
      name: req.body.batting.bat2.name
        ? req.body.batting.bat2.name
        : scores.batting.bat2.name,
      score: req.body.batting.bat2.score
        ? req.body.batting.bat2.score
        : scores.batting.bat2.score,
    },
    onStrike: req.body.batting.onStrike
      ? req.body.batting.onStrike
      : scores.batting.onStrike,
  };
  (scores.overs = req.body.overs ? req.body.overs : scores.overs),
    (scores.bowling = {
      currBowler: req.body.bowling.currBowler
        ? req.body.bowling.currBowler
        : scores.bowling.currBowler,
      oversBowled: req.body.bowling.oversBowled
        ? req.body.bowling.oversBowled
        : scores.bowling.oversBowled,
      wicketsTaken: req.body.bowling.wicketsTaken
        ? req.body.bowling.wicketsTaken
        : scores.bowling.wicketsTaken,
    });
  // scores =
  //   side1: {
  //     name: req.body.side1.name ? req.body.side1.name : scores.side1.name,
  //     batting: req.body.side1.batting
  //       ? req.body.side1.batting
  //       : scores.side1.batting,
  //   },
  //   side2: {
  //     name: req.body.side2.name ? req.body.side2.name : scores.side2.name,
  //     batting: req.body.side2.batting
  //       ? req.body.side2.batting
  //       : scores.side2.batting,
  //   },
  //   wickets: req.body.wickets ? req.body.wickets : scores.wickets,
  //   runs: req.body.runs ? req.body.runs : scores.runs,
  //   batting: {
  //     bat1: {
  //       name: req.body.batting.bat1?.name ? req.body.batting.bat1.name : scores.batting.bat1.name,
  //       score: req.body.batting.bat1?.score ? req.body.batting.bat1.score : scores.batting.bat1.score,
  //     },
  //     bat2: {
  //       name: req.body.batting.bat2.name ? req.body.batting.bat2.name : scores.batting.bat2.name,
  //       score: req.body.batting.bat2.score ? req.body.batting.bat2.score : scores.batting.bat2.score,
  //     },
  //     onStrike: req.body.onStrike ? req.body.onStrike : scores.onStrike,
  //   },
  //   overs: req.body.overs ? req.body.overs : scores.overs,
  //   bowling: {
  //     currBowler: req.body.bowling.currBowler
  //       ? req.body.bowling.currBowler
  //       : scores.bowling.currBowler,
  //     oversBowled: req.body.bowling.oversBowled
  //       ? req.body.bowling.oversBowled
  //       : scores.bowling.oversBowled,
  //     wicketsTaken: req.body.bowling.wicketsTaken
  //       ? req.body.bowling.wicketsTaken
  //       : scores.bowling.wicketsTaken,
  //   },
  // };
  scores
    .save()
    .then(() => {
      io.emit("chat_message", "updated");
      res.status(200).json({
        message: "Updated ",
      });
    })
    .catch((err) => {
      console.error(err.message);
    });
});
Mongoose.connect(uri, { useUnifiedTopology: true })
  .then(() => {
    server.listen(5000, () => {
      console.log("listening on *:5000");
    });
    console.log("Database connected");
    console.log(scores);
    scores.save((err) => {
      if (err) console.error(err);
    });
  })
  .catch((err) => {
    console.error("Could not connect to database");
    console.error(err);
  });
