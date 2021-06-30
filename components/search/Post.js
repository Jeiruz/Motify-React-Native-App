import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { addLike } from '../../actions/posts'
import { random_style, baseURL } from '../shared/HelperFunction'
import RandomTemplate from '../shared/RandomTemplate'



function Post({ post, navigation, index, search, tags }) {
    const [actionTweet, setActionTweet] = useState(post ? post : null)
    const number = Math.floor(Math.random() * 20)
    const { color } = random_style(number)
    const styles = StyleSheet.create({
        image: {
            height: 235,
            width: 173,
        },
        postContainer: {
            marginLeft: 10,
            marginRight: 10,
            marginTop: 5
        },
        contentContainer: {
            marginLeft: 10,
            marginRight: 10,
            marginTop: 5,
            justifyContent: "center",
            alignItems: "center"
        },
        usernameContainer: {
            height: 37,
            display: "flex",
            flexDirection: "row",
    
        },
        usernameText: {
            paddingLeft: 8,
            fontWeight: "bold",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color,
            fontSize: 11.3,
            
        },
        userPic: {
            width: 28,
            height: 28,
            marginTop: 7,
            marginLeft: 8,
            borderRadius: 20,
        },
        buttonsContainer: {
            height: 10,
            display: "flex",
            flexDirection: "row",
        },
        buttons: {
            height: 10
        },
        more: {
            fontSize: 24,
            color: "white"
        },
        more_view: {
            justifyContent: "center",
            alignItems: "center",
            flex: 1
        },
        text: {
            width: 173,
            color,
            fontSize: 11.3
        }
    })
    return (
        <RandomTemplate number={number} custom_style={{ flex: 1}}>
            <TouchableOpacity onPress={() => navigation.navigate("UsersProfile", { username: post.username})}>
                    <View style={styles.usernameContainer}>
                        {post.user_pic ? 
                        <Image style={styles.userPic} source={{ uri: `${baseURL}${post.user_pic}` }}/> 
                        : <View style={styles.userPic} ></View>}
                        <Text style={styles.usernameText}>{post.username}</Text>
                    </View>
                </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(index === 5 ? "PostSearch" : "PostDetail", { 
                post, number, search, category: tags ? true : null, tags: search
                })}>
            {post.image === null && post.content !== "" ? <View style={styles.contentContainer}>
                        <Text numberOfLines={15} style={styles.text}>{post.content}</Text>
            </View> :<View style={styles.postContainer}>
            {post.image ? 
                <ImageBackground style={styles.image} source={{ uri: `${baseURL}${post.image}` }}>
                    {index === 5 ? <View style={styles.more_view}>
                        <Text style={styles.more}>More</Text>
                    </View>: null}
                </ImageBackground>
            : <View style={styles.image} ></View>}
            </View>}
            </TouchableOpacity>
                <View style={styles.buttons}>
                    {/* <Text>{post.likes} likes</Text> */}
                </View>
                {/* <View style={styles.buttons}>
                    <Toggler addLike={addLike} post={post}/>
                </View>         
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => navigation.navigate("CommentList", { post })}>
                        <Text>comment</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => navigation.navigate("ShareForm", { post })}>
                        <Text>Share</Text>
                    </TouchableOpacity>
                </View> */}
        </RandomTemplate>
    )
}


export default connect(null, { addLike })(Post)