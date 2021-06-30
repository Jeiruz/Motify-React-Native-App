import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchToken } from '../../actions/auth'
import SearchBar from './SearchBar'
import Loading from '../shared/Loading'
import ErrorTemplate from '../shared/ErrorTemplate'
import NoResultsFound from '../shared/NoResultsFound'
import FooterLoading from '../shared/FooterLoading'
import { baseURL } from '../shared/HelperFunction'

class UserSearch extends Component{
    state = {
        data: [],
        limit: 10,
        offset: 0,
        loading: true,
        error: false,
        no_more: false
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        const { limit, offset } = this.state
        const { search } = this.props.route.params
        axios.get(`${baseURL}/api/search/profile/?limit=${limit}&offset=${offset}&query=${search}`, fetchToken(this.props.token))
            .then(res => {
                this.setState(state => ({ data: [...res.data, ...state.data], loading: false }))
                res.data < 10 ? this.setState({ no_more: true }) : null
            }).catch(err => this.setState({ error: true, loading: false }))
    }

    handleEnd = () => {
        this.setState(state => ({ offset: state.offset + state.limit }), () => this.fetchData())
    }

    changeState = () => {
        this.setState({ error: false, loading: true })
    }

    render() {
        const { data, loading, error, no_more } = this.state
        const { navigation, me } = this.props
        const { type, search } = this.props.route.params
        if (data.length === 0 && !loading && !error) {
            return (
                <View style={styles.container}>
                    {type === "chat" ? <SearchBar navigation={navigation} type={type} text={search}/> : null}
                    <NoResultsFound/>
                </View>
            )
        }
        return(
            <View style={styles.container}>
                {type === "chat" ? <SearchBar navigation={navigation} type={type} text={search}/> : null}
                {loading ? <Loading style={type === "chat" ? styles.loading : null }/> : error ? 
                <View style={{ backgroundColor: "#1b1a20", flex: 1}}>
                    <ErrorTemplate color={"white"} fetchData={this.fetchData} changeState={this.changeState}/>
                </View>
                : <FlatList
                    numColumns={2}
                    data={data}
                    keyExtractor={(x, i) => `${i}`}
                    initialNumToRender = {10}
                    onEndReached={() => no_more ? null : this.handleEnd()}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => <FooterLoading text={no_more ? "no more results" : null }/>}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <TouchableOpacity onPress={() => navigation.navigate(type === "chat" ? "AddChat" :"UsersProfile", { 
                                username: item.username,
                                user: { username: me.username, id: me.id }, other_user: { username: item.username, id: item.id }
                            })}>
                                <View style={styles.container1}>
                                {item.image ? <Image style={styles.image} source={{ uri: `${baseURL}${item.image}` }}/> 
                                : <View style={styles.image}></View>}
                                <Text style={styles.textStyle2}>{item.username}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />}
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        position: "absolute",
        width: "100%",
        backgroundColor: "#1b1a20",
    },
    item: {
        marginTop: 15,
        height: "100%",
    },
    image: {
        width: 165,
        height: 225,
        backgroundColor: "#3d3d3d",
    },
    container1: {
        marginLeft: 15
    },
    textStyle2: {
        marginTop: 3,
        fontSize: 11.3,
        color: "white"
    },
    loading: {
        height: "100%",
        backgroundColor: "#1b1a20",
        alignItems: "center",
        marginTop: 300
    }
})


const mapStateToProps = (state) => ({
    token: state.auth.token,
    me: state.auth.user
})

export default connect(mapStateToProps, { fetchToken } )(UserSearch)