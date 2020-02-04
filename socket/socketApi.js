var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection', (socket) => {
    console.info(`Socket connected, ID: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`Socket disconnected, ID: ${socket.id}`);
    });
});

socketApi.sendNotification = function () {
    io.sockets.emit('hello', {
        msg: 'Hello World!'
    });
}

module.exports = socketApi;