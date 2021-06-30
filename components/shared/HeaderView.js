import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function HeaderView({ navigation, title, color }) {
    const styles = StyleSheet.create({
        container: {
            height: 50,
            flexDirection: "row",
            // change this J
            alignItems: "center",
            shadowOffset: {
                width: 0.5, height: 1
            },
            shadowColor: color,
            shadowOpacity: 0.3,
        },
        text: {
            fontSize: 18,
            color
        },
        view: {
            marginLeft: 10
        }
    })
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.view}>
                <Feather color={color} name="arrow-left" size={23}/>
                {/* <Text onPress={() => navigation.goBack()} style={styles.text}>{"<-"}</Text> */}
            </TouchableOpacity>
            <View style={styles.view}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </View>
    )
}

