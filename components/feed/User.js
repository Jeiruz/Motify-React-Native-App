import React, { useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { random_style, baseURL } from '../shared/HelperFunction'
import { connect } from 'react-redux'
import { manyAction } from '../../actions/profile'


function User({ item, manyAction, index, navigation }) {
    const [follow, setFollow] = useState({ is_following: item.is_following })
    const toggleFollow = (type) => {
        if (item.is_following === true && type === "follow") {
            manyAction(item.username, "unfollow")
        } else if (item.is_following === false && type === "follow") {
            manyAction(item.username, "follow")
        } 
        if (type === "follow") {
            setFollow({ is_following: !follow.is_following })
        } 
    }
    const number = Math.floor(Math.random() * 15)
    const { color, backgroundColor, third_color } = random_style(number)
    const styles = StyleSheet.create({
        container: {
            backgroundColor,
            height: 270,
            width: 220,
            justifyContent: "center",
            alignItems: "center"
        },
        image_background: {
            backgroundColor: third_color,
            height: 250,
            width: 200,
            justifyContent: "center",
            alignItems: "center"
        },
        text: {
            color,
            fontSize: 17,
            position: "absolute",
            top: 5,
            left: 10,
            fontWeight: "bold"
        },
        follow: {
            color,
            fontSize: 17,
            fontWeight: "bold"
        },
        setFollow: {
            height: 30,
            width: 100,
            backgroundColor,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 150
        },
        more: {
            fontSize: 17,
            color
        },
        moreView: {
            justifyContent: "center",
            alignItems: "center",
            height: 30,
            width: 100,
            backgroundColor,
        }

    })
    const render = () => {
        return (
            <View>
                 {index === 9 ? null :
                <TouchableOpacity onPress={() => navigation.navigate("UsersProfile", { username: item.username })}>
                    <View style={styles.setFollow}>
                        <TouchableOpacity onPress={() => toggleFollow("follow")}>
                        <Text style={styles.follow}>{follow.is_following ? "Following" : "Follow"}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity> 
                }
                {index === 9 ? <TouchableOpacity onPress={() => navigation.navigate("UserSearch", { search: "" })}>
                        <View style={styles.moreView}>
                            <Text style={styles.more}>More</Text>
                        </View>
                    </TouchableOpacity> : null }
            </View>
        )
    }
    return (
        <View style={styles.container}> 
            {item.image ? <ImageBackground style={styles.image_background} source={{ uri: `${baseURL}${item.image}` }}>
                {index === 9 ? null : <Text style={styles.text}>{item.username}</Text>}
              {render()} 
            </ImageBackground> : <View style={styles.image_background}>
            {index === 9 ? null : <Text style={styles.text}>{item.username}</Text>}
              {render()}
                </View>}
        </View>
    )
}

export default connect(null, { manyAction })(User)
