import React from 'react'
import { FlatList, View, TouchableOpacity, ImageBackground, Text, StyleSheet } from 'react-native'
import { baseURL } from '../shared/HelperFunction'

export default function Follower({ profile, styles, navigation}) {
    const style = StyleSheet.create({
        container: {
            justifyContent: "center",
            textAlign: "center",
            marginTop: 30
        },
        text: {
            fontSize: 17,
            color: profile.color
        }
    })
    return (
        <FlatList
                horizontal
                data={profile.follower}
                keyExtractor={(x, i) => `${i}`}
                initialNumToRender = {10}
                renderItem={({ item, index }) => (
                    <View style={styles.follower_view}> 
                        <TouchableOpacity onPress={() => navigation.navigate(index === 5 ? "FollowerList": "UsersProfile", { id: profile.id, username: item.user, profile })}>
                            {item.image ? 
                            <ImageBackground style={styles.follower} source={{ uri: `${baseURL}${item.image}` }}>
                                { index === 5 ? <View style={style.container}>
                                    <Text style={style.text}>More</Text>
                                </View>: null}
                            </ImageBackground>
                            : <View style={styles.follower}></View>}
                        </TouchableOpacity>
                    </View>
                )}
            />
    )
}
