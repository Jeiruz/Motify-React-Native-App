import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchToken } from '../../actions/auth'
import NotificationList from './NotificationList'
import Loading from '../shared/Loading'
import ErrorTemplate from '../shared/ErrorTemplate'
import ErrorMessage from '../shared/ErrorMessage'
import { baseURL } from '../shared/HelperFunction'

class NotificationDashboard extends Component {

    state = {
        likes: [],
        follower: [],
        request: [],
        loading: true,
        error: false
    }

    componentDidMount() {
        this.fetchData()
    }

    // This is working properly J.
    fetchData = () => {
        const { username, token } = this.props
        axios.get(`${baseURL}/api/notification/user/?user=${username}`, fetchToken(token))
            .then(res => {
                this.setState({ likes: res.data.likes, follower: res.data.follower, request: res.data.request, loading: false })
            }).catch(err => this.setState({ error: true, loading: false }))
    }

    changeState = () => {
        this.setState({ error: false, loading: true })
    }

    render() {
        const { likes, follower, loading, request, error } = this.state
        const data = [...follower, ...likes, ...request]
        const { color, backgroundColor, third_color } = this.props.route.params
        const styles = StyleSheet.create({
            container: {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor,
                flex: 1
            },
            text: {
                color,
                fontSize: 22,
            }
        })
        if (error && data.length !== 0) {
            setTimeout(() => {
                this.setState({
                    error: false
                })
            }, 3000)
        }
        if (!loading && data.length !== 0) {
            return (
                <View style={{ backgroundColor, flex: 1}}>
                    {error ? <ErrorMessage/> : null }
                    <NotificationList 
                        navigation={this.props.navigation} 
                        color={color} 
                        backgroundColor={backgroundColor} 
                        third_color={third_color}
                        likes={likes}
                        follower={follower}
                        request={request}
                    />
                </View>
            )
        } else if (loading) {
            return (
                <Loading/>
            )
        } else if (!loading && data.length === 0 && !error) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>You haven't have any</Text>
                    <Text style={styles.text}>notification yet.</Text>
                </View>
            )
        } else if (error && data.length === 0) {
            return (
                <View style={styles.container}>
                    <ErrorTemplate changeState={this.changeState} fetchData={this.fetchData} color={color}/>
                </View>
            )
        }
        
    }
}



const mapStateToProps = (state) => ({
    token: state.auth.token,
    username: state.auth.user.username
})

export default connect(mapStateToProps)(NotificationDashboard)