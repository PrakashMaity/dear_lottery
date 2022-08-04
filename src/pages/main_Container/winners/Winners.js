import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { globalStyles } from '../../../constant/StylePage'
import Custom_header from '../../../helper/Custom_header'
import { few_constants } from '../../../constant/small_constant/Few_Constants'
import { Normalize } from '../../../constant/for_responsive/Dimens'
import { Colors } from '../../../constant/Colors'
import { addComma } from '../../../helper/AddComma'

export default function Winners() {
    return (
        <View style={[globalStyles.mainContainer_withoutpadding]} >
            <Custom_header title={"Result"} />
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ flex: 1, paddingHorizontal: few_constants.paddingHorizantal, paddingVertical: Normalize(10) }} >
                    <View style={{ width: "99%", alignSelf: "center", backgroundColor: Colors.background_shade2, borderRadius: Normalize(8), elevation: Normalize(2), marginBottom: Normalize(10), paddingVertical: Normalize(8), paddingHorizontal: Normalize(13), borderWidth: Normalize(1), borderColor: Colors.purple2 }} >
                        <Text style={[styles.textTitle, { paddingTop: Normalize(5) }]} ><Text style={styles.arrowStyle} >➢</Text>   Winner Name  :  <Text style={styles.textDetails} ></Text>  Ankan Roy</Text>
                        <Text style={styles.textTitle} ><Text style={styles.arrowStyle} >➢   </Text>Winning Amount  :  {few_constants.rupee} {addComma(50000)}</Text>
                        <Text style={styles.textTitle} ><Text style={styles.arrowStyle} >➢   </Text>12 series Ticket  :  s354g3sfs354g3sf</Text>
                        <Text style={styles.textTitle} ><Text style={styles.arrowStyle} >➢   </Text>Ticket Price  :  {few_constants.rupee} {addComma(120)}</Text>
                        <Text style={{ color: Colors.purple2, textAlign: "right", fontSize: Normalize(10), fontFamily: "Outfit-Medium", letterSpacing: 0.2 }} >2nd july,22 | Wednesday</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    textTitle: { fontSize: Normalize(12), fontFamily: "Outfit-Medium", color: Colors.purple, paddingBottom: Normalize(5) },
    textDetails: { fontSize: Normalize(11), fontFamily: "Outfit-SemiBold", color: Colors.purple, paddingBottom: Normalize(5) },
    arrowStyle: { color: Colors.blueText2, fontSize: Normalize(12) }
})