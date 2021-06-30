import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { fetchToken } from '../../actions/auth'
import axios from 'axios'
import Post from '../search/Post'
import Loading from '../shared/Loading'
import { connect } from 'react-redux'
import CategoryList from '../category/CategoryList'
import { noFollowing } from '../../actions/no_following'
import { baseURL } from '../shared/HelperFunction'
import ErrorTemplate from '../shared/ErrorTemplate'

function NoFollowingYet({ token, navigation, category, noFollowing, profiles, post }) {
    const [state, setState] = useState({
        profile: [],
        posts: [],
        loading: true,
        error: false
    })
    useEffect(() => {
        if (profiles === null && post === null) {
            fetchData()
        } else if (profiles !== null && post !== null) {
            setState({
                profile: profiles,
                posts: post,
                loading: false
            })
        }
        
    }, [])
    const fetchData = () => {
        axios.get(`${baseURL}/api/post/no_following/`, fetchToken(token))
            .then(res => {
                setState({ profile: res.data.profile, posts: res.data.posts, loading: false })
                noFollowing(res.data.profile, res.data.posts)
            }).catch(err => setState({ loading: false, error: true }))
    }
    const changeState = () => {
        this.setState({ error: false, loading: true })
    }
    const { loading, profile, posts, error } = state
    if (loading) {
        return (
            <View style={styles.container}>
                <Loading/>
            </View>
        )
    } else if (!loading && !error) {
        return (
            <View style={styles.container}>
                <ScrollView>
                {profile.length === 0 ? null : <View style={styles.view1}>
                <Text style={styles.text}>People to follow</Text>
                <FlatList
                    numColumns={2}
                    data={profile}
                    keyExtractor={(x, i) => `${i}`}
                    initialNumToRender = {10}
                    renderItem={({ item, index }) => (
                        <View style={styles.item1}>
                            <TouchableOpacity onPress={() => navigation.navigate("UsersProfile", { username: item.username })}>
                                {item.image ? <ImageBackground style={styles.profile_image} source={{ uri: `${baseURL}${item.image}` }}>
                                    </ImageBackground> 
                                : <View style={styles.profile_image}></View>}
                                <Text style={styles.text1}>{item.username}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
                </View>}
                {posts.length === 0 ? null : <View style={styles.view2}>
                <Text style={styles.text}>Post</Text>
                <FlatList
                    horizontal
                    data={posts}
                    keyExtractor={(x, i) => `${i}`}
                    initialNumToRender = {10}
                    renderItem={({ item }) => (
                        <View style={styles.item1}>
                            <Post post={item} navigation={navigation} />
                        </View>
                    )}
                />
                </View>}
                {category ? <View style={styles.view2}>
                <Text style={styles.text}>Hashtags</Text>
                <FlatList
                    horizontal
                    data={category}
                    keyExtractor={(x, i) => `${i}`}
                    initialNumToRender = {10}
                    renderItem={({ item }) => (
                        <View style={styles.item1}>
                            <CategoryList list={item} navigation={navigation} feed={true}/>
                        </View>
                    )}
                />
                </View> : null}
                </ScrollView>
            </View>
        )
    } else if (error && !loading) {
        return (
            <View style={styles.container}>
                <ErrorTemplate color={"white"} fetchData={fetchData} changeState={changeState}/>
            </View>
        )
    }
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1b1a20",
    },
    item1: {
        height: "100%",
        marginRight: 15,
        marginTop: 15
    },
    profile_image: {
        height: 200,
        width: 165
    },
    view1: {
        marginTop: 20,
        marginLeft: 15
    },
    view2: {
        marginTop: 20,
        marginLeft: 15
    },
    text1: {
        marginTop: 3,
        fontSize: 11.3,
        color: "white"
    },
    text: {
        marginBottom: 10,
        color: "white",
        fontSize: 16
    }
})

const mapStateToProps = state => ({
    category: state.category.data,
    profiles: state.no_following.profile,
    post: state.no_following.post
})

export default connect(mapStateToProps, { noFollowing })(NoFollowingYet)