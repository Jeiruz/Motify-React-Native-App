// import React, { useState } from 'react'
// import { View, Text, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
// import Share from '../feed/Share'
// import { connect } from 'react-redux'
// import { addLike } from '../../actions/posts'
// import { renderTimestamp, random_style } from '../shared/HelperFunction'
// import RandomTemplate from '../shared/RandomTemplate'



// function Post({ post, navigation }) {
//     const number = Math.floor(Math.random() * 10)
//     const styles = StyleSheet.create({
//         image: {
//             height: 200,
//             width: 140,
            
//         },
//         postContainer: {
//             marginTop: 30.5,
//             marginLeft: 9.5,
//         },
//         text: {
//             color: random_style(number).color,
//             paddingRight: 7
//         }, 
//         textContainer: {
//             marginTop: 25,
//             marginLeft: 9.5,
//         }
//     })
//     if (post.image !== null) {
//         return (
//             <RandomTemplate number={number}>
//                 <View style={styles.postContainer}>
//                 {post.image ? <TouchableWithoutFeedback onPress={() => navigation.navigate("PostDetail", { post, number })}>
//                     <Image style={styles.image} source={{ uri: `http://127.0.0.1:8000${post.image}` }}/>
//                 </TouchableWithoutFeedback>: <View style={styles.image} ></View>}
//                 </View>
//             </RandomTemplate>
//         )
//     } else if (post.content && post.image === null) {
//         return (
//             <RandomTemplate number={number}>
//                 <View style={styles.textContainer}>
//                     <Text onPress={() => navigation.navigate("PostDetail", { post, number })} numberOfLines={11} style={styles.text}>{post.content}</Text>
//                 </View>
//             </RandomTemplate>
//         )
//     }
    
// }


// export default connect(null, { addLike })(Post)


















import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { random_style } from '../shared/HelperFunction'

export default function Post({ data, index, color, navigation }) {
    const number = Math.floor(Math.random() * 20)
    const isOdd = (num) => { return num % 2 }
    const random = random_style(number)
    const styles = StyleSheet.create({
        container1: {
            marginLeft: 15,
            marginTop: 10
        },
        container2: {
            alignItems: "flex-end",
            marginRight: 15,
            marginTop: 10
        },
        image: {
            height: 300,
            width: 235
        },
        likes: {
            marginBottom: 5,
            color
        },
        text_container: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: random.backgroundColor,
            height: 300,
            width: 235 
        },
        text: {
           color: random.color,
           paddingLeft: 20,
           paddingRight: 15
        }
    })
    return (
        <View style={isOdd(index) === 0 ? styles.container1 : styles.container2}>
            <Text style={styles.likes}>{data.likes} Likes</Text>
            {data.image !== null ? 
            <TouchableOpacity onPress={() => navigation.navigate("PostDetail", { post: data, number })}>
                <Image style={styles.image} source={{ uri: `http://127.0.0.1:8000${data.image}` }}/> 
            </TouchableOpacity>
            : <View style={styles.text_container}>
                <Text numberOfLines={14} onPress={() => navigation.navigate("PostDetail", { post: data, number })} style={styles.text}>{data.content}</Text>
                </View>}
        </View>
    )
}

