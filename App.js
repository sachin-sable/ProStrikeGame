import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import BattleField from "./app/battelfield";



class App extends Component {


    render() {
        return (
            <View>
                <BattleField/>
            </View>
        )
    }
}
module.exports = App;