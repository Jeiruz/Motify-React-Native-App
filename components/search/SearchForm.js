import React from 'react'
import { View, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Formik }  from 'formik'

function SearchForm({ navigation, route }) {
    const { type } = route.params
    const styles = StyleSheet.create({
        container: {
            height: "100%",
            backgroundColor: "#1b1a20",
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
            paddingBottom: 2
        }
    })
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{ search: "" }}
                onSubmit={(values, action) => {
                    if (type === "search") {
                        navigation.navigate("SearchResults",  { search: values.search })
                    } else if (type === "chat") {
                        navigation.navigate("UserSearch", { search: values.search, type })
                    }
                    action.resetForm() 
                    Keyboard.dismiss()
                }}
            >
                {(props) => (
                        <View>
                            <TextInput 
                                style={styles.inputStyle}
                                autoFocus={true}
                                placeholder='search...'
                                onChangeText={props.handleChange('search')}
                                value={props.values.search}
                                onBlur={props.handleBlur('search')}
                                onSubmitEditing={props.handleSubmit}
                            />
                        </View>
                    )}
            </Formik>
            <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1}}></View>
            </TouchableWithoutFeedback>
        </View>
    )
}




export default SearchForm