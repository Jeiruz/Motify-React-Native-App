import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { baseURL } from '../shared/HelperFunction'

function FriendSearchList({ user, navigation, me, type }) {
    const styles = StyleSheet.create({
        image: {
            width: 50,
            height: 50,
            marginTop: 9,
            marginLeft: 7,
            borderRadius: 30
        },
        container: {
            height: 70,
            marginBottom: 5,
            flexDirection: "row",
            backgroundColor: "#1b1a20",
            borderRadius: 10,
            marginLeft: 5,
            marginRight: 5
        },
        textStyle: {
            marginLeft: 15,
            marginTop: 20,
            fontWeight: "bold",
            fontSize: 17,
            color: "white"
        }
    })
    const navigate = (typed) => {
        if (typed === "chat") {
            navigation.navigate("AddChat", 
            { user: { username: me.username, id: me.id }, other_user: { username: user.username, id: user.id }})
        } else if (typed === "search") {
            navigation.navigate("UsersProfile", 
            { username: user.username})
        }
    }
    return (
        <TouchableOpacity onPress={() => navigate(type)}>
            <View style={styles.container}>
             <Image style={styles.image} source={{ uri: `${baseURL}${user.image}` }}/>
                <Text style={styles.textStyle}>{user.username}</Text>
            </View>
        </TouchableOpacity>
    )
}



const mapStateToProps = state => ({
    me: state.auth.user
})

export default connect(mapStateToProps)(FriendSearchList)
