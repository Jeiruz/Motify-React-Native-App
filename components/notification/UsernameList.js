import React from 'react'
import { View, Text } from 'react-native'

export default function UsernameList({ user, type }) {
    return (
        <View>
            <Text>{user.username} {type === "likes" ? "likes your post." : "commented on your post."}</Text>
        </View>
    )
}
