import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { globalStyles } from '../../../constant/StylePage'
import Custom_header from '../../../helper/Custom_header'
import { few_constants } from '../../../constant/small_constant/Few_Constants'
import { Normalize } from '../../../constant/for_responsive/Dimens'
import { Colors } from '../../../constant/Colors'

export default function More() {

  const morePageData = [
    {
      title: "Setting",
      isComingSoon: false,
      navigateTo: ""
    },
    {
      title: "Contact us",
      isComingSoon: true,
      navigateTo: ""
    },
    {
      title: "About us",
      isComingSoon: false,
      navigateTo: ""
    },
    {
      title: "Share The app",
      isComingSoon: true,
      navigateTo: ""
    }

  ]


  return (
    <View style={[globalStyles.mainContainer_withoutpadding]} >
      <Custom_header title={"More"} />
      <View style={{ flex: 1, }} >
        <View style={{ flex: 1, }} >
          {
            morePageData.map((item, index) => (
              <View key={index} style={{ height: Normalize(50), width: "100%", paddingHorizontal: few_constants.paddingHorizantal, borderBottomColor: Colors.lightpurple2, borderBottomWidth: Normalize(0.5), flexDirection: "row", }} >
                <View style={{ flex: 1, justifyContent: "center" }} >
                  <Text numberOfLines={1} style={[globalStyles.planeText_outfit_bold, { fontSize: Normalize(14), color: Colors.purple, letterSpacing: 0.5 }]} >{item.title}</Text>
                </View>
                {
                  item.isComingSoon&&
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                  <Text style={[globalStyles.comingSoon, { marginLeft: Normalize(0) }]} >Coming Soon</Text>
                </View>}
              </View>
            ))
          }
        </View>
      </View>
    </View>
  )
}
