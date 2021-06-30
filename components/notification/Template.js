import React from 'react'
import { View, Text, Image } from 'react-native'
import { baseURL } from '../shared/HelperFunction'

export default function Template({ item, styles, navigation, follower }) {
    return (
        <View style={styles.list_container}>
            {item.image ? 
            <Image style={styles.image} source={{ uri: `${baseURL}${item.image}` }}/> 
            : <View style={styles.image} ></View>}
            <View style={styles.username_view}>
                <Text style={styles.username_text}>{item.user} {follower ? "followed you" : "likes your post"}</Text>
            </View>
        </View>
    )
}