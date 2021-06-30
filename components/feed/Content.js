import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { baseURL, HASHTAG_FORMATTER } from '../shared/HelperFunction'

function Content({ styles, post, navigation, number, new_user, share }) {
    const [more, setMore] = useState(false)
    const [showMore, setShowMore] = useState(false)
    if (post.content !== "" && post.image === null && post.parent === null) {
        return (
        <View style={styles.postContainer}>
            <View style={styles.textStyle}>
            <TouchableOpacity onPress={() => navigation.navigate("PostDetail", { post, number, new_user })}>
                {more ? <Text style={styles.content}>{HASHTAG_FORMATTER(post.content, navigation)}</Text> :
                 <Text 
                    numberOfLines={15} 
                    style={styles.content}
                    // onTextLayout doesn't work in react native web god fucking damn it.
                    >{HASHTAG_FORMATTER(post.content, navigation)}</Text>}
                <Text style={styles.content} onPress={() => setMore(!more)}>{more ? "show less" : "more"}</Text> 
                {share ? <View style={{ height: 13 }}></View>: null}
            </TouchableOpacity>
            </View>
        </View>
        )
    } else if (post.image !== null && post.content === "" && post.parent === null) {
        return (
        <View style={styles.postContainer}>
            {post.image ? <TouchableOpacity onPress={() => navigation.navigate("PostDetail", { post, number, new_user })}>
                <Image style={styles.image} source={{ uri: `${baseURL}${post.image}` }}/>
            </TouchableOpacity>: <View style={styles.image} ></View>}
        </View>
        )
    } else if (post.image !== null && post.content !== "" && post.parent === null) {
        return (
            <View style={styles.postContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("PostDetail", { post, number })}>
                {more ? <Text style={styles.imageContent}>{HASHTAG_FORMATTER(post.content, navigation)}</Text> : 
                <Text numberOfLines={1}  style={styles.imageContent}>{HASHTAG_FORMATTER(post.content, navigation)}</Text> 
                }
            </TouchableOpacity>
                <Text style={styles.more} onPress={() => setMore(!more)}>{more ? "show less" : "more"}</Text> 
            {post.image ? <TouchableOpacity onPress={() => navigation.navigate("PostDetail", { post, number, new_user })}>
                <Image style={styles.image} source={{ uri: `${baseURL}${post.image}` }}/>
            </TouchableOpacity>: <View style={styles.image} ></View>}
            </View>
        )
    } else if (post.parent !== null) {
        return (
            <View style={styles.postContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("PostDetail", { post, number, new_user })}>
                <View style={{ marginBottom: 5 }}>
                    <Text style={styles.imageContent}>Shared</Text>
                </View>
                {more ? <Text style={styles.imageContent}>{HASHTAG_FORMATTER(post.content, navigation)}</Text> :
                 <Text numberOfLines={10} style={styles.imageContent}>{HASHTAG_FORMATTER(post.content, navigation)}</Text>    
                }
                <Text style={styles.more} onPress={() => setMore(!more)}>{more ? "show less" : "more"}</Text> 
            </TouchableOpacity>
            </View>
        )
    } else {
        return null
    }
}

export default Content
