import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function TopTab({ color, tab, onPress }) {
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            height: 50,
            backgroundColor: "#1b1a20",
        },
        textStyle: {
            color,
            fontWeight: "bold",
            fontSize: 16
        }
    })
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.textStyle}>{tab.name}</Text>
        </TouchableOpacity>
    )
}

