import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function ErrorTemplate({ color, changeState, fetchData }) {
    const styles = StyleSheet.create({
        text1: {
            color,
            fontSize: 22,
            
        },
        text2: {
            color,
            marginTop: 18,
            fontSize: 17,
            height: 30,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: color,
            width: 150,
            height: 30,
            textAlign: "center"

        },
        container: {
            justifyContent: "center",
            alignItems: "center",
            flex: 1
        }
    })
    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Something went wrong. Check</Text>
            <Text style={styles.text1}>your connection and try again.</Text>
            <TouchableOpacity onPress={() => { fetchData(); changeState()}}>
                <Text style={styles.text2}>Try again</Text>
            </TouchableOpacity> 
        </View>
    )
}
