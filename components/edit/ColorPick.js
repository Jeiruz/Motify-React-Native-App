import React from 'react'
import { View, Text, FlatList } from 'react-native'
import ColorPickList from './ColorPickList'

const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

export default function ColorPick({ route, navigation }) {
    const { profile } = route.params
    return (
        <View>
            <FlatList
                data={numberArray}
                keyExtractor={(x, i) => `${i}`}
                initialNumToRender = {10}
                renderItem={({ item }) => (
                    <View> 
                        <ColorPickList number={item} profile={profile} navigation={navigation}/>
                    </View>
                )}
            />
        </View>
    )
}
