import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import BattleField from "./app/battelfield";
import Sample from "./app/sample";



class App extends Component {


    render() {
        return (
            <View style={{flex:1}}>
                <BattleField/>
            </View>
        )
    }
}
module.exports = App;