const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const isDev = app.settings.env === "development";
const URL = isDev ? "http://localhost:3000" : "";
app.use(cors({ origin: URL }));
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: URL,
});

io.on("connection", (socket) => {
	console.log("Connected to Client");

	socket.on("beginPath", (arg) => {
		socket.broadcast.emit("beginPath", arg);
	});

	socket.on("drawLine", (arg) => {
		socket.broadcast.emit("drawLine", arg);
	});

	socket.on("drawLineCompleted", () => {
		socket.broadcast.emit("drawLineCompleted");
	});

	socket.on("changeConfig", (arg) => {
		socket.broadcast.emit("changeConfig", arg);
	});

	socket.on("actionClick", (arg) => {
		socket.broadcast.emit("actionClick", arg);
	});
});

httpServer.listen(3001);
