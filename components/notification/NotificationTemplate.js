import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchToken } from '../../actions/auth'
import Loading from '../shared/Loading'
import ErrorTemplate from '../shared/ErrorTemplate'
import Template from './Template'
import { baseURL } from '../shared/HelperFunction'

class NotificationTemplate extends Component {
    state = {
        data: [],
        limit: 10,
        offset: 0,
        loading: true,
        error: false,
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        const { limit, offset } = this.state
        const { type } = this.props.route.params
        const { username, token } = this.props
        const url = () => {
            if (type === "likes") {
                return `${baseURL}/api/likes/notification/user/?limit=${limit}&offset=${offset}&user=${username}`
            } else if (type === "follower") {
                return `${baseURL}/api/follower/notification/user/?limit=${limit}&offset=${offset}&user=${username}`
            } else if (type === "request") {
                return `${baseURL}/api/request/notification/user/?limit=${limit}&offset=${offset}&user=${username}`
            }
        }
        axios.get(url(), fetchToken(token))
            .then(res => {
                this.setState(state => ({ data: [...res.data.data, ...state.data], loading: false }))
            }).catch(err => this.setState({ error: true, loading: false }))
    }

    handleEnd = () => {
        this.setState(state => ({ offset: state.offset + state.limit }), () => this.fetchData())
    }

    changeState = () => {
        this.setState({ error: false, loading: true })
    }

    render() {
        const { data, loading, error } = this.state
        const { navigation } = this.props
        const { styles } = this.props.route.params
        return(
            <View style={styles.template_container}>
                {loading ? <Loading/> : error ? 
                <View style={{ backgroundColor: "#1b1a20", flex: 1}}>
                    <ErrorTemplate color={"white"} fetchData={this.fetchData} changeState={this.changeState}/>
                </View>
                : <FlatList
                    data={data}
                    keyExtractor={(x, i) => `${i}`}
                    initialNumToRender = {10}
                    onEndReached={() => this.handleEnd()}
                    onEndReachedThreshold={0.1}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Template 
                                item={item} 
                                navigation={navigation} 
                                styles={styles} 
                                follower={item.model_type === "follower" ? true : false}/>
                        </View>
                    )}
                />}
            </View>
        )

    }
}


const mapStateToProps = state => ({
    token: state.auth.token,
    username: state.auth.user.username
})

export default connect(mapStateToProps)(NotificationTemplate)