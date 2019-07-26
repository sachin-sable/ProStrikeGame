import React from "react";

import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    ImageBackground
} from 'react-native';

export default class StartGame extends React.Component{
    constructor(props){
        super(props);
    }

    buttonClicked(event) {
        const {navigate} = this.props.navigation;
        navigate('GameScreen')
    }

    render(){
        return (
            <View>
                <ImageBackground style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
                                 resizeMode='cover'
                                 source={require('../GameStarting.png')}
                >
                    <TouchableOpacity
                        onPress={this.buttonClicked.bind(this)}>
                        <View>
                            <Text>Start Game</Text>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )

    }
}