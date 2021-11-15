import express from "express";
import { Server } from "socket.io";
import http from "http";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __dirname = path.resolve();

io.on("connection", (stream) => {
  console.log("Connected");
  stream.on("chat_message", (msg) => {
    console.log(stream.id);
    console.log(msg);
    stream.broadcast.emit("chat_message", msg);
  })
  stream.on("disconnect", () => console.log("Diconnected"));
});
io

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
