        import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { createComments, replyComment } from '../../actions/comments' 
import { Formik }  from 'formik'

function CommentForm({ createComments, slug, reply, id, replyComment, color, callback }) {
    const styles = StyleSheet.create({
        formContainer: {
            height: 50,
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "center",
            // borderTopWidth: 0.3,
            // borderTopColor: color,
        },
        inputStyle: {
            // change the color here J.
            height: 30,
            // marginTop: 15,
            marginLeft: 13,
            marginRight: 13,
            borderRadius: 5,
            // marginBottom: 10,
            borderWidth: 1,
            borderColor: color,
            // Search how to style the placeholder in TextInput J.
            paddingLeft: 5,
            color,
            paddingBottom: 2,
            width: 320
        },
        send: {
            color: color,
            fontSize: 17,
            fontWeight: "bold",
            marginRight: 14,
            paddingBottom: 2,
        }
    })
    return (
        <View>
            <Formik
                initialValues={{ content: ""}}
                onSubmit={(values, action) => {
                    action.resetForm()
                    if (!reply) {
                        createComments(values.content, slug, callback)
                    } 
                    if (reply) {
                        replyComment(values.content, slug, id, callback)
                    }
                    Keyboard.dismiss()
                }}
            >
                {(props) => (
                        <View style={styles.formContainer}>
                            <TextInput
                                style={styles.inputStyle} 
                                placeholderTextColor={color}
                                placeholder='say something...'
                                onChangeText={props.handleChange('content')}
                                value={props.values.content}
                                onBlur={props.handleBlur('content')}
                            />
                            <TouchableOpacity onPress={props.handleSubmit}>
                                <Text style={styles.send}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    )}
            </Formik>
        </View>
    )
}




export default connect(null, { createComments,  replyComment })(CommentForm)