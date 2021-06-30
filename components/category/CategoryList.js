import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { baseURL } from '../shared/HelperFunction'

export default function CategoryList({ list, navigation, feed }) {
    const hashTags = (content) => {
        if (content === "#meme_tags") {
            return "memes"
        } else if (content === "#games_tags") {
            return "games"
        } else if (content === "#awesome_tags") {
            return "awesome"
        } else if (content === "#great_tags") {
            return "great"
        } else if (content === "#amazing_tags") {
            return "amazing"
        } else if (content === "#damn_tags") {
            return "damn"
        }
    }

    const styles = StyleSheet.create({
        image: {
            width: 165,
            height: 225
        },
        feed_image: {
            height: 235,
            width: 193,
        },
        postContainer: {
            height: "100%",
            marginLeft: feed ? 0 : 15,
            position: "relative"
        },
        tagsStyle: {
            // fontWeight: "bold",
            color: "white",
            fontSize: 24
        },
        // This is awesome!!!
        container: {
            position: "absolute",
            bottom: 20,
            left: 8,      
        }
    })

    return (
        <View style={styles.postContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("PostSearch", { tags: hashTags(list.content), image: list.image, category: true  })}>
            {list.image ?
            <Image style={feed ? styles.feed_image : styles.image} source={{ uri: `${baseURL}${list.image}` }}/>
            : null
                }
                <View style={styles.container}>    
                    <Text style={styles.tagsStyle}>#{hashTags(list.content)}</Text>
                </View> 
            </TouchableOpacity> 
        </View>
    )
}


