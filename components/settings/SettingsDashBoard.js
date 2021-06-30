import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import { logout } from '../../actions/auth'
import { connect } from 'react-redux'
import HeaderView from '../shared/HeaderView'
import { baseURL } from '../shared/HelperFunction'

const data = [ { text: "Likes", id: 1 }, 
               { text: "Following", id: 2 }, 
               { text: "Terms and Condition", id: 3 }, 
               { text: "Logout", id: 4 }]

function SettingsDashboard({ logout, route, navigation }) {
    const { profile } = route.params
    const { color, background_color, third_color } = profile
    const styles = StyleSheet.create({
        container: {
            backgroundColor: background_color,
            flex: 1
        },
        view1: {
            display: "flex",
            flexDirection: "row",
            marginLeft: 12,
            marginTop: 40,
            height: 53,
        },
        image: {
            height: 53, 
            width: 53,
            borderRadius: 30,   
            backgroundColor: background_color,
        },
        username: {
            paddingLeft: 8,
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            color,
        },
        view2: {
            marginTop: 20
        },
        info_view: {
            marginLeft: 15,
            marginRight: 15,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: third_color,
            height: 60,
            marginBottom: 15
        },
        info_text: {
            color,
        },
        info_text1: {
            color,
            width: 150
        },
        view3: {
            marginTop: 20,
            marginLeft: 15,
        },
        item: {
            backgroundColor: third_color,
            height: 185,
            width: 165,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 15,
            marginBottom: 15
        },
        text: {
            color,
            fontSize: 17,
        },
        view4: {
            marginTop: 5,
            justifyContent: "center",
            alignItems: "center"
        },
        textEdit: {
            color,
            fontSize: 17
        }
    })
    const navigate = (index) => {
        if (index === 0) {
            navigation.navigate("PostSearch", { likes: true, background_color, color })
        } else if (index === 1) {
            navigation.navigate("FollowerList", { settings: true, username: profile.username, profile })
        } else if (index === 2) {
            navigation.navigate("TermsAndCondition", { profile })
        } else if (index === 3) {
            navigation.navigate("Logout", { profile })
        }
    }
    return (
        <View style={styles.container}>
            <HeaderView navigation={navigation} color={color} title={"Settings"}/>
            <View style={styles.view1}>
                    {profile.image ? 
                    <TouchableOpacity onPress={() => navigation.navigate("ImageDetail", { image: profile.image, backgroundColor: background_color })}>
                        <Image style={styles.image} source={{ uri: `${baseURL}${profile.image}` }}/> 
                    </TouchableOpacity>
                    : <View  style={styles.images}></View>}
                    <Text style={styles.username}>{profile.username}</Text>
                </View>
            <View style={styles.view2}>
                <View style={styles.info_view}>
                    <Text style={styles.info_text1} numberOfLines={2}>{profile.bio}</Text>
                </View>
                <View style={styles.info_view}>
                    <Text style={styles.info_text}>{profile.location}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("EditDashboard", { profile })} style={styles.view4}>
                <Text style={styles.textEdit}>Edit</Text>
            </TouchableOpacity>
            <View style={styles.view3}>
            <FlatList
                    data={data}
                    numColumns={2}
                    keyExtractor={(x, i) => `${i}`}
                    initialNumToRender = {10}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => navigate(index)}>
                                {index === 2 ? 
                                <View style={styles.item}>
                                    <Text style={styles.text}>Terms</Text>
                                    <Text style={styles.text}>and</Text>
                                    <Text style={styles.text}>Condition</Text> 
                                </View>
                                :<View style={styles.item}>
                                    <Text style={styles.text}>{item.text}</Text>
                                </View>}                
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}

export default connect(null, { logout })(SettingsDashboard)