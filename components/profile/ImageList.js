import React, { useState } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native'
import FooterLoading from '../shared/FooterLoading'
import { baseURL } from '../shared/HelperFunction'

export default function ImageList({ route, navigation }) {
    const { images, backgroundColor, third_color, color } = route.params
    const [image, setImage] = useState({
        images: images.slice(0, 10)
    })
    const slicedData = () => {
        setImage({
            images: images.slice(0, image.images.length + 10)
        })
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            height: "100%",
            position: "absolute",
            width: "100%",
            backgroundColor,
        },
        item: {
            marginTop: 15,
            height: "100%",
        },
        image: {
            width: 165,
            height: 225,
            backgroundColor: third_color
        },
        container1: {
            marginLeft: 15
        },
        textStyle2: {
            marginTop: 3,
            fontSize: 11.3,
            color: "white"
        },
    })



    return(
        <View style={styles.container}>
        <FlatList
                numColumns={2}
                data={image.images}
                keyExtractor={(x, i) => `${i}`}
                initialNumToRender = {10}
                onEndReached={() => images.length === image.images.length ? null : slicedData()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => <FooterLoading color={color} text={images.length === image.images.length  ? "no more image" : null }/>}
                renderItem={({ item }) => {
                    const number = Math.floor(Math.random() * 45)
                    return (
                        <View style={styles.item}>
                        <TouchableOpacity onPress={() => navigation.navigate("PostDetail", { post: item, number, new_user: false })}>
                            <View style={styles.container1}>
                            {item.image ? <Image style={styles.image} source={{ uri: `${baseURL}${item.image}` }}/> 
                            : <View style={styles.item}></View>}
                            </View>
                        </TouchableOpacity>
                    </View>
                    )
                }}
            />
        </View>
    )

}

