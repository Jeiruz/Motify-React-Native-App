import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import Follower from './Follower'
import { manyAction } from '../../actions/profile'
import { connect } from 'react-redux' 
import { baseURL } from '../shared/HelperFunction'
import Post from './Post'

function FollowerLogic({ profile, styles, navigation, me }) {
    if (profile.follower_count !== 0) {
        return (
            <View style={styles.view3}>
                <Text style={styles.follower_count}>{profile.follower_count} Follower</Text>
                <Follower profile={profile} styles={styles} navigation={navigation}/>
            </View>
        )
    } else if (profile.follower_count === 0 && me.username === profile.username) {
        return null
    } else if (me.username !== profile.username && profile.follower_count === 0) {
        return (
            <View style={styles.nopost_view}>
                <Text style={styles.nopost}>Be the first</Text>
                <Text style={styles.nopost}>follower</Text>
            </View>
        )
    }
}



function Profile({ profile, navigation,  manyAction, me }) {
    const { color, background_color, third_color } = profile
    const [follow, setFollow] = useState({ is_following: profile.is_following })
    const [request, setRequest] = useState({ is_request: profile.is_request})
    const toggleRequest = (type) => {
        if (profile.is_request === true && type === "request") {
            manyAction(profile.username, "remove_request")
        } else if (profile.is_request === false && type === "request") {
            manyAction(profile.username, "send_request")
        } else if (profile.is_following === true && type === "follow") {
            manyAction(profile.username, "unfollow")
        } else if (profile.is_following === false && type === "follow") {
            manyAction(profile.username, "follow")
        } 
        if (type === "request") {
            setRequest({ is_request: !request.is_request })
        } 
        if (type === "follow") {
            setFollow({ is_following: !follow.is_following })
        } 
    }
    const styles = StyleSheet.create({
        container: {
            height: "100%",
            backgroundColor: background_color
        },
        image: {
            height: 53, 
            width: 53,
            borderRadius: 30,   
            backgroundColor: third_color,
        },
        background_image: {
            height: 270,
            width: 235,
            backgroundColor: third_color,
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
            color,

        },
        view2: {
            marginTop: 50,
            marginLeft: 15,
            flexDirection: "row",
            marginRight: 25
        },
        text: {
            color,
            marginRight: 30
        },
        view3: {
            marginTop: 50,
            marginLeft: 15,
        },
        follower_view: {
            marginRight: 10
        },
        follower: {
            height: 85,
            width: 68,
        },
        follower_count: {
            color,
            marginBottom: 5
        },
        view4: {
            marginTop: 50,
            marginLeft: 15
        },
        view5: {
            marginTop: 50,
            marginBottom: 50,
            width: 200,
            marginLeft: 165
        },
        bio: {
            fontSize: 20,
            color
        },
        view6: {
            marginLeft: 20
        },
        post_length: {
            fontSize: 26,
            marginBottom: 20,
            color
        },
        images_container: {
            alignItems: "flex-end",
            marginRight: 15,
        },
        images_text: {
            fontSize: 20,
            marginBottom: 20,
            color,
            marginRight: 9
        },
        images: {
            height: 150,
            width: 105,
            marginRight: 15,
            marginBottom: 15,
            backgroundColor: third_color,
        },
        more_view: {
            justifyContent: "center",
            alignItems: "center",
            flex: 1
        },
        nopost_view: {
            height: 200,
            marginLeft: 20,
            marginRight: 20,
            backgroundColor: third_color,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50
        },
        nopost: {
            fontSize: 24,
            color
        },
        container2: {
            marginTop: 20,
            height: 270,
        },
        post_container: {
            alignItems: "flex-end",
            marginRight: 15,
        },
        footer_view: {
            backgroundColor: background_color,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15
        },
        footer_text: {
            color,
            fontSize: 17
        }
     })
    const images = profile.images.slice(0, 6)
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.view1}>
                    {profile.image ? 
                    <TouchableOpacity onPress={() => navigation.navigate("ImageDetail", { image: profile.image, backgroundColor: background_color, third_color })}>
                        <Image style={styles.image} source={{ uri: `${baseURL}${profile.image}` }}/> 
                    </TouchableOpacity>
                    : <View  style={styles.image}></View>}
                    <Text style={styles.username}>{profile.username}</Text>
                </View>
                <View style={styles.container2}>
                        {profile.cover_photo ? 
                        <TouchableOpacity onPress={() => navigation.navigate("ImageDetail", { image: profile.cover_photo, backgroundColor: background_color, third_color })}>
                            <Image style={styles.background_image} source={{ uri: `${baseURL}${profile.cover_photo}` }}/> 
                        </TouchableOpacity>
                        : <View style={styles.background_image}></View>}
                </View>
                {me.username !== profile.username ? 
                    <View style={styles.view2}>
                    <TouchableOpacity onPress={() => toggleRequest("follow")}>
                        <Text style={styles.text}>{follow.is_following ? "Following" : "Follow"}</Text>
                    </TouchableOpacity>
                    {profile.is_friend ? null:<TouchableOpacity onPress={() => toggleRequest("request")}>
                        <Text style={styles.text}>{request.is_request ? "Cancel Request" : "Add Friend"}</Text>
                    </TouchableOpacity>}
                    <TouchableOpacity onPress={() => navigation.navigate("AddChat", 
                    {  user: { username: me.username, id: me.id }, other_user: { username: profile.username, id: profile.id } }
                    )}>
                        <Text style={styles.text}>Message</Text>
                    </TouchableOpacity>
                </View>
                :<View style={styles.view2}>
                    <TouchableOpacity onPress={() => navigation.navigate("FollowerList", { id: profile.id, friend: true, profile })}>
                        <Text style={styles.text}>Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("EditDashboard", { profile })}>
                        <Text style={styles.text}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Notification", { backgroundColor: background_color, color, third_color })}>
                        <Text style={styles.text}>Notification</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("SettingsDashboard", { profile })}>
                        <Text style={styles.text}>Settings</Text>
                    </TouchableOpacity>
                </View>}
                <FollowerLogic profile={profile} navigation={navigation} styles={styles} me={me}/>
                {profile.images.length === 0 ? null : <View style={styles.view4}>
                <View style={styles.images_container}>
                    <Text style={styles.images_text}>Images</Text>
                </View>
                <FlatList
                        data={images}
                        numColumns={3}
                        keyExtractor={(x, i) => `${i}`}
                        initialNumToRender = {10}
                        renderItem={({ item, index }) => (
                            <View>
                                {item.image ? 
                                <TouchableOpacity onPress={() => navigation.navigate(
                                    index === 5 ? "ImageList" : "ImageDetail", { image: index === 5 ? item : item.image, backgroundColor: background_color, images: profile.images, third_color, color }
                                    )}>
                                    <ImageBackground style={styles.images} source={{ uri: `${baseURL}${item.image}` }}>
                                        {index === 5 ? <View style={styles.more_view}>
                                            <Text style={{ color: "white", fontSize: 17}}>More</Text>
                                        </View>: null}
                                    </ImageBackground>
                                </TouchableOpacity>
                                : <View style={styles.images}></View>}
                            </View>
                        )}
                    />
                </View>}
                {profile.bio === "" ? null : <View style={styles.view5}>
                    <Text style={styles.bio}>{profile.bio}</Text>
                </View>}
                {profile.post.length === 0 ? 
                <View style={styles.nopost_view}>
                  <Text style={styles.nopost}>{me.username !== profile.username ? "No post yet" : "No post yet? add"}</Text>
                  {me.username !== profile.username ? null : <Text style={styles.nopost}>something</Text>}
                </View>
                :<View>
                    <View style={styles.post_container}>
                        <Text style={styles.post_length}>{profile.post.length} Post</Text>
                    </View>
                    <FlatList
                        data={profile.post}
                        keyExtractor={(x, i) => `${i}`}
                        initialNumToRender = {10}
                        ListFooterComponent={() => profile.post.length < 8 ? null :  <View style={styles.footer_view}>
                                <Text onPress={() => navigation.navigate("PostSearch", { profile: true, background_color, color })} style={styles.footer_text}>More</Text>
                        </View>}
                        renderItem={({ item, index }) => (
                            <Post data={item} index={index} color={color} navigation={navigation}/>
                        )}
                    />
                </View>}
                <View style={{ height: 20}}>
                </View>
            </ScrollView>
        </View>
    )
}

const mapStateToProps = state => ({
    me: state.auth.user
})

export default connect(mapStateToProps, { manyAction })(Profile)





















// import React, { useState } from 'react'
// import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
// import Post from './Post'
// import Follower from './Follower'
// import { manyAction } from '../../actions/profile'
// import { connect } from 'react-redux' 

// function FollowerLogic({ profile, other, styles, navigation }) {
//     if (profile.follower_count !== 0) {
//         return (
//             <View style={styles.view3}>
//                 <Text style={styles.follower_count}>{profile.follower_count} Follower</Text>
//                 <Follower profile={profile} styles={styles} navigation={navigation}/>
//             </View>
//         )
//     } else if (profile.follower_count === 0 && !other) {
//         return null
//     } else if (other && profile.follower_count === 0) {
//         return (
//             <View style={styles.nopost_view}>
//                 <Text style={styles.nopost}>Be the first</Text>
//                 <Text style={styles.nopost}>follower</Text>
//             </View>
//         )
//     }
// }



// function Profile({ profile, navigation, other, manyAction, me }) {
//     const { color, background_color, third_color } = profile
//     const [follow, setFollow] = useState({ is_following: profile.is_following })
//     const [request, setRequest] = useState({ is_request: profile.is_request})
//     const toggleRequest = (type) => {
//         if (user.is_request === true && type === "request") {
//             manyAction(profile.username, "remove_request")
//         } else if (user.is_request === false && type === "request") {
//             manyAction(profile.username, "send_request")
//         } else if (user.is_following === true && type === "follow") {
//             manyAction(profile.username, "unfollow")
//         } else if (user.is_following === false && type === "follow") {
//             manyAction(profile.username, "follow")
//         } 
//         if (type === "request") {
//             setRequest({ is_request: !request.is_request })
//         } 
//         if (type === "follow") {
//             setFollow({ is_following: !follow.is_following })
//         } 
//     }
//     const styles = StyleSheet.create({
//         container: {
//             height: "100%",
//             backgroundColor: background_color
//         },
//         image: {
//             height: 90,
//             width: 76,   
//         },
//         background_image: {
//             height: 345,
//             backgroundColor: third_color
//         },
//         view1: {
//             marginLeft: 20,
//             marginRight: 20,
//             marginTop: 20
//         },
//         background_view: {
//             marginTop: 234,
//             marginLeft: 15,
//             backgroundColor: background_color,
//             height: 96,
//             width: 82, 
//             justifyContent: "center",
//             alignItems: "center"
//         },
//         username: {
//             color,
//             marginTop: 13

//         },
//         view2: {
//             marginTop: 50,
//             marginLeft: 20,
//             flexDirection: "row",
//             marginRight: 25
//         },
//         text: {
//             color,
//             marginRight: 30
//         },
//         view3: {
//             marginTop: 50,
//             marginLeft: 20,
//         },
//         follower_view: {
//             marginRight: 10
//         },
//         follower: {
//             height: 85,
//             width: 68,
//         },
//         follower_count: {
//             color,
//             marginBottom: 5
//         },
//         view4: {
//             marginTop: 50,
//             marginLeft: 20
//         },
//         view5: {
//             marginTop: 50,
//             marginBottom: 50,
//             width: 200,
//             marginLeft: 160
//         },
//         bio: {
//             fontSize: 20,
//             color
//         },
//         view6: {
//             marginLeft: 20
//         },
//         post_length: {
//             fontSize: 20,
//             marginBottom: 20,
//             color,
//         },
//         images_container: {
//             alignItems: "flex-end",
//             marginRight: 15,
//         },
//         images_text: {
//             fontSize: 20,
//             marginBottom: 20,
//             color,
//             marginRight: 9
//         },
//         images: {
//             height: 150,
//             width: 105,
//             marginRight: 10,
//             marginBottom: 10
//         },
//         more_view: {
//             justifyContent: "center",
//             alignItems: "center",
//             flex: 1
//         },
//         nopost_view: {
//             height: 200,
//             marginLeft: 20,
//             marginRight: 20,
//             backgroundColor: third_color,
//             justifyContent: "center",
//             alignItems: "center",
//             marginTop: 50
//         },
//         nopost: {
//             fontSize: 24,
//             color
//         }
//     })
//     return (
//         <View style={styles.container}>
//             <ScrollView>
//                 <View style={styles.view1}>
//                     {profile.cover_photo ? 
//                     <TouchableOpacity onPress={() => navigation.navigate("ImageDetail", { image: profile.cover_photo, backgroundColor: background_color })}>
//                     <ImageBackground style={styles.background_image} source={{ uri: `http://127.0.0.1:8000${profile.cover_photo}` }}>
//                         <View style={styles.background_view}>
//                             {profile.image ? 
//                             <TouchableOpacity onPress={() => navigation.navigate("ImageDetail", { image: profile.image, backgroundColor: background_color })}>
//                             <Image style={styles.image} source={{ uri: `http://127.0.0.1:8000${profile.image}` }}/> 
//                             </TouchableOpacity>
//                             : <View></View>}
//                         </View> 
//                     </ImageBackground>
//                     </TouchableOpacity> :
//                     <View style={styles.background_image}>
//                         <View style={styles.background_view}>
//                             {profile.image ? 
//                             <TouchableOpacity onPress={() => navigation.navigate("ImageDetail", { image: profile.image, backgroundColor: background_color })}>
//                             <Image style={styles.image} source={{ uri: `http://127.0.0.1:8000${profile.image}` }}/> 
//                             </TouchableOpacity>
//                             : <View></View>}
//                         </View>     
//                     </View>}
//                     <Text style={styles.username}>{profile.username}</Text>
//                 </View>
//                 {other ? 
//                     <View style={styles.view2}>
//                     <TouchableOpacity onPress={() => toggleRequest("follow")}>
//                         <Text style={styles.text}>{profile.is_following ? "Following" : "Follow"}</Text>
//                     </TouchableOpacity>
//                     {profile.is_friend ? null:<TouchableOpacity onPress={() => toggleRequest("request")}>
//                         <Text style={styles.text}>{request.is_request ? "Cancel Request" : "Add Friend"}</Text>
//                     </TouchableOpacity>}
//                     <TouchableOpacity onPress={() => navigation.navigate("AddChat", 
//                     {  user: { username: me.username, id: me.id }, other_user: { username: profile.username, id: profile.id } }
//                     )}>
//                         <Text style={styles.text}>Message</Text>
//                     </TouchableOpacity>
//                 </View>
//                 :<View style={styles.view2}>
//                     <TouchableOpacity onPress={() => navigation.navigate("FollowerList", { id: profile.id, friend: true})}>
//                         <Text style={styles.text}>Friends</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity>
//                         <Text style={styles.text}>Edit</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => navigation.navigate("Notification", { backgroundColor: background_color, color, third_color })}>
//                         <Text style={styles.text}>Notification</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity>
//                         <Text style={styles.text}>Settings</Text>
//                     </TouchableOpacity>
//                 </View>}
//                 <FollowerLogic profile={profile} navigation={navigation} styles={styles} other={other}/>
//                 {profile.images.length === 0 ? null : <View style={styles.view4}>
//                 <View style={styles.images_container}>
//                     <Text style={styles.images_text}>Images</Text>
//                 </View>
//                 <FlatList
//                         data={profile.images}
//                         numColumns={3}
//                         keyExtractor={(x, i) => `${i}`}
//                         initialNumToRender = {10}
//                         renderItem={({ item, index }) => (
//                             <View>
//                                 {item.image ? 
//                                 <TouchableOpacity onPress={() => navigation.navigate("ImageDetail", { image: item.image, backgroundColor: background_color })}>
//                                     <ImageBackground style={styles.images} source={{ uri: `http://127.0.0.1:8000${item.image}` }}>
//                                         {index === 5 ? <View style={styles.more_view}>
//                                             <Text style={{ color: "white", fontSize: 17}}>More</Text>
//                                         </View>: null}
//                                     </ImageBackground>
//                                 </TouchableOpacity>
//                                 : <View style={styles.images}></View>}
//                             </View>
//                         )}
//                     />
//                 </View>}
//                 {profile.bio === "" ? null : <View style={styles.view5}>
//                     <Text style={styles.bio}>{profile.bio}</Text>
//                 </View>}
//                 {profile.post.length === 0 ? 
//                 <View style={styles.nopost_view}>
//                   <Text style={styles.nopost}>{other ? "No post yet" : "No post yet? add"}</Text>
//                   {other ? null : <Text style={styles.nopost}>something</Text>}
//                 </View>
//                 :<View style={styles.view6}>
//                     <Text style={styles.post_length}>{profile.post.length} Post</Text>
//                     <FlatList
//                         data={profile.post}
//                         numColumns={2}
//                         keyExtractor={(x, i) => `${i}`}
//                         initialNumToRender = {10}
//                         renderItem={({ item, index }) => (
//                             <View style={{ width: 160, marginRight: 15, height: 240, marginBottom: 15}}>
//                             <Post post={item} navigation={navigation}/>
//                             </View>
//                         )}
//                     />
//                 </View>}
//                 <View style={{ height: 50}}>
//                 </View>
//             </ScrollView>
//         </View>
//     )
// }

// const mapStateToProps = state => ({
//     me: state.auth.user
// })

// export default connect(mapStateToProps, { manyAction })(Profile)














// function SeeMore({ navigation }) {
//     return (
//         <View>
//             <TouchableOpacity onPress={() => navigation.navigate("PostSearch", { profile: true })}>
//                 <Text style={{ color: "white"}}>See More</Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

// export default function Profile({ profile, navigation }) {
//     const number = Math.floor(Math.random() * 10)
//     const { color, background_color } = profile
//     const styles = StyleSheet.create({
//         container: {
//             height: "100%",
//             backgroundColor: background_color
//         },
//         container1: {
//             display: "flex",
//             flexDirection: "row",
//             marginLeft: 12,
//             marginTop: 40,
//             height: 53,
//         },
//         image: {
//             height: 53, 
//             width: 53,
//             borderRadius: 30
//         },
//         username:{
//             paddingLeft: 8,
//             flexDirection: "column",
//             display: "flex",
//             justifyContent: "center",
//             color,
//         },
//         container2: {
//             marginTop: 20,
//             height: 270,
//         },
//         cover_photo: {
//             height: 270,
//             width: 235
//         },
//         container3: {
//             // height: 85,
//             marginTop: 50,
//             marginLeft: 15,
//         },
//         follower_view: {
//             marginRight: 10
//         },
//         follower: {
//             height: 85,
//             width: 68
//         },
//         container4: {
//             marginLeft: 15,
//             marginTop: 50,
//             marginBottom: 50,
//             width: 300
//         },
//         bio: {
//             fontSize: 24,
//             color
//         },
//         container5: {
//             marginLeft: 15,
//             marginTop: 50
//         },
//         post_length: {
//             fontSize: 26,
//             marginBottom: 20,
//             color
//         },
//         post_container: {
//             alignItems: "flex-end",
//             marginRight: 15,
//         },
//         text: {
//             color
//         }
    
    
//     })
//     return (
//         <View style={styles.container}>
//             <ScrollView>
//             <View style={styles.container1}>
//                 <TouchableOpacity onPress={() => navigation.navigate("ImageDetail", { image: profile.image, backgroundColor: background_color })}>
//                     {profile.image ? <Image style={styles.image} source={{ uri: `http://127.0.0.1:8000${profile.image}` }}/> 
//                     : <View></View>}
//                     </TouchableOpacity>
//                     <Text style={styles.username}>{profile.username}</Text>
                
//             </View>
//             <View style={styles.container2}>
//                 <TouchableOpacity onPress={() => navigation.navigate("ImageDetail", { image: profile.cover_photo, backgroundColor: background_color })}>
//                     {profile.cover_photo ? <Image style={styles.cover_photo}   /> 
//                     : <View></View>}
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.container5}>
//                 <TouchableOpacity onPress={() => navigation.navigate("RequestList")}>
//                     <Text style={styles.text}>Friend Request</Text>
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.container3}>
//             <Text style={{ color: profile.color}}>{profile.follower_count} Follower</Text>
//             <FlatList
//                 horizontal
//                 data={profile.follower}
//                 keyExtractor={(x, i) => `${i}`}
//                 initialNumToRender = {10}
//                 ListFooterComponent = {() => <Navigate component={"FollowerList"} navigation={navigation} id={profile.id}/>}
//                 renderItem={({ item }) => (
//                     <View style={styles.follower_view}> 
//                         <TouchableOpacity onPress={() => navigation.navigate("UsersProfile", { username: item.user })}>
//                         {item.image ? <Image style={styles.follower} source={{ uri: `http://127.0.0.1:8000${item.image}` }}/> 
//                         : <View></View>}
//                         </TouchableOpacity>
//                     </View>
//                 )}
//             />
//             </View>
//             <View style={styles.container4}>
//                 <Text style={styles.bio}>{profile.bio}</Text>
//             </View>
//             <View>
//                 <View style={styles.post_container}>
//                     <Text style={styles.post_length}>{profile.post.length} Posts</Text>
//                 </View>
//                 <FlatList
//                     data={profile.post}
//                     keyExtractor={(x, i) => `${i}`}
//                     ListFooterComponent={() => <SeeMore navigation={navigation}/>}
//                     initialNumToRender = {10}
//                     renderItem={({ item, index }) => (
//                     // Finish this J.
//                     <TouchableOpacity onPress={() => navigation.navigate("PostDetail", { post: item, number: 1  })}>
//                         <Post data={item} index={index} color={color}/>
//                     </TouchableOpacity>
//                     )}
//                 />
//             </View>
//             </ScrollView>
//         </View>

//     )
// }


