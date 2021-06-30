import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { random_style, baseURL } from '../shared/HelperFunction'

export default function SingleCommentList({ comment, slug, navigation, detail, number }) {
    const { color, backgroundColor, third_color } = random_style(number)
    const styles = StyleSheet.create({
        container: {
            maxWidth: "100%",
            maxHeight: "100%",
            marginLeft: 80,
            // marginTop: 20,
            justifyContent: "center",
            alignItems: "flex-end",
            paddingRight: 10   
            
        },
        contentContainer: {
            backgroundColor: third_color,
            padding: 10,
            borderTopRightRadius: 0,
            borderRadius: 10,
            // shadowOffset: {
            //     width: 0.5, height: 2
            // },
            // shadowColor: '#333',
            // shadowOpacity: 0.3,
            // shadowRadius: 4,
            
    
        },
        userContainer: {
            flexDirection: 'row',
            marginBottom: 5
        },
        userPic: {
            width: 20,
            height: 20,
            borderRadius: 15,
            backgroundColor: backgroundColor
        },
        usernameStyle: {
            fontWeight: "bold",
            marginLeft: 4,
            color: color
        },
        replyStyle: {
            marginTop: 3,
            fontWeight: "bold",
            color: color
        },
        comment: {
            color
        }
    })
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.userContainer}>
                    {comment.user_pic ? 
                    <Image style={styles.userPic} source={{ uri: `${baseURL}${comment.user_pic}` }}/> 
                    : <View style={styles.userPic}></View>}
                    <Text style={styles.usernameStyle}>{comment.username}</Text>
                </View>
                <Text style={styles.comment}>{comment.content}</Text>
                {detail ? null : <TouchableOpacity onPress={() => navigation.navigate("CommentDetail", { comment, slug, number })}>
                    <Text style={styles.replyStyle}>{comment.reply_count} Replies</Text>
                </TouchableOpacity>}
                
            </View>
        </View>
    )
}

