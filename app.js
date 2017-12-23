const SerialPort = require('serialport');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);


var parkeringsPlads = require('./server/dataBehandling');

const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('COM7');
const parser = port.pipe(new Readline());

// var oldParkeringsData = [ 795, 355, 315, 499, 1345, 5321];
var oldParkeringsData = [];
exports.data = oldParkeringsData;
var newParkeringsData = [];
parser.on('data', (data) => {
	if(Number(data) == Number(999999)){
		console.log("dataStart");
		return;
	}
	
	if(Number(data) == 888888){		
		oldParkeringsData = newParkeringsData;
		newParkeringsData =[];
		console.log("dataSlut");
		// fyr en io.emit ind her
		return;
	}
	
	newParkeringsData.push(Number(data));	
	console.log(data);
});


app.get('/',(req, res) => {
	// if(!parkeringsPlads){
	// 	parkeringsPlads = require('./server/dataBehandling');	
	// }
	parkeringsPlads.ledigTjek(oldParkeringsData);
	res.send(parkeringsPlads.getData());
	console.log("Beep Boop");
});

app.get('/data',(req, res) => {
	parkeringsPlads.ledigTjek(oldParkeringsData);
	res.send(parkeringsPlads.getData());
	console.log("Beep Boop");
});

app.get('/new',(req,res) =>{
	res.send(newParkeringsData);
});

app.get('/length',(req, res) => {
	res.send(String(oldParkeringsData.length));
});

app.get('/test', (req, res) => {
	parkeringsPlads.ledigTjek(oldParkeringsData);
	res.send(parkeringsPlads.getOpenSpace());
});

io.on("connection", (socket) => {
	getDataAndEmit(socket);
	console.log("New client connected"), setInterval(
		() => getDataAndEmit(socket),
		30000
	);
	socket.on("disconnect", () => console.log ("Client disconnected"));
});

function getDataAndEmit(socket) {
	parkeringsPlads.ledigTjek(oldParkeringsData);
	socket.emit("openSpace", parkeringsPlads.getOpenSpace());
	// socket.emit("pPladser", JSON.stringify(parkeringsPlads.getData())); //get let pPladser
};


// setInterval(() =>{
// 	io.emit("data", parkeringsPlads.getData());
// }, 30 * 1000);

server.listen(3001, () => {
	console.log('Server started on port 3001...');
});