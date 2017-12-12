const SerialPort = require('serialport');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('COM7');
const parser = port.pipe(new Readline());

var oldParkeringsData = [];
var newParkeringsData = [];
parser.on('data', (data) => {
	if(Number(data) == Number(999999)){
		console.log("dataStart2s");
		return;
	}
	
	if(Number(data) == 888888){		
		oldParkeringsData = newParkeringsData;
		newParkeringsData =[];
		console.log("dataSlut");
		return;
	}
	
	newParkeringsData.push(Number(data));	
	console.log(data);
});


app.get('/',(req, res) => {
	res.send(oldParkeringsData);
});

app.get('/new',(req,res) =>{
	res.send(newParkeringsData);
});

app.get('/length',(req, res) => {
	res.send(String(oldParkeringsData.length));
});

app.listen(3200, () => {
	console.log('Server started on port 3200...');
});