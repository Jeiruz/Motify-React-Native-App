import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native'
import { baseURL } from '../shared/HelperFunction'
 
export default function ChatList({ user, chat, navigation }) {
    const styles = StyleSheet.create({
        image: {
            width: 165,
            height: 225,
            backgroundColor: "#3d3d3d",
            justifyContent: "center",
            alignItems: "center"
        },
        container: {
            height: "100%",
            flex: 1
        },
        textStyle: {
            marginLeft: 15,
            marginTop: 20,
            fontWeight: "bold",
            fontSize: 17,
            color: "white"
        },
        container1: {
            marginLeft: 15
        },
        textStyle2: {
            marginTop: 3,
            fontSize: 11.3,
            color: "white"
        },
        messages: {
            color: "white",
            width: 100,
            fontSize: 17
        }
    })

    const [users, setUsers] = useState({
        users: chat.user_list
    })
    const deleteUser = (id) => {
        const user = users.users.filter(user => {
            return user.id !== id
        }); 
        setUsers({
            users: user
        })
    }

    useEffect(() => {
        // make a loading kind of shit here J.
        deleteUser(user.id)
    }, [])
    return (
        <View style={styles.container}>
            {users.users.map(user => (
                 <TouchableOpacity key={Math.random()} onPress={() => navigation.navigate("ChatRoom", { chat_id: chat.id })}>
                    <View style={styles.container1}>
                        {user.image ? <ImageBackground style={styles.image} source={{ uri: `${baseURL}${user.image}` }}>
                                <Text numberOfLines={3}  style={styles.messages}>{chat.messages[0].content}</Text>
                            </ImageBackground> 
                        : <View></View>}
                        <Text style={styles.textStyle2}>{user.username}</Text>
                    </View>
                 </TouchableOpacity>
            ))}
        </View>
    )
}


