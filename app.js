const SerialPort = require('serialport');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const io = require('socket.io')();


var parkeringsPlads = require('./server/dataBehandling');

const app = express();

// const Readline = SerialPort.parsers.Readline;
// const port = new SerialPort('COM7');
// const parser = port.pipe(new Readline());

var oldParkeringsData = [ 795, 655, 615, 499, 1345, 5321]; 
exports.data = oldParkeringsData;
var newParkeringsData = [];
// parser.on('data', (data) => {
// 	if(Number(data) == Number(999999)){
// 		console.log("dataStart");
// 		return;
// 	}
	
// 	if(Number(data) == 888888){		
// 		oldParkeringsData = newParkeringsData;
// 		newParkeringsData =[];
// 		console.log("dataSlut");
// 		return;
// 	}
	
// 	newParkeringsData.push(Number(data));	
// 	console.log(data);
// });


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

setInterval(() =>{
	io.emit("data", parkeringsPlads.getData());
}, 30 * 1000);

app.listen(3001, () => {
	console.log('Server started on port 3001...');
});