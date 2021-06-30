import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ErrorMessage({ text }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text ? text : "Something went wrong"}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1a1a1a",
        height: 30,
        opacity: 0.9,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 15,
        right: 15,
        top: 5,
        zIndex: 3,
        borderRadius: 2
    },
    text: {
        color: "white"
    }
})