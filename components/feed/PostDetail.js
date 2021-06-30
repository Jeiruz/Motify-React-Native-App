import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Share from './Share'
import { connect } from 'react-redux'
import { addLike } from '../../actions/posts'
import { random_style } from '../shared/HelperFunction'
import HeaderView from '../shared/HeaderView'
import { Feather, Fontisto } from '@expo/vector-icons'
import { baseURL, HASHTAG_FORMATTER } from '../shared/HelperFunction'

function Content({ styles, post, navigation, backgroundColor, third_color }) {

    if (post.content !== null && post.image === null && post.parent === null) {
        return (
        <View style={styles.postContainer}>
            <View style={styles.textStyle}>
                <Text style={styles.content}>{HASHTAG_FORMATTER(post.content, navigation)}</Text>
            </View>
        </View>
        )
    } else if (post.image !== null && post.content === "" && post.parent === null) {
        return (
        <View style={styles.postContainer}>
            {post.image ? <TouchableWithoutFeedback onPress={() => navigation.navigate("ImageDetail", { 
                image: post.image, 
                backgroundColor,
                third_color 
                })}>
                <Image style={styles.image} source={{ uri: `${baseURL}${post.image}` }}/>
            </TouchableWithoutFeedback>: <View style={styles.image} ></View>}
        </View>
        )
    } else if (post.image !== null && post.content !== "" && post.parent === null) {
        return (
            <View style={styles.postContainer}>
                <Text style={styles.imageContent}>{HASHTAG_FORMATTER(post.content, navigation)}</Text>
            {post.image ? <TouchableWithoutFeedback onPress={() => navigation.navigate("ImageDetail", { 
                image: post.image, 
                backgroundColor,
                third_color 
             })}>
                <Image style={styles.image} source={{ uri: `${baseURL}${post.image}` }}/>
            </TouchableWithoutFeedback>: <View style={styles.image} ></View>}
            </View>
        )
    } else if (post.parent !== null) {
        return (
            <View style={styles.postContainer}>
                <Text style={styles.imageContent}>Shared</Text>
                <Text style={styles.imageContent}>{HASHTAG_FORMATTER(post.content, navigation)}</Text>
            </View>
        )
    } else {
        return null
    }
}

function PostDetail({ route, navigation }) {
    const { post, number, new_user } = route.params
    const { color, third_color, backgroundColor } = random_style(number)
    const [liked, setLiked] = useState({ is_liked: post.is_liked})
    const toggleLikes = (like) => {
        setLiked({ is_liked: !like})
    }
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
            fontWeight: "bold",
            color
            
        },
        userPic: {
            width: 50,
            height: 50,
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
        }
    })
    return (
        <View style={{ backgroundColor, flex: 1}}>
            <HeaderView title={"Post"} navigation={navigation} color={color}/>
            <TouchableOpacity onPress={() => navigation.navigate(new_user ? "Login" : "UsersProfile", { username: post.username, new_user})}>
                    <View style={styles.usernameContainer}>
                        {post.user_pic ? 
                        <Image style={styles.userPic} source={{ uri: `${baseURL}${post.user_pic}` }}/> 
                        : <View style={styles.userPic} ></View>}
                        <Text style={styles.usernameText}>{post.username}</Text>
                    </View>
                </TouchableOpacity>
            <Content   
                styles={styles} 
                post={post} 
                navigation={navigation} 
                number={number} 
                third_color={third_color} 
                backgroundColor={backgroundColor}
                />
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
        </View>
    )
        }

export default connect(null, { addLike })(PostDetail)