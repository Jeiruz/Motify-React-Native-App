import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { baseURL, random_style } from '../shared/HelperFunction'

// fix this J.
export default function ImageDetail({ route, navigation }) {
    const { image, backgroundColor, third_color } = route.params
    const styles = StyleSheet.create({
        image: {
            height: 450,
            backgroundColor: third_color
        },
        container: {
            backgroundColor,
            flex: 1,
            justifyContent: "center",
        }
    })
    return (
        <View style={styles.container}>
            {image ?
                <Image style={styles.image} source={{ uri: `${baseURL}${image}` }}/>
            : <View style={styles.image} ></View>}
        </View>
    )    
    
}

