import React from 'react'
import { FlatList, View } from 'react-native'
import User from './User'

export default function UsersToFollow({ users, navigation }) {
    
    return (
        <View>
        <FlatList
                data={users}
                horizontal={true}
                keyExtractor={(x, i) => `${i}`}
                initialNumToRender = {10}
                renderItem={({ item, index }) => (
                        <User item={item} index={index} navigation={navigation}/>
                )}
            />
            </View>
    )
}
