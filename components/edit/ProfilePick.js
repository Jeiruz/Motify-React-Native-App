import React, { useState } from 'react'
import { View, ImageBackground, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { baseURL } from '../shared/HelperFunction'
import HeaderView from '../shared/HeaderView'
import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { connect } from 'react-redux'
import { editProfileImage } from '../../actions/profile'
import ErrorMessage from '../shared/ErrorMessage'
import Loading from '../shared/Loading'

function ProfilePick({ route, navigation, id, editProfileImage }) {
    const [state, setState] = useState({
        loading: false,
        error: false
    })
    const [progress, setProgress] = useState(1)
    const { loading, error } = state
    const { profile } = route.params
    const [image, setImage] = useState(null)
    const styles = StyleSheet.create({
        container: {
            backgroundColor: profile.background_color,
            flex: 1
        },
        image: {
            height: 500,
            marginLeft: 15,
            marginRight: 15,
            marginTop: 15,
            backgroundColor: profile.third_color
        },
        changeView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
         },
        loading: {
            height: "100%",
            backgroundColor: profile.background_color,
            alignItems: "center",
            justifyContent: "center",
         },
        updateView: {
            backgroundColor: profile.third_color,
            height: 30,
            width: 100,
            alignSelf: "center",
            alignItems: "center",
            marginTop: 25
         },
        update: {
            fontSize: 20,
            color: profile.color
        }
    })
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
    const PickImage = async (type) => {
        let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            })
            if (!result.cancelled) {
                setImage(result.uri)
            }
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
            <HeaderView navigation={navigation} color={profile.color} title="Edit"/>
            {state.error ? <ErrorMessage/> : null} 
            {loading ? <Loading style={styles.loading} color={profile.color} progress={progress}/> : <View>
            {profile.image ? <ImageBackground style={styles.image} source={{ uri: image ? image : `${baseURL}${profile.image}` }}>
            <TouchableOpacity style={styles.changeView} onPress={PickImage}>
                    <Feather color={profile.color} name="camera" size={50}/>
            </TouchableOpacity>
            </ImageBackground> : <View style={styles.image}></View>}
            <TouchableOpacity style={styles.updateView} onPress={() => {
                if (image) {
                    editProfileImage(image, id, callback)
                    setState({
                        loading: true,
                        error: false
                    })
                }
            }}>
                <Text style={styles.update}>Update</Text>
            </TouchableOpacity>
            </View> }
        </View>
    )
}

const mapStateToProps = (state) => ({
    id: state.auth.user.id
})

export default connect(mapStateToProps, { editProfileImage })(ProfilePick)