import { View, Text, StatusBar, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../constant/Colors'
import { globalStyles } from '../../constant/StylePage'
import { Normalize } from '../../constant/for_responsive/Dimens'
import { images } from '../../constant/Images'


export default function LoginOrSignUp() {
    const navigation = useNavigation()
    return (
        <View style={[globalStyles.mainContainer]} >
            <StatusBar backgroundColor={Colors.background_shade} barStyle="dark-content" />
            <View style={{ height: Normalize(25) }} />
            <View style={{ flex: 1.5, alignItems: "center", justifyContent: "center" }} >
                <View style={{ height: "85%", width: "80%", borderRadius: Normalize(20), overflow: "hidden", elevation: Normalize(1), backgroundColor: Colors.white, justifyContent: "center", alignItems: "center" }} >
                    <Image source={images.soldout} style={{ height: "90%", width: "90%", resizeMode: "cover" }} />
                </View>
            </View>
            <View style={{ flex: 1, alignItems: "center" }} >
                <Text style={globalStyles.pageHeaderText} >What do you want to do here?</Text>
                <Text style={{ fontFamily: "Outfit-Regular", fontSize: Normalize(14), color: Colors.greylightText, paddingTop: Normalize(5) }} >Select any one from here</Text>
                <View style={{ height: Normalize(38), width: "85%", alignSelf: "center", marginTop: Normalize(20), flexDirection: "row", justifyContent: "space-between" }}  >
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                        // onPress={() => navigation.navigate("tabBar")}
                        style={[pageStyles.box, { backgroundColor: Colors.purple }]} >
                        <Text style={{ color: Colors.white, fontSize: Normalize(12), fontFamily: "Outfit-Medium" }} >Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Signup")}
                        style={[pageStyles.box, { backgroundColor: Colors.lightpurple }]} >
                        <Text style={{ color: Colors.purple, fontSize: Normalize(12), fontFamily: "Outfit-Medium" }} >Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const pageStyles = StyleSheet.create({
    box: { height: "100%", width: "48%", backgroundColor: Colors.purple, justifyContent: "center", alignItems: "center", borderRadius: Normalize(12) },
})

