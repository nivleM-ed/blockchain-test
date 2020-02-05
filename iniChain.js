const Blockchain = require('./modals/chain');
var socketApi = require('./socket/socketApi');
var io = socketApi.io;

exports.blockChain = new Blockchain(null, io);