import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { addChatParticipants } from '../../actions/chat'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import ErrorMessage from '../shared/ErrorMessage'

function AddChat({ route, addChatParticipants }) {
    const { user, other_user } = route.params
    const [text, setText] = useState("")
    const [error, setError] = useState(false)
    const send = (content, type) => {
        if (type === "success") {
            setText(content)
        } else if (type === "error") {
            setError(true)
        }
    }
    if (error) {
        setTimeout(() => {
            setError(false)
        }, 3000)
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 1}}>
                {error ? <ErrorMessage/> : null }
                {text === "" ? null : <View style={styles.contentContainer}>
                    <View style={styles.contentContainer2}>
                        <Text>{text}</Text>
                    </View>
                </View>}
            </View>
            <View>
            <Formik
                initialValues={{ content: ""}}
                onSubmit={(values, action) => {
                    const participants = [user.username, other_user.username]
                    const id = [user.id, other_user.id]
                    const sender = user.username
                    addChatParticipants(participants, id, values.content, sender, send)
                    action.resetForm() 
                }}
            >
                {(props) => (
                        <View style={styles.formContainer}>
                            <TextInput 
                                style={styles.inputStyle}
                                placeholder='write something'
                                onChangeText={props.handleChange('content')}
                                value={props.values.content}
                                onBlur={props.handleBlur('content')}
                            />
                            <TouchableOpacity onPress={() => props.handleSubmit()}>
                                <Text style={styles.send}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    )}
            </Formik>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1b1a20"
    },
    inputStyle: {
        height: 30,
        backgroundColor: "#1b1a20",
        marginTop: 15,
        marginLeft: 13,
        marginRight: 13,
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'white',
        paddingLeft: 5,
        color: "white",
        paddingBottom: 2,
        width: 320
    },
    formContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    text: {

    },
    contentContainer: {
        maxWidth: "100%",
        maxHeight: "100%",
        marginLeft: 80,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 10,
    },
    contentContainer2: {
        // backgroundColor: theme.commentBackground,
        padding: 10,
        borderTopRightRadius: 0,
        borderRadius: 15,
        shadowOffset: {
            width: 0.5, height: 2
        },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        backgroundColor: "#3d3d3d"
    },
    send: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
        marginRight: 14,
        paddingBottom: 2,
    }
})

export default connect(null, { addChatParticipants })(AddChat)