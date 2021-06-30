import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import Share from './Share'
import { connect } from 'react-redux'
import { addLike } from '../../actions/posts'
import { random_style, baseURL } from '../shared/HelperFunction'
import Content from './Content'
import { Feather, Fontisto } from '@expo/vector-icons'
import RandomTemplate from '../shared/RandomTemplate'

function Post({ post, navigation, new_user, addLike }) {
    const [liked, setLiked] = useState({ is_liked: post.is_liked})
    const toggleLikes = (like) => {
        if (like) {
            addLike(post.id, "unlike")
        } else if (!like) {
            addLike(post.id, "like")
        }
        setLiked({ is_liked: !like})
    }
    const [number, setNumber] = useState(0)
    useEffect(() => {
        setNumber(Math.floor(Math.random() * 45))
    }, [])
    const { color, third_color, backgroundColor } = random_style(number)
    const styles = StyleSheet.create({
        image: {
            height: 345,
            backgroundColor: third_color
        },
        postContainer: {
            marginLeft: 20,
            marginRight: 20
            
        },
        usernameContainer: {
            height: 75,
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
    
        },
        usernameText: {
            paddingLeft: 8,
            color,
            fontWeight: "bold"
        },
        userPic: {
            width: 50,
            height: 50,
            // marginTop: 12,
            marginLeft: 15,
            borderRadius: 40,
            backgroundColor: third_color
        },
        buttonsContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // flex: 1,
            marginLeft: 20,
            marginRight: 20,
            // marginBottom: -20,
            marginTop: 10,
            marginBottom: 10
        },
        buttons: {
            marginLeft: 20,
            marginTop: 5.5
        },
        content: {
            fontSize: 15,
            color
        },
        textStyle: {
            marginLeft: 13,
            marginRight: 13
        },
        imageContent: {
            fontSize: 15,
            color,
        },  
        more: {
            fontSize: 15,
            color,
            marginBottom: 8
        },  
        tags: {
            color,
            fontSize: 15
        },
        tagsContainer: {
            display: "flex",
            flexDirection: "row",
        },
        tagText: {
            color,
            marginBottom: 10,
            marginRight: 5,
        },
        tagText1: {
            color,
            marginRight: 5,
        },
        likes: {
            fontSize: 15,
            color,
            fontWeight: "bold"
        },
        view: {
            backgroundColor: backgroundColor,
        }
    })
    return (
        <RandomTemplate number={number}>
            <TouchableOpacity onPress={() => navigation.navigate(new_user ? "Login" : "UsersProfile", { username: post.username, new_user })}>
                    <View style={styles.usernameContainer}>
                        {post.user_pic ? 
                        <Image style={styles.userPic} source={{ uri: `${baseURL}${post.user_pic}` }}/> 
                        : <View style={styles.userPic} ></View>}
                        <Text style={styles.usernameText}>{post.username}</Text>
                    </View>
                </TouchableOpacity>
            <Content styles={styles} post={post} navigation={navigation} number={number} new_user={new_user} />
            <Share post={post} navigation={navigation} number={number} new_user={new_user}/>
                <View style={styles.buttonsContainer}>
                        <Text style={styles.likes} onPress={() => navigation.navigate(new_user ? "Login" : "UserLikeList", { id: post.id, number, new_user })}>{post.likes} Likes</Text>
                        <TouchableOpacity style={{ marginLeft: 204}} onPress={() => navigation.navigate(new_user ? "Login" : "ShareForm", { post, number, new_user })}>
                            <Feather color={color} name="send" size={23}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 7 }} onPress={() => navigation.navigate(new_user ? "Login" : "CommentList", { post, number, new_user })}>
                            <Feather color={color} name="message-circle" size={23}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 7 }} onPress={() => toggleLikes(liked.is_liked)} >
                            {liked.is_liked ? <Fontisto color={"red"} name="heart" size={20}/> : <Feather color={color} name="heart" size={23}/>}
                        </TouchableOpacity>
                </View>
            
        </RandomTemplate>
    )
}


export default connect(null, { addLike })(Post)