import React from "react";

import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    ImageBackground
} from 'react-native';

export default class LandingScreen extends React.Component{
    constructor(props){
        super(props);
    }

    buttonClicked(event) {
        const {navigate} = this.props.navigation;
        navigate('JoinRoom')
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
                            <Text>Landing Page</Text>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )

    }
}