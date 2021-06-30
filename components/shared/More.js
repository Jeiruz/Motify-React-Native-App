import React from 'react'
import { Text, ImageBackground, View } from 'react-native'
import { baseURL } from '../shared/HelperFunction'

export default function More({ style, image, texStyle }) {
    return (
        <ImageBackground style={style} source={{ uri: `${baseURL}${image}` }}>
            <View style={{ justifyContent: "center", textAlign: "center", flex: 1}}>
            <Text style={{...texStyle, color: "white"}}>More</Text>
            </View>
        </ImageBackground>
    )
}
