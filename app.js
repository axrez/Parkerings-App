const SerialPort = require('serialport');

const express = require('express');
const app = express();

const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);


var parkeringsPlads = require('./server/dataBehandling');

// const Readline = SerialPort.parsers.Readline;
// const port = new SerialPort('COM7');
// const parser = port.pipe(new Readline());

var oldParkeringsData = [ 795, 355, 315, 499, 1345, 1321, 245, 331, 312, 244, 345, 499];
// var oldParkeringsData = [];
// exports.data = oldParkeringsData;
// var newParkeringsData = [];

// parser.on('data', (data) => {
// 	if (Number(data) == Number(999999)) {
// 		console.log("dataStart");
// 		return;
// 	}
// 	if (Number(data) == 888888) {
// 		oldParkeringsData = newParkeringsData;
// 		newParkeringsData = [];
// 		console.log("dataSlut");
// 		console.log(oldParkeringsData.length);
// 		return;
// 	}
// 	newParkeringsData.push(Number(data));
// 	console.log(data);
// });


app.get('/', (req, res) => {
	parkeringsPlads.ledigTjek(oldParkeringsData);
	res.send(parkeringsPlads.getData());
	console.log("Beep Boop");
});

io.on("connection", (socket) => {
	getDataAndEmit(socket);
	console.log("New client connected"); 
	let interval = setInterval(
		() => getDataAndEmit(socket),
		1000
	);
	socket.on("disconnect", () => {
		console.log("Client disconnected");
		clearInterval(interval);
	});
});


// io.on("connection", (socket) => {
// 	getDataAndEmit(socket);
// 	console.log("New client connected");
// 	socket.on("disconnect", () => console.log ("Client disconnected"));
// });

const getDataAndEmit = (socket) => {
	parkeringsPlads.ledigTjek(oldParkeringsData);
	socket.emit("openSpace", parkeringsPlads.getOpenSpace());
};

server.listen(3001, () => {
	console.log('Server started on port 3001...');
});