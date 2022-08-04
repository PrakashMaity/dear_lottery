import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Normalize } from '../constant/for_responsive/Dimens';
import { Colors } from '../constant/Colors';
import { few_constants } from '../constant/small_constant/Few_Constants';
import { globalStyles } from '../constant/StylePage';

export default function Custom_header({ back, title }) {
    const navigation = useNavigation()
    return (
        <View style={headerStyle.mainView} >
            <TouchableOpacity
                disabled={back ? false : true}
                onPress={() => navigation.goBack()} style={{ flex: 1, justifyContent: "center" }} >
                {back && <Ionicons name={"arrow-back"} color={Colors.lightpurple} size={Normalize(26)} />}
            </TouchableOpacity>
            <View style={{ flex: 9, alignItems: "center", justifyContent: "center" }} >
                {title && <Text numberOfLines={1} style={{ fontSize: Normalize(14), fontFamily: "Outfit-Medium", color: Colors.white }} >{title}</Text>}
            </View>

            <View style={{ flex: 1 }} />

        </View >
    )
}


const headerStyle = StyleSheet.create({
    mainView: { height: Normalize(50), width: "100%", backgroundColor: Colors.purple, flexDirection: "row", paddingHorizontal: few_constants.paddingHorizantal, }
})