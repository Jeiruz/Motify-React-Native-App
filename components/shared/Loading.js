import React from 'react'
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native'
import { random_style } from './HelperFunction'

export default function Loading({ style, number, progress, color }) {
    const styles = StyleSheet.create({
        container: {
            height: "100%",
            backgroundColor: number | number === 0? random_style(number).backgroundColor : "#1b1a20",
            alignItems: "center",
            justifyContent: "center",
        },
        text: {
            fontSize: 20,
            color: color ? color : "#3d3d3d"
        }
    })
    if (progress) {
        return <View style={style ? style : styles.container}>
            <Text style={styles.text}>Upload progress {progress}%</Text>
    </View>
    }
    return (
        <View style={style ? style : styles.container}>
            <ActivityIndicator color={color ? color : number | number === 0? random_style(number).color : "#3d3d3d" } size="large"/>
        </View>
    )
}


