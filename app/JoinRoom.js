import React from "react";

import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    ImageBackground,
    TextInput
} from 'react-native';

import SocketIOClient from 'socket.io-client';

export default class JoinRoom extends React.Component{
    constructor(props){
        super(props);

        this.text = ''
        this.onReceivedMessage = this.onReceivedMessage.bind(this);
        this.socket = SocketIOClient('http://192.168.6.111:3000');
        this.socket.on('message', this.onReceivedMessage);
    }

    onReceivedMessage(message) {
        console.log(message)
        const {navigate} = this.props.navigation;
        let isValid = message[0]
        let socketId = message[1]
        if (isValid === 'y'){
            navigate('StartGame',{id: socketId})
        }
    }

    buttonClicked(event) {
        this.socket.emit('message', this.text);
    }

    render(){
        return (
            <View>
                <ImageBackground style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
                    resizeMode='cover'
                    source={require('../GameStarting.png')}
                >
                    <Text>Your Pin is 123</Text>
                    <TextInput style={{borderColor: '#7a42f4',
                        borderWidth: 1}}
                               underlineColorAndroid = "transparent"
                               placeholder = "Enter Pin"
                               placeholderTextColor = 'black'
                               autoCapitalize = "none"
                               onChangeText={(text) => this.text = text}/>
                    <TouchableOpacity
                        onPress={this.buttonClicked.bind(this)}>
                        <View>
                            <Text>Join Room</Text>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )

    }
}