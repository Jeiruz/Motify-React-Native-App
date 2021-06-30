import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { fetchToken  } from '../../actions/auth'
import { foryouFeed } from '../../actions/feed'
import axios from 'axios'
import Post from './Post'
import ErrorTemplate from '../shared/ErrorTemplate'
import ErrorMessage from '../shared/ErrorMessage'
import Loading from '../shared/Loading'
import FooterLoading from '../shared/FooterLoading'
import UsersToFollow from './UsersToFollow'
import { userList } from '../../actions/users'
import { baseURL } from '../shared/HelperFunction'

class ForYouDashboard extends Component{
    state = {
        data: [],
        loading: true,
        error: false,
        no_more: false,
        users: [],
        isFetching: false
    }
    componentDidMount() {
        const { data } = this.props
        const { new_user, users } = this.props
        if (data.length === 0) {
            this.fetchData()
        } else if (data.length !== 0) {
            this.setState({
                data,
            })
        } else if (data.length > 200) {
            this.fetchData()
        }
        if (!new_user && users.length === 0) {
            this.fetchUsers()
        } else if (!new_user && users.length !== 0) {
            this.setState({
                users
            })
        }
        
    }


    fetchData = () => {
        const { data, users } = this.state
        const { new_user, token } = this.props
            if (new_user) {
                axios.get(`${baseURL}/api/post/anonymous/?limit=10&offset=${data.length}`)
                    .then(res => {
                        this.setState(state => ({ data: [...res.data, ...state.data], loading: false  }))
                        res.data.length < 10 ? this.setState({ no_more: true }) : null 
                    }).catch(err => this.setState({ error: true, loading: false }))
            } else {
                axios.get(`${baseURL}/api/post/for_you/?limit=10&offset=${data.length}`, fetchToken(token))
                    .then(res => {
                        this.setState(state => ({ data: [...res.data, ...state.data], loading: false  }))
                        res.data.length < 10 ? this.setState({ no_more: true }) : null 
                    }).catch(err => this.setState({ error: true, loading: false }))
            }
            
            
            
    }
    fetchUsers = () => {
            axios.get(`${baseURL}/api/search/profile/?limit=10&offset=0&query=`, fetchToken(this.props.token))
            .then(res => {
                this.setState(state => ({ users: res.data }))
            })
    }

    refreshedData = () => {
        axios.get(`${baseURL}/api/post/infinite/?limit=10&offset=0`, fetchToken(this.props.token))
            .then(res => {
                this.setState(state => ({ 
                    data: [...res.data.snippets], 
                    loading: false,
                    isFetching: false 
                 }))
            }).catch(err => this.setState({ error: true, loading: false }))
    }
    onRefresh = () => {
        this.setState({ isFetching: true }, () => { this.refreshedData()})
    }


    changeState = () => {
        this.setState({ error: false, loading: true })
    }

    render() {
        const { loading, data, error, no_more, users, isFetching } = this.state
        let sortedArray = data.slice(0);
        const { navigation } = this.props
        sortedArray.sort(function(a, b) {
            return b.id - a.id 
        })
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: "#1b1a20",
            },
            item: {
                // marginTop: 24,
                height: "100%",
            }
        })
        if (error && data.length !== 0) {
            setTimeout(() => {
                this.setState({
                    error: false
                })
            }, 5000)
        }
        if (data.length !== 0) {
            this.props.foryouFeed(data)
        }
        if (users.length !== 0) {
            this.props.userList(users)
        }
        return (
        <View style={styles.container}> 
            {error && data.length !== 0 ? <ErrorMessage/> : null}    
            {loading && data.length === 0 ? <Loading/> : error && data.length === 0 ? 
            <View style={{ backgroundColor: "#1b1a20", flex: 1}}>
                <ErrorTemplate color={"white"} fetchData={this.fetchData} changeState={this.changeState}/>
            </View>
            : <FlatList
                data={sortedArray}
                keyExtractor={(x, i) => `${i}`}
                initialNumToRender = {10}
                onRefresh={this.onRefresh}
                refreshing={isFetching}
                onEndReached={() => no_more ? null : this.fetchData()}
                ListFooterComponent={() => <FooterLoading text={no_more ? "no more post" : null}/>}
                onEndReachedThreshold={0.1}
                renderItem={({ item, index }) => (
                    <View style={styles.item}> 
                        <Post post={item} navigation={navigation} new_user={this.props.new_user}/>
                        {index === 20 ? <UsersToFollow navigation={navigation} users={users}/> : null}
                        {index === 60 ? <UsersToFollow navigation={navigation} users={users}/> : null}
                        {index === 170 ? <UsersToFollow navigation={navigation} users={users}/> : null}
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
    data: state.feed.data,
    new_user: state.new_user.data,
    users: state.users.users
})

export default connect(mapStateToProps, { foryouFeed, userList })(ForYouDashboard)

