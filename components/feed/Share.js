import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { random_style, baseURL } from '../shared/HelperFunction'
import Content from './Content'

const Share = ({ post, navigation, new_user }) => {
    const [number, setNumber] = useState(0)
    useEffect(() => {
        setNumber(Math.floor(Math.random() * 16))
    }, [])
    const { color, backgroundColor, third_color } = random_style(number)
    const styles = StyleSheet.create({
        image: {
            height: 305,
            backgroundColor: third_color,
            marginBottom: 20
        },
        postContainer: {
            marginLeft: 20,
            marginRight: 20
            
        },
        usernameContainer: {
            height: 65,
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
    
        },
        usernameText: {
            paddingLeft: 8,
            color,
            fontSize: 13,
            fontWeight: "bold"
        },
        userPic: {
            width: 45,
            height: 45,
            marginLeft: 15,
            borderRadius: 40,
            backgroundColor: third_color
        },
        buttonsContainer: {
            height: 10,
            display: "flex",
            flexDirection: "row",
        },
        buttons: {
            marginLeft: 20,
            marginTop: 5.5
        },
        content: {
            fontSize: 13,
            color,
        },
        textStyle: {
            // width: 300, 
            marginLeft: 4,
            marginRight: 3
        },
        imageContent: {
            fontSize: 15,
            color
        },  
        more: {
            fontSize: 15,
            color,
            marginBottom: 8
        }, 
        tags: {
            color,
            marginRight: 5,
            fontSize: 15,
        },
        tagsContainer: {
            display: "flex",
            flexDirection: "row",
        },
        tagText: {
            color,
            marginBottom: 10,
            marginRight: 5,
            fontSize: 13,
        },
        tagText1: {
            color,
            marginRight: 5,
            fontSize: 13,
        },
        shareContainer: {
            marginLeft: 20, 
            marginRight: 20,
            backgroundColor
        }
    })
    return post.parent ? <View style={styles.shareContainer}>
    <TouchableOpacity onPress={() => navigation.navigate(new_user ? "Login" : "UsersProfile", { username: post.parent.username, new_user})}>
            <View style={styles.usernameContainer}>
                {post.parent.user_pic ? 
                <Image style={styles.userPic} source={{ uri: `${baseURL}${post.parent.user_pic}` }}/> 
                : <View style={styles.userPic} ></View>}
                <Text style={styles.usernameText}>{post.parent.username}</Text>
            </View>
        </TouchableOpacity>
    <Content share={true} styles={styles} post={post.parent} navigation={navigation} number={number} new_user={new_user}/>
    {/* <View style={{ height: 13 }}></View> */}
</View> : null
}  

export default Share