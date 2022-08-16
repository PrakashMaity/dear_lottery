import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Linking, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../../constant/StylePage'
import { Normalize } from '../../../constant/for_responsive/Dimens'
import { Colors } from '../../../constant/Colors'
import { few_constants } from '../../../constant/small_constant/Few_Constants'
import { addComma } from '../../../helper/AddComma'
import CustomBottom from '../../../helper/CustomBottom'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Zocial from 'react-native-vector-icons/Zocial';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { images } from '../../../constant/Images'
export default function Profile() {
    const navigation = useNavigation()
    const [userDetails, setUserDetails] = useState("")
    const [editModal, setEditModal] = useState(false)


    const onpressEditModal = () => {
        setEditModal(!editModal)
    }



    const getUserDetails = async () => {
        var data = {}
        const res = await AsyncStorage.getItem('userDetails')
        data = JSON.parse(res)
        setUserDetails(data)
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    const logoutFunc = async () => {
        // const fcmtoken = await AsyncStorage.getItem('fcmtoken')
        // console.log("fcmtoken----", fcmtoken)

        // const isLogin = await AsyncStorage.getItem('isLogin')
        // console.log("isLogin----", isLogin)

        // const userDetails = await AsyncStorage.getItem('userDetails')
        // console.log("userDetails----", userDetails)


        // const token = await AsyncStorage.getItem('token')
        // console.log("token----", token)




        // await AsyncStorage.removeItem('fcmtoken')
        await AsyncStorage.removeItem('isLogin')
        await AsyncStorage.removeItem('userDetails')
        await AsyncStorage.removeItem('token')


        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: "LoginOrSignUp" }]
            }));
    }


    const onpresssLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => logoutFunc() }
            ]
        );

    }
    return (
        <View style={[globalStyles.mainContainer_withoutpadding]} >
            {/* profile picture name total earn */}
            <View style={{ height: Normalize(150), backgroundColor: Colors.purple, width: "100%", justifyContent: "center", alignItems: "center" }}>

                <View style={{ height: Normalize(67), width: Normalize(67), borderRadius: Normalize(67) / 2, backgroundColor: Colors.lightpurple, justifyContent: "center", alignItems: "center" }} >
                    <MaterialCommunityIcons name={"account"} color={Colors.background_shade} size={Normalize(50)} />
                </View>
                <Text style={[globalStyles.planeText_outfit_bold, { paddingTop: Normalize(5) }]} >{userDetails.name}</Text>
                <Text style={[globalStyles.planeText_outfit_Medium, { fontSize: Normalize(13), paddingTop: Normalize(3) }]} >Total Earn :  <Text style={{ fontSize: Normalize(12), }} >{few_constants.rupee} {addComma(0)}</Text></Text>

                <TouchableOpacity
                    onPress={() => Linking.openURL('whatsapp://send?text=hello sir!&phone=+918918794438')}
                    style={{ height: Normalize(25), width: Normalize(25), borderRadius: Normalize(25) / 2, position: "absolute", top: Normalize(15), right: Normalize(15), justifyContent: "center", alignItems: "center" }} >
                    <Image source={images.whatsapp} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                </TouchableOpacity>
            </View>

            {/* details */}
            <View style={{ flex: 1, }} >
                <View style={{}} >

                    {/* name */}
                    <View style={styles.eachBox} >
                        <View style={styles.eachIconBox} >
                            <MaterialCommunityIcons name={"account"} color={Colors.purple} size={Normalize(25)} />
                        </View>
                        <View style={styles.eachTextBox} >
                            <Text numberOfLines={1} style={styles.eachText} >{userDetails.name}</Text>
                        </View>
                    </View>
                    {/* phone */}
                    <View style={[styles.eachBox]} >
                        <View style={[styles.eachIconBox, {}]} >
                            <FontAwesome name={"mobile-phone"} color={Colors.purple} size={Normalize(30)} />
                        </View>
                        <View style={[styles.eachTextBox, { flex: 4.7 }]} >
                            <Text style={styles.eachText} >+91 {userDetails.phoneNo}</Text>
                        </View>
                    </View>
                    {/* email */}
                    <View style={styles.eachBox} >
                        <View style={styles.eachIconBox} >
                            <Zocial name={"email"} color={Colors.purple} size={Normalize(22)} />
                        </View>
                        <View style={styles.eachTextBox} >
                            <Text numberOfLines={1} style={styles.eachText} >{userDetails.email != "" ? userDetails.email : "Empty"}</Text>
                        </View>
                    </View>

                    {/* bank details */}

                    <View style={styles.eachBox} >
                        <View style={styles.eachIconBox} >
                            <FontAwesome name={"credit-card-alt"} color={Colors.purple} size={Normalize(19)} />
                        </View>
                        <View style={[styles.eachTextBox, { flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }]} >
                            <Text numberOfLines={1} style={[styles.eachText, {}]} >Add Card or Upi</Text>
                            <Text style={{ backgroundColor: Colors.red, color: Colors.white, fontSize: Normalize(8), borderRadius: Normalize(4), paddingHorizontal: Normalize(4), paddingVertical: Normalize(2), fontFamily: "Outfit-SemiBold", marginLeft: Normalize(10) }} >Coming Soon</Text>
                        </View>
                    </View>



                    {/* Logout */}

                    <TouchableOpacity
                        onPress={onpresssLogout}
                        style={styles.eachBox} >
                        <View style={styles.eachIconBox} >
                            <MaterialCommunityIcons name={"logout"} color={Colors.purple} size={Normalize(25)} />
                        </View>
                        <View style={styles.eachTextBox} >
                            <Text numberOfLines={1} style={styles.eachText} >Logout</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <CustomBottom
                    onPress={onpressEditModal}
                    style={{ width: "70%", marginTop: Normalize(40) }}
                    name={"Edit Profile"}
                />
                {editModal &&
                    <Modal
                        transparent
                        visible={editModal}
                        animationType="slide"
                        onRequestClose={onpressEditModal}
                    >
                        <View style={{ flex: 1, backgroundColor: Colors.background_shade }} >
                            <Text numberOfLines={1} style={styles.eachText} >{userDetails.name}</Text>
                            <Text numberOfLines={1} style={styles.eachText} >{userDetails.phoneNo}</Text>
                            <Text numberOfLines={1} style={styles.eachText} >{userDetails.email}</Text>
                        </View>
                    </Modal>
                }


            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    eachBox: { height: Normalize(50), flexDirection: "row", borderBottomColor: Colors.lightpurple2, borderBottomWidth: Normalize(0.5) },
    eachTextBox: { flex: 4, justifyContent: "center", paddingHorizontal: Normalize(15) },
    eachIconBox: { flex: 1, justifyContent: "center", alignItems: "flex-end" },
    eachText: { fontSize: Normalize(14), fontFamily: "Outfit-SemiBold", color: Colors.purple }
})