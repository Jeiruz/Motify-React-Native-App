import React from 'react'
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native'
import { Formik } from 'formik'

function ChatForm({ addMessage, user, chat_id }) {
    return (
        <View>
            <Formik
                initialValues={{ message: ""}}
                onSubmit={(values, action) => {
                    action.resetForm()
                    addMessage(user, values.message, chat_id)
                    Keyboard.dismiss()
                }}
            >
                {(props) => (
                        <View style={styles.formContainer}>
                            <TextInput 
                                style={styles.inputStyle} 
                                placeholder='say something...'
                                onChangeText={props.handleChange('message')}
                                value={props.values.message}
                                onBlur={props.handleBlur('message')}    
                            />
                            <TouchableOpacity onPress={() => props.handleSubmit()}>
                                <Text style={styles.send}>Click</Text>
                            </TouchableOpacity>
                        </View>
                    )}
            </Formik>
        </View> 
    )
}

const styles = StyleSheet.create({
    formContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    inputStyle: {
        height: 30,
        backgroundColor: "#1b1a20",
        marginTop: 15,
        marginLeft: 10,
        marginRight: 13,
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'white', 
        // Search how to style the placeholder in TextInput J.
        paddingLeft: 5,
        color: "white",
        paddingBottom: 2,
        width: "90%"
    },
    send: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
        marginRight: 14,
        paddingBottom: 2,
    }
})

export default ChatForm