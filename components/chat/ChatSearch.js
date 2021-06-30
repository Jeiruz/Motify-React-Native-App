import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import { fetchToken } from '../../actions/auth'
import axios from 'axios'
import SearchBar from '../search/SearchBar'
import Loading from '../shared/Loading'
import ErrorTemplate from '../shared/ErrorTemplate'
import FooterLoading from '../shared/FooterLoading'
import { baseURL } from '../shared/HelperFunction'

class ChatSearch extends Component{
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
        const { id } = this.props
        const { limit, offset } = this.state
        axios.get(`${baseURL}/api/friends/list/?limit=${limit}&offset=${offset}&id=${id}`, fetchToken(this.props.token))
            .then(res => {
                this.setState(state => ({ data: [...res.data, ...state.data], loading: false  }))
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
        
        return (
            <View style={styles.container}>
                <SearchBar navigation={navigation} type="chat"/>
                {loading ? <Loading style={styles.loading}/> : error ? 
                <View style={{ backgroundColor: "#1b1a20", flex: 1}}>
                    <ErrorTemplate color={"white"} fetchData={this.fetchData} changeState={this.changeState}/>
                </View>
                : <FlatList
                        numColumns={2}
                        data={data}
                        keyExtractor={(x, i) => `${i}`}
                        initialNumToRender = {10}
                        onEndReached={() => no_more ? null : this.handleEnd()}
                        ListFooterComponent={() => data.length === 0 ? null : <FooterLoading text={no_more ? "no more results" : null}/>}
                        onEndReachedThreshold={0.1}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <TouchableOpacity onPress={() => navigation.navigate("AddChat", {
                                    user: { username: me.username, id: me.id }, other_user: { username: item.username, id: item.id }
                                })}>
                                    <View style={styles.container1}>
                                    {item.image ? <Image style={styles.image} source={{ uri: `${baseURL}${item.image}` }}/> 
                                    : <View></View>}
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



const mapStateToProps = state => ({
    id: state.auth.user.id,
    token: state.auth.token,
    me: state.auth.user
})

export default connect(mapStateToProps)(ChatSearch)
