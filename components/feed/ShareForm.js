import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import { shareAction } from '../../actions/posts'
import { Formik } from 'formik'
import SharePost from './SharePost'
import { random_style, baseURL } from '../shared/HelperFunction'
import Loading from '../shared/Loading'
import ErrorMessage from '../shared/ErrorMessage'
import HeaderView from '../shared/HeaderView'


function ShareForm({ route, shareAction, navigation, image, username }) {
    const [state, setState] = useState({
        loading: false,
        error: false
    })
    const { post, number } = route.params
    const callback = (type) => {
        if (type === "fetch") {
            navigation.goBack()
        } else if (type === "error") {
            setState({
                loading: false,
                error: true
            })
        }   
    }
    const { color } = random_style(number)
    const { loading, error } = state
    const styles = StyleSheet.create({
        usernameContainer: {
            height: 75,
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
    
        },
        usernameText: {
            paddingLeft: 8,
            display: "flex",
            color: "white",
            fontSize: 17,
            fontWeight: "bold"
        },
        userPic: {
            width: 50,
            height: 50,
            marginLeft: 15,
            borderRadius: 40,
            backgroundColor: "gray"
        },
        container: {
            backgroundColor: "#1b1a20"
        },
        shareText: {
            // fontWeight: "bold",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: "#67aec5",
            marginLeft: 112,
            fontSize: 17
        },
        inputStyle: {
            height: 30,
            backgroundColor: "#1b1a20",
            marginLeft: 20,
            marginRight: 20,
            // borderRadius: 5,
            marginBottom: 10,
            // borderWidth: 1,
            // borderColor: 'white',
            // Search how to style the placeholder in TextInput J.
            // paddingLeft: 5,
            color: "white",
            paddingBottom: 2
        },
    })
    if (loading) {
        return <Loading/>
    }
    if (error) {
        setTimeout(() => {
            setState({
                error: false
            })
        }, 5000)
    }
    return (
        <View style={styles.container}>
            <HeaderView title={"Share"} color={"white"} navigation={navigation}/>
                {error ? <ErrorMessage/> : null}     
                <Formik
                    initialValues={{ content: ""}}
                    onSubmit={(values, action) => {
                        action.resetForm()
                        shareAction(post.id, values.content, "share", callback)
                        setState({
                            loading: true,
                            error: false
                        })
                    }}
                >
                    {(props) => (
                            <View style={{ marginTop: 25 }}>
                                <View style={styles.usernameContainer}>
                                    {image ? 
                                    <Image style={styles.userPic} source={{ uri: `${baseURL}${image}` }}/> 
                                    : <View style={styles.userPic} ></View>}
                                    <Text style={styles.usernameText}>{username}</Text>
                                    <Text style={styles.shareText} onPress={props.handleSubmit}>Share</Text>
                                </View>
                                <TextInput 
                                    style={styles.inputStyle}
                                    placeholder='say something...'
                                    onChangeText={props.handleChange('content')}
                                    value={props.values.content}
                                    onBlur={props.handleBlur('content')}
                                />
                                <SharePost post={post} navigation={navigation} number={number}/>
                            </View>
                        )}
                </Formik>
        </View>
    )
}

const mapStateToProps = state => ({
    image: state.auth.user.image,
    username: state.auth.user.username
})

export default connect(mapStateToProps, { shareAction })(ShareForm)



