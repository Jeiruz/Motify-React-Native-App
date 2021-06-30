import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, StyleSheet} from 'react-native'
import ChatList from './ChatList'
import NoChatText from './NoChatText'
import { fetchToken } from '../../actions/auth'
import axios from 'axios'
import { chatListPersist } from '../../actions/chat_list'
import ErrorMessage from '../shared/ErrorMessage'
import ErrorTemplate from '../shared/ErrorTemplate'
import Loading from '../shared/Loading'
import FooterLoading from '../shared/FooterLoading'
import { baseURL } from '../shared/HelperFunction'

class ChatDashboard extends Component {
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
        const { username, token, chatListPersist } = this.props
        axios.get(`${baseURL}/chat/list/?limit=10&offset=${data.length}&username=${username}`, fetchToken(token))
            .then(res => {
                this.setState(state => ({ data: [...res.data, ...state.data], loading: false  }))
                chatListPersist(res.data)
                res.data.length < 10 ? this.setState({ no_more: true }) : null 
            }).catch(err => this.setState({ error: true, loading: false }))
    }


    changeState = () => {
        this.setState({ error: false, loading: true })
    }

    render() {
        const { data, error, loading, no_more } = this.state
        const { navigation, user, chat_list } = this.props
        let sortedArray = data.slice(0);
        sortedArray.sort(function(a, b) {
            return a.messages.map(m => { return m.id }) + b.messages.map(m => { return m.id})
        })
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: "#1b1a20",
            },
            item: {
                // Fix the error here J.
                // marginTop: 24,
                marginTop: 5,
                height: "100%",
            }
        })
        if (error && data.length !== 0) {
            setTimeout(() => {
                this.setState({
                    error: false
                })
            }, 3000)
        }
        return (
            <View style={styles.container}> 
                {error && data.length !== 0 ? <ErrorMessage/> : null}    
                {loading && data.length === 0 ? <Loading/> : error && data.length === 0 ? 
                <View style={{ backgroundColor: "#1b1a20", flex: 1}}>
                    <ErrorTemplate color={"white"} fetchData={this.fetchData} changeState={this.changeState}/>
                </View>
                // careful with this j.
                : <View style={{ marginTop: 13, flex: 1}}>
                    {error && chat_list.length !== 0 ? <ErrorMessage/> : null}
                    {no_more && data.length === 0 ? <NoChatText navigation={navigation}/> :
                        <FlatList
                            numColumns={2}
                            data={sortedArray}
                            onEndReached={() => no_more ? null : this.fetchData()}
                            ListFooterComponent={() => <FooterLoading text={no_more ? " " : null}/>}
                            onEndReachedThreshold={0.1}
                            keyExtractor={(x, i) => `${i}`}
                            renderItem={({ item }) => (
                                <View style={styles.item}>
                                    <ChatList user={user} chat={item} navigation={navigation}/>
                                </View>
                            )}
                        />
                    }
                </View>}
                </View>
            )
    }
}



const mapStateToProps = state => ({
    username: state.auth.user.username,
    token: state.auth.token,
    user: state.auth.user,
    chat_list: state.chat_list.chat_list
})

export default connect(mapStateToProps, { chatListPersist })(ChatDashboard)














