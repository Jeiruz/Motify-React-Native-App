import React from 'react'
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Image, ScrollView } from 'react-native'
import Template from './Template'
import { baseURL } from '../shared/HelperFunction'
import HeaderView from '../shared/HeaderView'

function FlatListed({ data, styles, navigation, type, backgroundColor }) {
    return (
        <FlatList
                data={data}
                keyExtractor={(x, i) => `${i}`}
                initialNumToRender = {10}
                onEndReachedThreshold={0.1}
                ListFooterComponent={data.length === 10 ? 
                    <View style={styles.username_view}>
                        <TouchableOpacity onPress={() => navigation.navigate("NotificationTemplate", { styles, type })}>
                            <Text style={styles.more}>More</Text>
                        </TouchableOpacity>
                    </View>
                    : null}
                renderItem={({ item, index }) => {
                    if (item.model_type === "follower") {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate("UsersProfile", { username: item.user })}>
                                <Template item={item} styles={styles} navigation={navigation} follower={true}/>
                            </TouchableOpacity>
                        )
                    } else if (item.model_type === "likes") {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate("NotificationDetail", { slug: item.slug, backgroundColor })}>
                                <Template item={item} styles={styles} navigation={navigation} follower={false}/>
                            </TouchableOpacity>
                        )
                    } else if (item.model_type === "request") {
                        return (
                                <View style={styles.list_container}>
                                <TouchableOpacity onPress={() => navigation.navigate("UsersProfile", { username: item.user })}>
                                    {item.image ? 
                                    <Image style={styles.image} source={{ uri: `${baseURL}${item.image}` }}/> 
                                    : <View style={styles.image} ></View>}
                                </TouchableOpacity>
                                <View style={styles.username_view}>
                                    <Text style={styles.username_text}>{item.user} send you a friend request</Text>
                                </View>
                                </View>
                        )
                    }
                }}
            />
    )
}
export default function NotificationList({ navigation, color, backgroundColor, likes, follower, request, third_color }) {
    const styles = StyleSheet.create({
        list_container: {
            height: 50,
            display: "flex",
            flexDirection: "row",
            backgroundColor: third_color,
            marginBottom: 5,
            marginLeft: 10,
            marginRight: 10
        },
        image: {
            width: 40,
            height: 40,
            marginLeft: 10,
            borderRadius: 40,
            marginTop: 5,
        },
        container: {
            backgroundColor,
            flex: 1
        },
        username_view: {
            justifyContent: "center",
            textAlign: "center"
        },
        text: {
            fontSize: 17,
            color,
            paddingLeft: 10,
            marginBottom: 10,
            marginTop: 10
        },
        username_text: {
            color,
            marginLeft: 10
        },
        more: {
            fontSize: 17,
            marginTop: 10,
            color
        },
        template_container: {
            flex: 1,
            height: "100%",
            position: "absolute",
            width: "100%",
            backgroundColor,
        },
        item: {
            marginTop: 15,
            height: "100%",
        }
    })
    return (
        <View style={styles.container}>
            <ScrollView>
            <HeaderView navigation={navigation} color={color} title="Notification"/>
            {likes.length === 0 ? null : 
            <View>
                <Text style={styles.text}>Likes</Text>
                <FlatListed data={likes} styles={styles} navigation={navigation} type={"likes"} backgroundColor={backgroundColor}/>
            </View>
            }
            {follower.length === 0 ? null :
            <View>
                <Text style={styles.text}>Followers</Text>
                <FlatListed data={follower} styles={styles} navigation={navigation} type={"follower"} backgroundColor={backgroundColor}/>
            </View>
            }
            {request.length === 0 ? null :
            <View>
                <Text style={styles.text}>Request</Text>
                <FlatListed data={request} styles={styles} navigation={navigation} type={"request"} backgroundColor={backgroundColor}/>
            </View>
            }
            </ScrollView>
        </View>
    )
}

