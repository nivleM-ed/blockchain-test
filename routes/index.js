var express = require('express');
var router = express.Router();

const axios = require('axios');
const client = require('socket.io-client');
const BlockChain = require('../modals/chain');
const SocketActions  = require('../constants');
const socketListeners = require('../socketListeners');

const { blockChain } = require('../bin/www');

router.post('/nodes', (req, res) => {
  const { host, port } = req.body;
  const { callback } = req.query;
  const node = `http://${host}:${port}`;
  const socketNode = socketListeners(client(node), blockChain);
  blockChain.addNode(socketNode, blockChain);
  if (callback === 'true') {
    console.info(`Added node ${node} back`);
    res.json({ status: 'Added node Back' }).end();
  } else {
    axios.post(`${node}/nodes?callback=true`, {
      host: req.hostname,
      port: PORT,
    });
    console.info(`Added node ${node}`);
    res.json({ status: 'Added node' }).end();
  }
});

router.post('/transaction', (req, res) => {
  const { sender, receiver, amount } = req.body;
  io.emit(SocketActions.ADD_TRANSACTION, sender, receiver, amount);
  res.json({ message: 'transaction success' }).end();
});

router.get('/chain', (req, res) => {
  res.json(blockChain.toArray()).end();
});

module.exports = router;
