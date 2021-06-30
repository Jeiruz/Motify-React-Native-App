import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native' 

export default function NoChatText({ navigation }) {
    const styles = StyleSheet.create({
        text1: {
            fontSize: 24,
            fontWeight: "bold",
            color: "white"
        },
        text2: {
            color: "white",
        },
        text3: {
            marginTop: 18,
            fontSize: 17,
            height: 30,
            paddingTop: 2.3,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "white",
            color: "white",
            width: 150,
            textAlign: "center"
        },
        textContainer: {
            justifyContent: "center",
            alignItems: "center",
            flex: 1
        }
    })
    return (
        <View style={styles.textContainer}>
                <View style={{marginBottom: 15, justifyContent: "center", alignItems: "center"}}>
                <Text style={styles.text1}>Send a message, get a </Text>
                <Text style={styles.text1}>message</Text>
                </View>
                <Text style={styles.text2}>Direct Messages are private conversations</Text>
                <Text style={styles.text2}>between you and other people on Motify.</Text>
                <Text style={styles.text2}>Create post, media, and more!</Text>
                <TouchableOpacity onPress={() => navigation.navigate("ChatSearch")}>
                    <Text style={styles.text3}>Write a message</Text>
                </TouchableOpacity>
        </View>
    )
}


