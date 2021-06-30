import React from 'react'
import { ImageBackground } from 'react-native'

function SharedImageBackground({ children, style, mode }) {
    if (mode === "girly") {
        return (
            <ImageBackground style={style} source={require('../../pics/illustration1.png')}>
                { children }
            </ImageBackground>
        )
    } else if (mode === "dark") {
        return (
            <ImageBackground style={style} source={require('../../pics/illustration2.png')}>
                { children }
            </ImageBackground>
        )
    }
    
}

export default SharedImageBackground