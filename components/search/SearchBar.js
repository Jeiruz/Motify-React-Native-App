import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

function SearchBar({ navigation, type, text }) {
    const styles = StyleSheet.create({
        container: {
            height: 30,
            backgroundColor: "#1b1a20",
            marginTop: 15,
            marginLeft: 13,
            marginRight: 13,
            borderRadius: 5,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: 'white',
        },
        text: {
            color: "white",
            paddingTop: 3.5,
            paddingLeft: 5
        },
        text1: {
            color: "white",
            paddingTop: 3,
            paddingLeft: 5
        },
        container2: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "center"
        }
    })
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("SearchForm", { type })}>
                    {text ? <Text style={styles.text1}>{text}</Text> : <Text style={styles.text}>search...</Text>} 
            </TouchableOpacity>
        </View>
    )
}



export default SearchBar