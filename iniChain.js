const Blockchain = require('./modals/chain');
const myPorts = require('./port');
const client = require('socket.io-client');
const socketListeners = require('./socket/socketListeners');
// var socketApi = require('./socket/socketApi');
// var io = socketApi.io;

const blockChain = new Blockchain(null, myPorts.io);

function doIniBc() {
    blockChain.addNode(socketListeners(client(`http://localhost:${myPorts.port}`), blockChain));
}

exports.blockChain = blockChain;
exports.doIniBc = doIniBc;