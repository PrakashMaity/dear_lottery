import { View, Text, TextInput, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { globalStyles } from '../../constant/StylePage'
import { Normalize } from '../../constant/for_responsive/Dimens'
import { Colors } from '../../constant/Colors'
import CustomBottom from '../../helper/CustomBottom'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native'
import { apis } from '../../constant/apis/Constants_Apis'
export default function Login() {
    const navigation = useNavigation()

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [confirm_password, setConfirm_password] = useState("")
    const [password_eye, setPassword_eye] = useState(false)
    const [loader, setLoader] = useState(false)
    const onpressLogin = () => {
        try {
            if (user.length == "") {
                Toast.show("Enter your email or phone number")
            } else {
                if (password.length == "") {
                    Toast.show("Enter your password")
                } else {
                    loginFunc()
                }
            }
        } catch (error) {
            console.log("onpressLogin-----", error)
        }
    }
    const phoneNumber_check = (val) => {

        const pattern = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (val == "" || val.trim("") == "") {
            return [false, "Enter Your phone Number"]
        } else if (val.length != 10 || pattern.test(val)) {
            return [false, "Enter Your valid phone Number"]
        } else {
            return [true, "ok"]
        }
    }

    const loginFunc = async () => {
        try {
            setLoader(true)
            const data = {
                "user": user,
                "password": password,
                "role": "user"
            }
            const res = await axios.post(`${apis.baseurl}login`, data)

            console.log(res.data)

            if (res.data.massage == "Successfully login") {
                Toast.show(res.data.massage)
                setUser("")
                setPassword("")
                setPassword_eye(false)
                Keyboard.dismiss()
            }
            setLoader(false)
        } catch (error) {
            setLoader(false)
            if (error.response.status == 404 || error.response.status == 400) {
                Toast.show(error.response.data.massage)
            }
            console.log("loginFunc-----", error.response)
        }
    }



    return (
        <View style={[globalStyles.mainContainer, { paddingHorizontal: Normalize(25) }]} >
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{ paddingTop: "33%" }}
            >
                <View style={{ paddingVertical: Normalize(28) }} >
                    <Text style={[globalStyles.pageHeaderText, { textAlign: "center" }]} >Get Started!</Text>
                    <Text style={[globalStyles.pageSubHeaderText, { textAlign: "center" }]} >to try your luck.</Text>
                </View>
                <View style={{}} >

                    {/* email */}

                    <Text style={globalStyles.textinputHeader} >Enter Email or Phone</Text>
                    <TextInput
                        value={user}
                        autoCapitalize='none'
                        placeholder='Email / Phone '
                        keyboardType="default"
                        placeholderTextColor={Colors.lightpurple}
                        style={globalStyles.textinputStyle}
                        onChangeText={(e) => { setUser(e) }}
                    />
                    {/* password */}

                    <Text style={globalStyles.textinputHeader} >Enter Password</Text>
                    <View style={globalStyles.textinputStyle_onlybox} >
                        <View style={{ flex: 1 }} >
                            <TextInput
                                value={password}
                                autoCapitalize='none'
                                secureTextEntry={password_eye ? false : true}
                                placeholder='Password'
                                placeholderTextColor={Colors.lightpurple}
                                style={globalStyles.textinputStyle_onlytext}
                                onChangeText={(e) => { setPassword(e) }}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => setPassword_eye(!password_eye)}
                            style={{ height: "100%", width: "10%", justifyContent: "center", alignItems: "center" }} >
                            <Ionicons name={password_eye ? "eye-off" : "eye"} color={Colors.lightpurple} size={Normalize(20)} />
                        </TouchableOpacity>
                    </View>
                    <CustomBottom
                        loader={loader}
                        name={"Login"}
                        onPress={onpressLogin}
                    />
                    <Text style={[globalStyles.pageSubHeaderText, { textAlign: "center", fontSize: Normalize(11), paddingBottom: Normalize(20) }]} >Don't have an account? <Text  onPress={() => navigation.navigate("Signup")}  style={{ color: Colors.purple, fontFamily: "Outfit-SemiBold", fontSize: Normalize(12) }} > Register here</Text></Text>
                </View>
            </ScrollView>
        </View>
    )
}