import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Canvas from 'react-native-canvas';


class App extends Component {
    handleCanvas = (canvas) => {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, 200, 200);
        ctx.moveTo(100,100)
    }

    render() {
        return (
            <Canvas ref={this.handleCanvas}/>
        )
    }
}
module.exports = App;