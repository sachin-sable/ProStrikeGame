import { createStackNavigator, createAppContainer } from 'react-navigation';
import JoinRoom from './app/JoinRoom';
import StartGame from './app/StartGame';
import LandingScreen from './app/LandingScreen';
import GameScreen from './app/GameScreen';

const AppNavigator = createStackNavigator({

        GameScreen: {
            screen: GameScreen
        },
        LandingScreen: {
            screen: LandingScreen
        },
        JoinRoom: {
            screen: JoinRoom
        },
        StartGame: {
            screen: StartGame
        },
    },
    {
        initialRouteName: 'LandingScreen'
    }
);
export default createAppContainer(AppNavigator);