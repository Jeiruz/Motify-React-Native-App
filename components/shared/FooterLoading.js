import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function FooterLoading({ color, text }) {
    const styles = StyleSheet.create({
        container: {
            marginTop: 30,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center"
        },
        text: {
            color: color ? color : "white",
            fontSize: 17
        }
    })
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text ? text : "loading..."}</Text>
        </View>
    )
}


