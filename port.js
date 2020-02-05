var socket_io = require('socket.io');
var io = socket_io();
var myPorts = {};

myPorts.io = io;
myPorts.port = null;

module.exports = myPorts;

