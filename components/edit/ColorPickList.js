import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { random_style } from '../shared/HelperFunction'

export default function ColorPickList({ number, profile, navigation }) {
    const { color, backgroundColor, third_color } = random_style(number)
    const styles = StyleSheet.create({
        container: {
            height: 700,
            backgroundColor
        },
        image: {
            height: 53, 
            width: 53,
            borderRadius: 30,   
            backgroundColor: third_color,
        },
        background_image: {
            height: 270,
            width: 235,
            backgroundColor: third_color,
        },
        view1: {
            display: "flex",
            flexDirection: "row",
            marginLeft: 12,
            marginTop: 40,
            height: 53,
        },
        username: {
            paddingLeft: 8,
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            color,

        },
        view2: {
            marginTop: 50,
            marginLeft: 15,
            flexDirection: "row",
            marginRight: 25
        },
        text: {
            color,
            marginRight: 30
        },
        container2: {
            marginTop: 20,
            height: 270,
        },
        themeContainer: {
            backgroundColor: third_color,
            height: 40,
            alignSelf: "center",
            marginTop: 150,
            width: 150,
            justifyContent: "center",
            alignItems: "center"
        },
        theme: {
            color,
            fontSize: 17
        }
     })
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.view1}>
                     <View  style={styles.image}></View>
                    <Text style={styles.username}>{profile.username}</Text>
                </View>
                <View style={styles.container2}>
                       <View style={styles.background_image}></View>
                </View>
                <View style={styles.view2}>
                        <Text style={styles.text}>Friends</Text>
                        <Text style={styles.text}>Edit</Text>
                        <Text style={styles.text}>Notification</Text>
                        <Text style={styles.text}>Settings</Text>
                </View>
                <TouchableOpacity style={styles.themeContainer} onPress={() => navigation.navigate("EditDashboard", { themes: { 
                    backgroundColor,
                    color,
                    third_color
                } })}>
                    <Text style={styles.theme}>Choose Theme</Text>
                </TouchableOpacity>
                <View style={{ height: 20}}>
                </View>
            </ScrollView>
        </View>
    )
}
