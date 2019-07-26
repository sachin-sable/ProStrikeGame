import React from "react";

import {
    View,
    StyleSheet,
    ImageBackground,
    Dimensions
} from 'react-native';

const{width, height} = Dimensions.get("window");
import Canvas , {Image as CanvasImage, Path2D, ImageData} from 'react-native-canvas';
const playerSize = 50;

export default class BattleField extends React.Component{
    constructor(props){
        super(props);
       // const imageFolder = `${RNFS.MainBundlePath}/assets/`;
    }
    handleImageRect(canvas) {
        const image = new CanvasImage(canvas);
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');

        image.src = 'https://mobileapp.questionpro.com/InHouseBuild/Andriod/SurveySwipe/prostrike/block.png';


        const player1 = new CanvasImage(canvas);
        player1.src = 'https://mobileapp.questionpro.com/InHouseBuild/Andriod/SurveySwipe/prostrike/player.png'
        player1.draggable = true;
        image.addEventListener('load', () => {
            context.drawImage(image, 150, height*0.1, 20, height*0.85);
            context.drawImage(image, (width-190), height*0.1, 20, height*0.85);
            context.drawImage(image, 220, height*0.25, 80, 80);
            context.drawImage(image, width-320, height*0.25, 80, 80);
            context.drawImage(image, 220, height*0.60, 80, 80);
            context.drawImage(image, width-320, height*0.60, 80, 80);
            context.drawImage(image, width/2 - 50, height/2 - 40, 80, 80);
            context.drawImage(player1, 30, height/2, playerSize, playerSize );
            context.drawImage(player1, width - 80, height/2, playerSize, playerSize );
        });
        player1.addEventListener('onClick',()=>{
            console.log("Mouse down");
        })




    }

    drawLeftBar = (canvas)=>{
        const leftBar = new CanvasImage(canvas);
        const context = canvas.getContext('2d');
        leftBar.src = 'https://mobileapp.questionpro.com/InHouseBuild/Andriod/SurveySwipe/prostrike/block.png';
        leftBar.addEventListener('load', ()=>{
            context.drawImage(leftBar, 0, height*0.1, 20, height*0.85);
        })

    }
    render(){
        return (
            <ImageBackground source={require('./assets/battelfield_bg.jpg')} style={{width: width, height:height}}>
                <Canvas ref={this.handleImageRect}/>
                <Canvas ref={this.drawLeftBar}/>
            </ImageBackground>
        )

    }
}