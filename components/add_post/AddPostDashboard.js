import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, Image, Platform, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import Loading from '../shared/Loading'
import ErrorMessage from '../shared/ErrorMessage'
import * as ImagePicker from 'expo-image-picker'
import { Feather } from '@expo/vector-icons'
import { uploadPhoto, addPost } from '../../actions/posts'
import { baseURL } from '../shared/HelperFunction'

function AddPostDashboard({ navigation, image, username, addPost }) {
    const [state, setState] = useState({
        loading: false,
        error: false
    })
    const [progress, setProgress] = useState(1)
    const [images, setImages] = useState(null)
    useEffect(() => {
        permission()
    }, [])
    const permission = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== "granted") {
                Alert.alert("You won't be able to pick an image.")
            }
        }
    }
    const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        if (!result.cancelled) {
            setImages(result.uri)
        }
    }
    const callback = (progress, type) => {
        setProgress(progress)
        if (progress === 100) {
            setState({
                loading: false,
                error: false
            })
        } else if (type === "error") {
            setState({
                loading: false,
                error: true
            })
        }   
    }
    const { loading, error } = state
    const styles = StyleSheet.create({
        usernameContainer: {
            height: 75,
            display: "flex",
            flexDirection: "row",
    
        },
        usernameText: {
            paddingLeft: 8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: "white",
            fontSize: 17
        },
        userPic: {
            width: 50,
            height: 50,
            marginTop: 12,
            marginLeft: 15,
            borderRadius: 40,
            backgroundColor: "#3d3d3d",
        },
        container: {
            backgroundColor: "#1b1a20",
            flex: 1
        },
        saveText: {
            color: "white",
            fontSize: 17,
        },
        inputStyle: {
            // height: 30,
            backgroundColor: "#1b1a20",
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 10,
            color: "white",
        },
        addImageContainer: {
            backgroundColor: "#3d3d3d",
            height: 400,
            marginRight: 20,
            marginLeft: 20,
            justifyContent: "center",
            alignItems: "center"
        },
        saveView: {
            marginTop: 15,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "white",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 125,
            marginRight: 125,
            height: 30,
            paddingBottom: 3
        },
        change: {
            fontSize: 24,
            color: "white",
            fontWeight: "bold"
        },
        changeView: {
           flex: 1,
           justifyContent: "center",
           alignItems: "center"
        }
    })
    if (error) {
        setTimeout(() => {
            setState({
                error: false
            })
        }, 5000)
    }
    return (
        <View style={styles.container}>
                {error ? <ErrorMessage/> : null}     
                {loading ? <Loading progress={progress}/> : <Formik
                    initialValues={{ content: "" }}
                    onSubmit={(values, action) => {
                        const { content } = values
                        if (images && content !== "") {
                            addPost({ image: images, content}, callback)
                        } else if (content === "" && images !== null) {
                            addPost({ images }, callback)
                        } else if (content !== "" && images === null){
                            addPost({ content }, callback)
                        } else {
                            return null
                        }
                        if (content === "" && images === null) {
                            return null
                        } else {
                            setState({
                                loading: true,
                                error: false
                            })
                            setImages(null)
                        }
                       
                        action.resetForm()
                    }}
                >
                    {(props) => (
                            <View style={{ marginTop: 50 }}>
                                <View style={styles.usernameContainer}>
                                    {image ? 
                                    <Image style={styles.userPic} source={{ uri: `${baseURL}${image}` }}/> 
                                    : <View style={styles.userPic} ></View>}
                                    <Text style={styles.usernameText}>{username}</Text>
                                </View>
                                <TextInput
                                    numberOfLines={2}
                                    multiline={true} 
                                    style={styles.inputStyle}
                                    placeholder='say something...'
                                    onChangeText={props.handleChange('content')}
                                    value={props.values.content}
                                    onBlur={props.handleBlur('content')}
                                />
                                {images ? <ImageBackground source={{ uri: images}} style={styles.addImageContainer}>
                                    <TouchableOpacity style={styles.changeView} onPress={PickImage}>
                                        <Feather color="gray" name="camera" size={50}/>
                                    </TouchableOpacity>
                                </ImageBackground> : 
                                <View style={styles.addImageContainer}>
                                    <TouchableOpacity onPress={PickImage}>
                                        <Feather color="gray" name="camera" size={50}/>
                                    </TouchableOpacity>
                                </View>
                                }
                                <View style={styles.saveView}>
                                    <Text style={styles.saveText} onPress={props.handleSubmit}>Save</Text>
                                </View>
                            </View>
                        )}
                </Formik>}
        </View>
    )
}

const mapStateToProps = state => ({
    image: state.auth.user.image,
    username: state.auth.user.username,
})

export default connect(mapStateToProps, { addPost })(AddPostDashboard)