var express = require('express');
var http = require('http')
var socketio = require('socket.io');
//var mongojs = require('mongojs');

//var ObjectID = mongojs.ObjectID;
//var db = mongojs(process.env.MONGO_URL || 'mongodb://localhost:27017/local');
var app = express();
var server = http.Server(app);
var websocket = socketio(server);
server.listen(3000, () => console.log('listening on *:3000'));

// Mapping objects to easily map sockets and users.
var clients = {};
var users = {};

// This represents a unique chatroom.
// For this example purpose, there is only one chatroom;
var chatId = 1;

websocket.on('connection', (socket) => {
    clients[socket.id] = socket;
    socket.on('userJoined', (userId) => onUserJoined(userId, socket));
    socket.on('message', (message) => onMessageReceived(message, socket));
});

// Event listeners.
// When a user joins the chatroom.
function onUserJoined(userId, socket) {
    console.log("onUserJoined")
    // try {
    //     // The userId is null for new users.
    //     if (!userId) {
    //         var user = db.collection('users').insert({}, (err, user) => {
    //             socket.emit('userJoined', user._id);
    //             users[socket.id] = user._id;
    //             _sendExistingMessages(socket);
    //         });
    //     } else {
    //         users[socket.id] = userId;
    //         _sendExistingMessages(socket);
    //     }
    // } catch(err) {
    //     console.err(err);
    // }
    if (!userId) {
        socket.emit('userJoined', userId);
    }
    else{
        _sendExistingMessages(socket);
    }
}

// When a user sends a message in the chatroom.
function onMessageReceived(message, senderSocket) {
    console.log("onMessageReceived with message ", message)
    // var userId = users[senderSocket.id];
    // // Safety check.
    // if (!userId) return;
    //
    // _sendAndSaveMessage(message, senderSocket);
    if (message === '123'){
        senderSocket.emit('message', 'y');
    }
    else{
        senderSocket.emit('message', 'n');
    }
}

// Helper functions.
// Send the pre-existing messages to the user that just joined.
function _sendExistingMessages(socket) {
    var messages = "Hi"
    if (!messages.length) return;
    socket.emit('message', messages);
}

// Save the message to the db and send all sockets but the sender.
function _sendAndSaveMessage(message, socket, fromServer) {
    var messageData = {
        text: message.text,
        user: message.user,
        createdAt: new Date(message.createdAt),
        chatId: chatId
    };

    var emitter = fromServer ? websocket : socket.broadcast;
    emitter.emit('message', message);

    // db.collection('messages').insert(messageData, (err, message) => {
    //   // If the message is from the server, then send to everyone.
    //   var emitter = fromServer ? websocket : socket.broadcast;
    //   emitter.emit('message', [message]);
    // });
}

// Allow the server to participate in the chatroom through stdin.
var stdin = process.openStdin();
stdin.addListener('data', function(d) {
    _sendAndSaveMessage({
        text: d.toString().trim(),
        createdAt: new Date(),
        user: { _id: 'robot' }
    }, null /* no socket */, true /* send from server */);
});
