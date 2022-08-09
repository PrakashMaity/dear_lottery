import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
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
export default function Profile() {
    const navigation = useNavigation()

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
                    <View style={{ height: Normalize(67), width: Normalize(67), borderRadius: Normalize(67) / 2, backgroundColor: Colors.lightpurple2, justifyContent: "center", alignItems: "center" }} >
                        <MaterialCommunityIcons name={"account"} color={Colors.background_shade} size={Normalize(50)} />
                    </View>
                    <Text style={[globalStyles.planeText_outfit_bold, { paddingTop: Normalize(5) }]} >Ankan Roy</Text>
                    <Text style={[globalStyles.planeText_outfit_Medium, { fontSize: Normalize(13), paddingTop: Normalize(3) }]} >Total Earn :  <Text style={{ fontSize: Normalize(12), }} >{few_constants.rupee} {addComma(0)}</Text></Text>
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
                                <Text numberOfLines={1} style={styles.eachText} >Ankan Roy</Text>
                            </View>
                        </View>
                        {/* phone */}
                        <View style={[styles.eachBox]} >
                            <View style={[styles.eachIconBox, {}]} >
                                <FontAwesome name={"mobile-phone"} color={Colors.purple} size={Normalize(30)} />
                            </View>
                            <View style={[styles.eachTextBox, { flex: 4.7 }]} >
                                <Text style={styles.eachText} >+91 9874563210</Text>
                            </View>
                        </View>
                        {/* email */}
                        <View style={styles.eachBox} >
                            <View style={styles.eachIconBox} >
                                <Zocial name={"email"} color={Colors.purple} size={Normalize(22)} />
                            </View>
                            <View style={styles.eachTextBox} >
                                <Text numberOfLines={1} style={styles.eachText} >ankanRoy@gmail.com</Text>
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
                        style={{ width: "70%", marginTop: Normalize(40) }}
                        name={"Edit Profile"}
                    />
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