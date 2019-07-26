import React from "react";

import {
    View,
    StyleSheet
} from 'react-native';
import Canvas from 'react-native-canvas';
export default class BattleField extends React.Component{
    constructor(props){
        super(props);
    }
    handleCanvas = (canvas) => {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.fillRect(50, 50, 200, 200);
        setTimeout(()=>{
            ctx.moveTo(100,100);
        }, 1000)

    }
    render(){
        return (
            <View>
                <Canvas ref={this.handleCanvas}/>
            </View>
        )

    }
}