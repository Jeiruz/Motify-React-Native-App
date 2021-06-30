import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ImageBackground } from 'react-native'
import HeaderView from '../shared/HeaderView'
import { editProfile } from '../../actions/profile'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { baseURL } from '../shared/HelperFunction'
import * as ImagePicker from 'expo-image-picker'
import { Feather } from '@expo/vector-icons'
import Loading from '../shared/Loading'
import ErrorMessage from '../shared/ErrorMessage'

function EditDashboard({ route, navigation, editProfile }) {
    const [state, setState] = useState({
        loading: false,
        error: false
    })
    const [progress, setProgress] = useState(1)
    const { profile, themes } = route.params
    const [image, setImage] = useState(null)
    const { color, background_color, third_color } = profile
    const [theme, setTheme] = useState({
        color,
        backgroundColor: background_color,
        third_color
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
    useEffect(() => {
        if (themes) {
            setTheme({
                color: themes.color,
                backgroundColor: themes.backgroundColor,
                third_color: themes.third_color
            })
        }
    }, [route])
    const PickImage = async (type) => {
        let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            })
            if (!result.cancelled) {
                if (type === "image") {
                    setImage(result.uri)
                } 
            }
        }
    const styles = StyleSheet.create({
        container: {
            height: "100%",
            backgroundColor: theme.backgroundColor
        },
        image: {
            height: 53, 
            width: 53, 
            borderRadius: 30,   
            backgroundColor: theme.third_color
        },
        background_image: {
            height: 270,
            width: 235,
            backgroundColor: theme.third_color,
        },
        view1: {
            display: "flex",
            flexDirection: "row",
            marginLeft: 12,
            marginTop: 40,
            height: 53,
        },
        username: {
            paddingLeft: 8,
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            color: theme.color,

        },
        container2: {
            marginTop: 20,
            height: 270,
        },
        container3: {
            height: 50,
            backgroundColor: theme.third_color,
            // justifyContent: "center",
            // alignItems: "center",
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
        },
        text: {
            color: theme.color,
            marginLeft: 10,
            marginTop: 10
        },
        saveContainer: {
            justifyContent: "center",
            alignItems: "center"
        },
        saveText: {
            color: theme.color,
            fontSize: 17,
        },
        save: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.third_color,
            marginLeft: 105,
            marginRight: 105,
            height: 50,
            marginBottom: 15
        },
        info: {
            color: theme.color,
            fontSize: 17,
            marginLeft: 10
        },
        changeView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
         },
         loading: {
            height: "100%",
            backgroundColor: theme.backgroundColor,
            alignItems: "center",
            justifyContent: "center",
         }
    })
    if (state.error) {
        setTimeout(() => {
            setState({
                error: false
            })
        }, 5000)
    }
    return (
        <View style={styles.container}>
           <HeaderView color={theme.color} title={"Edit"} navigation={navigation}/>
           {state.error ? <ErrorMessage/> : null}     
        {state.loading ? <Loading style={styles.loading} color={theme.color} progress={progress}/> : <ScrollView>
            <View style={styles.view1}>
                {profile.image ? 
                    <ImageBackground imageStyle={{
                        borderRadius: 30
                    }} style={styles.image} source={{ uri: `${baseURL}${profile.image}` }}>
                        <TouchableOpacity style={styles.changeView} onPress={() => navigation.navigate("ProfilePick", { profile })}>
                            <Feather color={theme.color} name="camera" size={20}/>
                        </TouchableOpacity>
                    </ImageBackground> 
                : <View  style={styles.image}></View>}
                <Text style={styles.username}>{profile.username}</Text>
            </View>
            <View style={styles.container2}>
                    {profile.cover_photo ? 
                    <ImageBackground style={styles.background_image} source={{ uri: image ? image : `${baseURL}${profile.cover_photo}` }}>
                        <TouchableOpacity style={styles.changeView} onPress={() => PickImage("image")}>
                            <Feather color={theme.color} name="camera" size={30}/>
                        </TouchableOpacity>
                    </ImageBackground> 
                    : <View style={styles.background_image}></View>}
            </View>
            <Formik
                initialValues={{ bio: profile.bio, location: profile.location}}
                onSubmit={(values, action) => {
                const { bio, location } = values
                if (image) {
                    const data = { 
                        bio, 
                        location, 
                        background_image: image, 
                        background_color: theme.backgroundColor,
                        color: theme.color,
                        third_color: theme.third_color 
                    }
                    editProfile(data, profile.id, callback)
                    setState({
                        loading: true,
                        error: false
                    })
                } else {
                    const data = { 
                        bio, 
                        location,
                        background_color: theme.backgroundColor,
                        color: theme.color,
                        third_color: theme.third_color  
                    }
                    editProfile(data, profile.id, callback)
                    setState({
                        loading: true,
                        error: false
                    })
                }   
                
                }}
            >
                {(props) => (
                        <View style={{ marginTop: 25 }}>
                            <Text style={styles.info}>Bio</Text>
                            <View style={styles.container3}>
                            <TextInput
                                numberOfLines={2}
                                multiline={true} 
                                style={styles.text} 
                                placeholder={profile.bio}
                                onChangeText={props.handleChange('bio')}
                                value={props.values.bio}
                                onBlur={props.handleBlur('bio')}
                            />
                            </View>
                            <Text style={styles.info}>Location</Text>
                            <View style={styles.container3}>
                            <TextInput
                                numberOfLines={2}
                                multiline={true} 
                                style={styles.text} 
                                placeholder={profile.location}
                                onChangeText={props.handleChange('location')}
                                value={props.values.location}
                                onBlur={props.handleBlur('location')}
                            />
                            </View>
                            <View style={styles.save}>
                               <Text onPress={() => navigation.navigate("ColorPick", { profile })} style={styles.saveText}>Change Theme</Text>
                            </View>
                            <TouchableOpacity style={styles.save} onPress={props.handleSubmit}>
                                <Text style={styles.saveText}>Save</Text>
                            </TouchableOpacity>
                            {/* <Text onPress={PickImage}>Pick</Text> */}
                        </View>
                    )}
            </Formik>
</ScrollView>}
        </View>
    )
}


export default connect(null, { editProfile })(EditDashboard)



{/* <Text style={styles.text}>{profile.bio}</Text>
</View>
<View style={styles.container3}>
<Text style={styles.text}>{profile.location}</Text>
</View>
<TouchableOpacity style={styles.container3} onPress={() => navigation.navigate("ColorPick", { profile } )}>
<Text style={styles.text}>Change color</Text>
</TouchableOpacity>
<View style={styles.saveContainer}>
<Text style={styles.saveText}>Save</Text>
</View> */}
