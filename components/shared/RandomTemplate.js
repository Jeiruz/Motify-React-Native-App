import React from 'react'
import { View, ImageBackground } from 'react-native'
import { random_style } from './HelperFunction'

export default function RandomTemplate({ number, children, custom_style }) {
    const { backgroundColor } = random_style(number)
    if (number === 99) {
        return (
            <ImageBackground style={{ backgroundColor }} source={require('../../pics/image1.png')}>
                {children}
            </ImageBackground>
        ) 
    } else if (number === 100) {
        return (
            <ImageBackground style={{ backgroundColor }} source={require('../../pics/image2.png')}>
                {children}
            </ImageBackground>
        )
    } else if (number === 100) {
        return (
            <ImageBackground style={{ backgroundColor }} source={require('../../pics/image3.png')}>
                {children}
            </ImageBackground>
        )
    } else {
        return (
            <View style={{backgroundColor, ...custom_style}}>
                {children}
            </View>
        )
    }
}