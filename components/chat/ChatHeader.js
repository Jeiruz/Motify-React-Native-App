import React from 'react'
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { Feather } from '@expo/vector-icons'
import { baseURL } from '../shared/HelperFunction'

function ChatHeader({ image, navigation }) {
    const styles = StyleSheet.create({
        image: {
            width: 35,
            height: 35,
            marginTop: 7,
            marginLeft: 7,
            borderRadius: 30,
            backgroundColor: "1a1a1a",
            backgroundColor: "#3d3d3d"
        },
        container: {
            height: 50,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#1b1a20",
        },
        text: {
            fontSize: 22,
            marginLeft: 20,
            marginTop: 9,
            color: "white"
        },
        iconContainer: {
            marginTop: 10,
            marginLeft: 175   
        }
    })
    return (
        <View style={styles.container}>
            {image ? 
                <Image style={styles.image} source={{ uri: `${baseURL}${image}` }}/> 
            : <View style={styles.image}></View>}
            <Text style={styles.text}>Messages</Text>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("ChatSearch")}>
            <Feather name="plus" size={29} color={"white"}/>
        </TouchableOpacity>
        </View>
    )
}



const mapStateToProps = state => ({
    image: state.auth.user.image
})


export default connect(mapStateToProps)(ChatHeader)