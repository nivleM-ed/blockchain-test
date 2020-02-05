var express = require('express');
var router = express.Router();

const axios = require('axios');
const client = require('socket.io-client');
// var socketApi = require('../socket/socketApi');
// const BlockChain = require('../modals/chain');
const SocketActions = require('../constants');
const socketListeners = require('../socket/socketListeners');

const {blockChain} = require('../iniChain');
var myPorts = require('../port');
var io = myPorts.io;

router.post('/nodes', (req, res) => {
  const {
    host, 
    port
  } = req.body;
  const {
    callback
  } = req.query;
  const node = `http://${host}:${port}`;
  const socketNode = socketListeners(client(node), blockChain);

  try {
    blockChain.addNode(socketNode, blockChain);
  } catch(e) {
    console.log(e);
    res.send({e});
  }
 
  try {
    if (callback === 'true') {
      console.info(`Added node ${node} back`);
      res.json({
        status: 'Added node Back'
      }).end();
    } else {
      axios.post(`${node}/nodes?callback=true`, {
        host: req.hostname,
        port: myPorts.port,
      });
      console.info(`Added node ${node}`);
      res.json({
        status: 'Added node'
      }).end();
    }
  } catch(e) {
    console.log(e);
    res.send({e})
  }
});

router.post('/transaction', (req, res) => {
  const {
    sender,
    receiver,
    amount
  } = req.body;
  try{
    io.emit(SocketActions.ADD_TRANSACTION, sender, receiver, amount);
  } catch(e) {
    console.log(e);
    res.send(e)
  }
  res.json({
    message: 'transaction success'
  }).end();
});

router.get('/chain', (req, res) => {
  try{
    var test = blockChain.toArray();
  } catch(e) {
    console.log(e)
    res.send(e)
  }
  res.json(test).end();
});

module.exports = router;