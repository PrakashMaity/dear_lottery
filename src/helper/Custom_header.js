import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Normalize } from '../constant/for_responsive/Dimens';
import { Colors } from '../constant/Colors';
import { few_constants } from '../constant/small_constant/Few_Constants';
import { globalStyles } from '../constant/StylePage';

export default function Custom_header({back}) {
    const navigation = useNavigation()
    return (
        <View style={headerStyle.mainView} >
            {back &&
                <TouchableOpacity
                    onPress={() => navigation.goBack()}>
                    <Ionicons name={"arrow-back"} color={Colors.lightpurple} size={Normalize(26)} />
                </TouchableOpacity>}
            <View style={{ flex: 1, alignItems: "center" }} >
                <Text numberOfLines={1} style={[globalStyles.planeText_outfit_Medium, { width: "70%" }]} >Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title </Text>
            </View>
        </View>
    )
}


const headerStyle = StyleSheet.create({
    mainView: { height: Normalize(50), width: "100%", backgroundColor: Colors.purple, flexDirection: "row", paddingHorizontal: few_constants.paddingHorizantal, alignItems: "center", justifyContent: "space-between" }
})