import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchToken } from '../../actions/auth'
import axios from 'axios'
import { renderTimestamp, baseURL } from '../shared/HelperFunction'
import ChatForm from './ChatForm'
import ErrorTemplate from '../shared/ErrorTemplate'
import Loading from '../shared/Loading'
import FooterLoading from '../shared/FooterLoading'
import ErrorMessage from '../shared/ErrorMessage'

class ChatRoom extends Component {
    state = {
        data: [],
        loading: true,
        error: false,
        no_more: false,
    }

    componentDidMount() {
       this.fetchData()
    }

    fetchData = () => {
        const { chat_id } = this.props.route.params
        const { data } = this.state
        axios.get(`${baseURL}/chat/list/message/?limit=10&offset=${data.length}&id=${chat_id}`, fetchToken(this.props.token))
            .then(res => {
                this.setState({ data: [...res.data, ...this.state.data], loading: false})
                res.data.length < 10 ? this.setState({ no_more: true }) : null 
            }).catch(err => this.setState({ error: true, loading: false }))
    }

    addMessage = (user, content, chat_id) => {
        axios.post(`${baseURL}/chat/create/message/`, { user, content, chat_id }, fetchToken(this.props.token))
            .then(res => this.setState({ data: [...this.state.data, res.data]}))
            .catch(err => this.setState({ error: true }))
    }

    handleEnd = () => {
        this.setState(state => ({ offset: state.offset + state.limit }), () => this.fetchData())
    }
    changeState = () => {
        this.setState({ error: false, loading: true })
    }

    render() {
        const { loading, data, error, no_more } = this.state
        const { username } = this.props
        const { chat_id } = this.props.route.params
        let sortedArray = data.slice(0);
        sortedArray.sort(function(a, b) {
            return b.id - a.id 
        })
        if (error && data.length !== 0) {
            setTimeout(() => {
                this.setState({
                    error: false
                })
            }, 5000)
        }
        if (loading && data.length === 0) {
            return <Loading/>
        } else if ( error && data.length === 0) {
            return <View style={{ flex: 1}}>
                <ErrorTemplate color={"white"} fetchData={this.fetchData} changeState={this.changeState}/>
            </View>
        } else {
            return (
                <View style={styles.container}>
                {error && data.length !== 0 ? <ErrorMessage/> : null}  
                <FlatList
                        inverted={true}
                        data={sortedArray}
                        keyExtractor={(x, i) => `${i}`}
                        initialNumToRender = {10}
                        onEndReached={() => no_more ? null : this.fetchData()}
                        ListFooterComponent={() => <FooterLoading text={no_more ? "no more messages" : null}/>}
                        onEndReachedThreshold={0.1}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                            <View style={username === item.username ? styles.sent : styles.replies}>
                                <View style={username === item.username ? styles.sentContainer : styles.repliesContainer}>
                                    <Text style={{ color: "white" }}>{item.content}</Text>
                                    <Text style={{ color: "white" }}>{renderTimestamp(item.timestamp)}</Text>
                                </View>
                            </View>
                            </View>
                        )}
                    />
                        <ChatForm user={username} chat_id={chat_id}  addMessage={this.addMessage}/>
                    <View>
                    </View>
            </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    messageContainer: {
        flex:1,
        height: "100%"
    },
    container: {
        flex: 1,
        height: "100%",
        position: "absolute",
        width: "100%"
    },
    sent: {
        maxWidth: "100%",
        maxHeight: "100%",
        marginLeft: 80,
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 10   
    },
    sentContainer: {
        backgroundColor: "#3d3d3d",
        padding: 10,
        borderTopRightRadius: 0,
        borderRadius: 10,
        // shadowOffset: {
        //     width: 0.5, height: 2
        // },
        // shadowColor: '#333',
        // shadowOpacity: 0.3,
        // shadowRadius: 4  
    },
    replies: {
        maxWidth: "100%",
        maxHeight: "100%",
        marginRight: 80,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 10
    },
    repliesContainer: {
        backgroundColor: "#3d3d3d",
        padding: 10,
        borderTopLeftRadius: 0,
        borderRadius: 10,
        // shadowOffset: {
        //     width: 0.5, height: 2
        // },
        // shadowColor: '#333',
        // shadowOpacity: 0.3,
        // shadowRadius: 4
    }, 
    item: {
        marginTop: 24,
        height: "100%",
    },
})

const mapStateToProps = state => ({
    token: state.auth.token,
    username: state.auth.user.username
})

export default connect(mapStateToProps)(ChatRoom)