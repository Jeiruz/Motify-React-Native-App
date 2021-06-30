import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

export default function FlatButton({ text, onPress, handleNavigation }) {
    return (
        <TouchableOpacity onPress={() => {
            if (handleNavigation) {
                handleNavigation()
            } else if (onPress) {
                onPress()
            } else {
                return
            }
        }}>
            <View style={styles.button}>
            <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: 'black',
        marginLeft: 50,

        marginRight: 50,
        // shadowOffset: {
        //     width: 0.5, height: 5
        // },
        // shadowColor: '#333',
        // shadowOpacity: 0.3,
        // shadowRadius: 4,
    },
    buttonText: {
        color: 'white',
        textTransform: 'uppercase',
        // fontSize: 16,
        textAlign: 'center'
    }
})