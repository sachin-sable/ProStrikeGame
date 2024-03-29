import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client';

const USER_ID = '@userId';
var userID = 0

class Client extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            userId: null,
            msg: ''
        };

        this.determineUser = this.determineUser.bind(this);
        this.onReceivedMessage = this.onReceivedMessage.bind(this);
        this.onSend = this.onSend.bind(this);
        this._storeMessages = this._storeMessages.bind(this);

        this.socket = SocketIOClient('http://localhost:3000');
        this.socket.on('message', this.onReceivedMessage);
        this.determineUser();
    }

    /**
     * When a user joins the chatroom, check if they are an existing user.
     * If they aren't, then ask the server for a userId.
     * Set the userId to the component's state.
     */
    determineUser() {
        AsyncStorage.getItem(USER_ID)
            .then((userId) => {
                // If there isn't a stored userId, then fetch one from the server.
                if (!userId) {
                    this.socket.emit('userJoined', null);
                    this.socket.on('userJoined', (userId) => {
                        AsyncStorage.setItem(USER_ID, "12");
                        this.setState({ userId });
                    });
                } else {
                    this.socket.emit('userJoined', userId);
                    this.setState({ userId });
                }
            })
            .catch((e) => alert(e));
    }

    // Event listeners
    /**
     * When the server sends a message to this.
     */
    onReceivedMessage(messages) {
        console.log(messages)
        this._storeMessages(messages);
    }

    /**
     * When a message is sent, send the message to the server
     * and store it in this component's state.
     */
    onSend(messages=[]) {
        this.socket.emit('message', messages[0]);
        this._storeMessages(messages);
    }

    render() {
        var user = { _id: this.state.userId || -1 };
        userID = userID + 1
        return (
            <Text>{this.state.msg[0]}</Text>
        );
    }

    // Helper functions
    _storeMessages(messages) {
        this.setState((previousState) => {
            return {
                msg: messages
            };
        });
    }
}

module.exports = Client;
