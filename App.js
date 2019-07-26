import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import BattleField from "./app/battelfield";
import Client from "./app/Client";
import JoinRoom from "./app/JoinRoom";
import AppNavigator from "./AppNavigator";

class App extends Component {


    render() {
        return (
            <AppNavigator/>
        )
    }
}
module.exports = App;