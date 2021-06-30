import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function NoResultsFound() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>No results found</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontWeight: "bold",
        fontSize: 17,
        color: "white"
    }
})
