import React, { Component } from 'react'
import { View, FlatList, StyleSheet, ImageBackground, Text } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchToken } from '../../actions/auth'
import Post from '../feed/Post'
import Loading from '../shared/Loading'
import ErrorTemplate from '../shared/ErrorTemplate'
import FooterLoading from '../shared/FooterLoading'
import { baseURL } from '../shared/HelperFunction'

class PostSearch extends Component{
    state = {
        data: [],
        loading: true,
        error: false,
        no_more: false
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        const { data } = this.state
        const { search, likes, profile, category, tags } = this.props.route.params
        const { username } = this.props.user
        if (likes && !profile && !category) {
            axios.get(`${baseURL}/api/post/liked/?limit=${10}&offset=${data.length}&user=${username}`, fetchToken(this.props.token))
            .then(res => {
                this.setState(state => ({ data: [...res.data.posts, ...state.data], loading: false }))
                res.data.posts.length < 10 ? this.setState({ no_more: true }) : null
            }).catch(err => this.setState({ error: true, loading: false }))
        } else if (!likes && !profile && !category) {
            axios.get(`${baseURL}/api/post/filter/?limit=${10}&offset=${data.length}&query=${search}`, fetchToken(this.props.token))
            .then(res => {
                this.setState(state => ({ data: [...res.data.posts, ...state.data], loading: false }))
                res.data.posts.length < 10 ? this.setState({ no_more: true }) : null
            }).catch(err => this.setState({ error: true, loading: false }))
        } else if (!likes && profile && !category) {
            axios.get(`${baseURL}/api/user/list/?username=${username}&limit=${10}&offset=${data.length}`, fetchToken(this.props.token))
            .then(res => {
                this.setState(state => ({ data: [...res.data.posts, ...state.data], loading: false }))
                res.data.posts.length < 10 ? this.setState({ no_more: true }) : null
            }).catch(err => this.setState({ error: true, loading: false }))
        } else if (category && !likes && !profile) {
            axios.get(`${baseURL}/api/post/tags/filter/?limit=${10}&offset=${data.length}&query=${tags}`, fetchToken(this.props.token))
            .then(res => {
                this.setState(state => ({ data: [...res.data.posts, ...state.data], loading: false  }))
                res.data.posts.length < 10 ? this.setState({ no_more: true }) : null
                }).catch(err => this.setState({ error: true, loading: false }))
        }
    }


    changeState = () => {
        this.setState({ error: false, loading: true })
    }

    render() {
        const { loading, data, error, no_more } = this.state
        const { background_color, tags, image, color } = this.props.route.params
        let sortedArray = data.slice(0);
        sortedArray.sort(function(a, b) {
            return b.id - a.id 
        })
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                height: "100%",
                position: "absolute",
                width: "100%",
                backgroundColor: background_color ? background_color : "#1b1a20",
            },
            item: {
                // marginTop: 5,
                height: "100%",
            },
            loadingContainer: {
                height: "100%",
                backgroundColor: background_color,
                alignItems: "center",
                justifyContent: "center",
            },
            image: {
                height: 300,
            },
            header_view: {
                justifyContent: "center",
                alignItems: "center",
                flex: 1
            },
            tags: {
                fontSize: 24,
                color: "white",
                // fontWeight: "bold",
            }
        })
        return(
            <View style={styles.container}>
                {loading ? <Loading style={background_color ? styles.loadingContainer : null} /> : error ? 
                <View style={{ backgroundColor: "#1b1a20", flex: 1}}>
                    <ErrorTemplate color={"white"} fetchData={this.fetchData} changeState={this.changeState}/>
                </View>    
                :<FlatList
                    ListHeaderComponent={() => image ?
                        <ImageBackground style={styles.image} source={{ uri: `${baseURL}${image}` }}>
                            <View style={styles.header_view}>
                                <Text style={styles.tags}>#{tags}</Text>
                            </View>
                        </ImageBackground> : null }
                    data={sortedArray}
                    keyExtractor={(x, i) => `${i}`}
                    initialNumToRender = {10}
                    onEndReached={() => no_more ? null : this.fetchData()}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => <FooterLoading color={color ? color : null } text={no_more ? "no more results" : null}/>}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Post post={item} navigation={this.props.navigation}/>
                        </View>
                    )}
                />}
        </View>
        )

    }
}




const mapStateToProps = (state) => ({
    token: state.auth.token,
    offset: state.feed.offset,
    user: state.auth.user,
})

export default connect(mapStateToProps, { fetchToken } )(PostSearch)