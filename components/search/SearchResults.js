import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { fetchToken } from '../../actions/auth'
import axios from 'axios'
import ErrorTemplate from '../shared/ErrorTemplate'
import SearchBar from './SearchBar'
import Post from './Post'
import Loading from '../shared/Loading'
import NoResultsFound from '../shared/NoResultsFound'
import { baseURL } from '../shared/HelperFunction'

class SearchResults extends Component{
    state = {
        data: {},
        loading: true,
        error: false,
        isFetching: false,
        loaded: false
    }
    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        const { search } = this.props.route.params
        axios.get(`${baseURL}/api/search/model/?query=${search}`, fetchToken(this.props.token))
            .then(res => {
                this.setState(state => ({ data: res.data, loading: false, loaded: true  }))
            }).catch(err => this.setState({ error: true, loading: false }))
    }
    handleEnd = () => {
        this.setState(state => ({ offset: state.offset + state.limit }), () => this.fetchData())
    }

    changeState = () => {
        this.setState({ error: false, loading: true })
    }

    render() {
        const { loading, data, error, loaded } = this.state
        const { navigation } = this.props
        const { search } = this.props.route.params

        if (loading) {
            return (
                <View style={styles.container}>
                    <SearchBar navigation={navigation} type="search" text={search}/>
                    <Loading style={styles.loading}/>
                </View>
            )
        } else if (loaded && data.posts.length === 0 && data.profile.length === 0 && data.tags.length === 0) {
            return (
                <View style={{ flex: 1, backgroundColor: "#1b1a20",}}>
                    <SearchBar navigation={navigation} type="search" text={search}/>
                    <NoResultsFound/>
                </View>
            )
        } else if (loaded) {
            return(
               <View style={styles.container}>
                   <SearchBar navigation={navigation} type="search" text={search}/>
                    {data.profile.length === 0 ? null :<View style={styles.view1}>
                    <Text style={styles.textStyle}>People</Text>
                    <FlatList
                        horizontal
                        data={data.profile}
                        keyExtractor={(x, i) => `${i}`}
                        initialNumToRender = {10}
                        renderItem={({ item, index }) => (
                            <View style={styles.item}>
                                <TouchableOpacity onPress={() => navigation.navigate(index === 5 ? "UserSearch" : "UsersProfile", { username: item.username, search })}>
                                    {item.image ? <ImageBackground style={styles.profileImage} source={{ uri: `${baseURL}${item.image}` }}>
                                            {index === 5 ? <View style={styles.more_view}>
                                            <Text style={{ color: "white", fontSize: 16}}>More</Text>
                                            </View>: null}
                                        </ImageBackground> 
                                    : <View style={styles.profileImage}></View>}
                                    <Text style={styles.textStyle2}>{item.username}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    </View>}
     
                    {data.posts.length === 0 ? null : <View style={styles.view1}>
                    <Text style={styles.textStyle}>Posts</Text>
                    <FlatList
                        horizontal
                        data={data.posts}
                        keyExtractor={(x, i) => `${i}`}
                        initialNumToRender = {10}
                        renderItem={({ item, index }) => (
                            <View style={styles.item}>
                                <Post post={item} navigation={navigation} index={index} search={search}/>
                            </View>
                        )}
                    />
                    </View>}
                    {data.tags.length === 0 ? null : <View style={styles.view1}>
                    <Text style={styles.textStyle}>Hashtags</Text>
                    <FlatList
                        horizontal
                        data={data.tags}
                        keyExtractor={(x, i) => `${i}`}
                        initialNumToRender = {10}
                        renderItem={({ item, index }) => (
                            <View style={styles.item}>
                                <Post post={item} navigation={navigation} index={index} search={search}/>
                            </View>
                        )}
                    />
                    </View>}
                    <View style={styles.view2}>
                    </View>
                </View>
            )
        } else if (error && loaded === false) {
            return (
                <View style={styles.container}>
                    <SearchBar navigation={navigation} type="search" text={search}/>
                    <ErrorTemplate color={"white"} fetchData={this.fetchData} changeState={this.changeState}/>
                </View>
            )
        } 


    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1b1a20",
    },
    item: {
        height: "100%",
        marginRight: 13
    },
    profileImage: {
        height: 150,
        width: 125,
        backgroundColor: "#3d3d3d"
    },
    view1: {
        marginTop: 40,
        marginLeft: 15
    },
    pageImage: {
        height: 68,
        width: 58,
        marginTop: 182,
        marginLeft: 10
    },
    textStyle: {
        marginBottom: 10,
        color: "white",
        fontSize: 16
    },
    textStyle2: {
        marginTop: 3,
        fontSize: 11.3,
        color: "white"
    },
    background_image: {
        height: 260,
        width: 192
    },
    page_view: {
        backgroundColor: "pink",
        height: 68,
        width: 58,
        marginTop: 182,
        marginLeft: 10
    },
    view2: {
        height: 30
    },
    loading: {
        height: "100%",
        backgroundColor: "#1b1a20",
        alignItems: "center",
        marginTop: 300
    },
    more_view: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
})


const mapStateToProps = (state) => ({
    token: state.auth.token
})

export default connect(mapStateToProps)(SearchResults)











{/* <View style={styles.container}>
<FlatList
    data={data.posts}
    keyExtractor={(x, i) => `${i}`}
    initialNumToRender = {10}
    renderItem={({ item }) => (
        <View style={styles.item}>
            <Post post={item} navigation={navigation} theme={this.props.theme}/>
        </View>
    )}
/>
<TouchableOpacity onPress={() => navigation.navigate("PostSearch", { search, posts: data.posts })}>
    <Text>Go to posts god fucking damn it.</Text>
</TouchableOpacity>
<FlatList
    data={data.page}
    keyExtractor={(x, i) => `${i}`}
    initialNumToRender = {10}
    renderItem={({ item }) => (
        <View style={styles.item}>
            <Text>{item.username}</Text>
        </View>
    )}
/>
<TouchableOpacity onPress={() => navigation.navigate("PageSearch", { search, page: data.page })}>
    <Text>Go to page god fucking damn it.</Text>
</TouchableOpacity>
<FlatList
    data={data.profile}
    keyExtractor={(x, i) => `${i}`}
    initialNumToRender = {10}
    renderItem={({ item }) => (
        <View style={styles.item}>
            <Text>{item.username}</Text>
        </View>
    )}
/>
<TouchableOpacity onPress={() => navigation.navigate("UserSearch", { search, profile: data.profile, type: "search" })}>
    <Text>Go to profile god fucking damn it.</Text>
</TouchableOpacity>
</View> */}