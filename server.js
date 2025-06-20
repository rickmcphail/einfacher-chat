const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

let messages = [];

io.on("connection", (socket) => {
  console.log("Ein Benutzer ist verbunden");

  socket.emit("chat history", messages);

  socket.on("chat message", (data) => {
    messages.push(data);
    io.emit("chat message", data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
