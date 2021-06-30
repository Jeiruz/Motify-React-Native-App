import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { baseURL, random_style, HASHTAG_FORMATTER } from '../shared/HelperFunction'


function Content({ styles, post, number, navigation }) {
    if (post.content !== null && post.image === null && post.parent === null) {
        return (
        <View style={styles.postContainer}>
            <View style={styles.textStyle}>
                <Text style={styles.content}>{HASHTAG_FORMATTER(post.content, navigation)}</Text>
                <View style={{ height: 13 }}></View>
            </View>
        </View>
        )
    } else if (post.image !== null && post.content === "" && post.parent === null) {
        return (
        <View style={styles.postContainer}>
            {post.image ? 
                <Image style={styles.image} source={{ uri: `${baseURL}${post.image}` }}/> 
                : <View style={styles.image} ></View>}
        </View>
        )
    } else if (post.image !== null && post.content !== "" && post.parent === null) {
        return (
            <View style={styles.postContainer}>
                <Text style={styles.imageContent}>{HASHTAG_FORMATTER(post.content, navigation)}</Text>
            {post.image ? 
                <Image style={styles.image} source={{ uri: `${baseURL}${post.image}` }}/> 
                : <View style={styles.image} ></View>}
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

const SharePost = ({ post, navigation, number, image, username }) => {
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
    
        },
        usernameText: {
            paddingLeft: 8,
            fontWeight: "bold",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color,
            fontSize: 13
            
        },
        userPic: {
            width: 45,
            height: 45,
            marginTop: 12,
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
            color
        },
        textStyle: {
            width: 300, 
            // marginLeft: 15,
            // marginRight: 15
        },
        imageContent: {
            fontSize: 15,
            color
        },  
        tags: {
            color,
            marginRight: 5,
            fontSize: 15,
        },
        container: {
            marginLeft: 20, 
            marginRight: 20,
            backgroundColor
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
    })
    return <View style={styles.container}>
            <View style={styles.usernameContainer}>
                {post.user_pic ? 
                <Image style={styles.userPic} source={{ uri: `${baseURL}${post.user_pic}` }}/> 
                : <View style={styles.userPic} ></View>}
                <Text style={styles.usernameText}>{post.username}</Text>
            </View>
    <Content styles={styles} post={post} number={number} navigation={navigation}/>
</View> 
}



export default SharePost






















// import React from 'react'
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
// import { random_style } from '../shared/HelperFunction'
// import RandomTemplate from '../shared/RandomTemplate'
// import Content from './Content'

// export default function SharePost({ post, number, navigation }) {
//     const { color } = random_style(number)
//     const styles = StyleSheet.create({
//         image: {
//             height: 305,
//             backgroundColor: "gray"
//         },
//         postContainer: {
//             marginLeft: 20,
//             marginRight: 20
            
//         },
//         usernameContainer: {
//             height: 65,
//             display: "flex",
//             flexDirection: "row",
    
//         },
//         usernameText: {
//             paddingLeft: 8,
//             fontWeight: "bold",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             textAlign: "center",
//             color,
//             fontSize: 13
            
//         },
//         userPic: {
//             width: 45,
//             height: 45,
//             marginTop: 12,
//             marginLeft: 15,
//             borderRadius: 40,
//             backgroundColor: "gray"
//         },
//         buttonsContainer: {
//             height: 10,
//             display: "flex",
//             flexDirection: "row",
//         },
//         buttons: {
//             marginLeft: 20,
//             marginTop: 5.5
//         },
//         content: {
//             fontSize: 13,
//             color
//         },
//         textStyle: {
//             width: 300, 
//             marginLeft: 13
//         },
//         imageContent: {
//             fontSize: 15,
//             color
//         },  
//         tags: {
//             color,
//             marginRight: 5,
//             fontSize: 15,
//         }
//     })
//     return (
//         <RandomTemplate number={number} custom_style={{  marginLeft: 20, marginRight: 20}}>
//             <TouchableOpacity>
//                 <View style={styles.usernameContainer}>
//                     {post.user_pic ? 
//                     <Image style={styles.userPic} source={{ uri: `http://127.0.0.1:8000${post.user_pic}` }}/> 
//                     : <View style={styles.userPic} ></View>}
//                     <Text style={styles.usernameText}>{post.username}</Text>
//                 </View>
//             </TouchableOpacity>
//             <Content styles={styles} navigation={navigation} number={number} post={post}/>
//         </RandomTemplate>
//     )
// }
