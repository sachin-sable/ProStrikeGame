import React from "react";

import {
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Button
} from 'react-native';
import SocketIOClient from 'socket.io-client';

const{width, height} = Dimensions.get("window");
import Canvas , {Image as CanvasImage, Path2D, ImageData} from 'react-native-canvas';
const playerSize = 50;

export default class BattleField extends React.Component{
    constructor(props){
        super(props);
       // const imageFolder = `${RNFS.MainBundlePath}/assets/`;
        this.canvasRef = React.createRef();
        this.coordinatesForAll = this.coordinatesForAll.bind(this);
        this.socket = SocketIOClient('http://192.168.6.111:3000');
        this.socket.on('coordinatesForAll', this.coordinatesForAll);
        this.state = {
            x: 30,
            y : height/2,

        }



    }

    coordinatesForAll(message) {
        console.log(message)
        let context = this.canvasRef.current.getContext('2d');
        context.clearRect( message[0] - 5, message[1] -5, playerSize, playerSize);
        context.drawImage(this.otherPlayer, message[0], message[1], playerSize, playerSize);
    }


    componentDidMount(){
        this.handleImageRect();
        let myID = this.props.navigation.getParam('id', 1);
        if(myID === 1){
            this.myPlayer = this.player1;
            this.otherPlayer = this.player2;
            this.setState({
                x: 30,
                y : height/2,
            })
        }
        else{
            this.myPlayer = this.player2;
            this.otherPlayer = this.player1;
            this.setState({
                x:width - 80,
                y:height/2
            });
        }

    }
    handleImageRect() {
        let canvas = this.canvasRef.current;
        let image = new CanvasImage(canvas);
        canvas.width = width;
        canvas.height = height;

         let context = canvas.getContext('2d');

        image.src = 'https://mobileapp.questionpro.com/InHouseBuild/Andriod/SurveySwipe/prostrike/block.png';


        this.player1 = new CanvasImage(canvas);
        this.player1.src = 'https://mobileapp.questionpro.com/InHouseBuild/Andriod/SurveySwipe/prostrike/player.png'
        this.player2 = new CanvasImage(canvas);
        this.player2.src = 'https://mobileapp.questionpro.com/InHouseBuild/Andriod/SurveySwipe/prostrike/player.png'
        image.addEventListener('load', () => {
            context.drawImage(image, 150, height*0.1, 20, height*0.85);
            context.drawImage(image, (width-190), height*0.1, 20, height*0.85);
            context.drawImage(image, 220, height*0.25, 80, 80);
            context.drawImage(image, width-320, height*0.25, 80, 80);
            context.drawImage(image, 220, height*0.60, 80, 80);
            context.drawImage(image, width-320, height*0.60, 80, 80);
            context.drawImage(image, width/2 - 50, height/2 - 40, 80, 80);
            context.drawImage(this.player1, 30, height/2, playerSize, playerSize );
            context.drawImage(this.player2, width - 80, height/2, playerSize, playerSize );
        });



    }
    moveMyPlayer = ()=>{
        let context = this.canvasRef.current.getContext('2d');
        context.clearRect(this.state.x, this.state.y, playerSize,playerSize);
        context.drawImage(this.myPlayer, this.state.x, this.state.y, playerSize, playerSize);
        this.socket.emit('onCoordinatesFromClient', [this.state.x, this.state.y]);
    }

    moveOtherPlayer= ()=>{
        let context = this.canvasRef.current.getContext('2d');
        context.clearRect(this.state.x, this.state.y, playerSize,playerSize);
        context.drawImage(this.player1, this.state.x, this.state.y, playerSize, playerSize);
    }
    render(){
        return (
            <ImageBackground source={require('./assets/battelfield_bg.jpg')} style={{width: width, height: height}}>
                <View style={{flex: 1, marginVertical:30}}>
                    <View style={{flex: 1}}>
                        <Canvas ref={this.canvasRef}/>
                    </View>
                    <Button
                        title={"Move"}
                        onPress={() => {
                            this.setState({
                                x: this.state.x + 5,

                            },()=>{
                                this.moveMyPlayer()
                                this.forceUpdate()
                            })
                        }}>

                    </Button>

                </View>
            </ImageBackground>);

    }
}