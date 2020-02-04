// const socketListeners = require('../socketListeners');
const BlockChain = require('./modals/chain');
var socketApi = require('./socketApi');
var io = socketApi.io;

exports.blockChain = new BlockChain(null, io);