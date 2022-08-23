import { View, Text, ScrollView, Modal, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { globalStyles } from '../../../constant/StylePage'
import Custom_header from '../../../helper/Custom_header'
import { few_constants } from '../../../constant/small_constant/Few_Constants'
import { Normalize } from '../../../constant/for_responsive/Dimens'
import { Colors } from '../../../constant/Colors'
import { BlueShades, PurpleShades } from '../../../helper/colorChange/ColorsObject'
import { setAsync } from '../../../helper/asyncstorage/AsyncStoragePage'
import { myContext } from '../../../helper/context/ContextPage'

export default function More() {
  const { themeColor, setThemeColor } = useContext(myContext)
  const [selectColorModal, setSelectColorModal] = useState(false)

  const onpressselectColor = () => {
    setSelectColorModal(!selectColorModal)
  }
  const morePageData = [
    {
      title: "Setting",
      isComingSoon: true,
      navigateTo: () => { }
    },
    {
      title: "About us",
      isComingSoon: false,
      navigateTo: () => { }
    },
    {
      title: "Share The app",
      isComingSoon: true,
      navigateTo: () => { }
    },
    // {
    //   title: "Which Color",
    //   isComingSoon: false,
    //   navigateTo: onpressselectColor
    // },
  ]
  return (
    <View style={[globalStyles.mainContainer_withoutpadding]} >
      <Custom_header title={"More"} />
      <View style={{ flex: 1, }} >
        <View style={{ flex: 1, }} >
          {
            morePageData.map((item, index) => (
              <TouchableOpacity
                onPress={item.navigateTo}
                key={index} style={{ height: Normalize(50), width: "100%", paddingHorizontal: few_constants.paddingHorizantal, borderBottomColor: Colors.lightpurple2, borderBottomWidth: Normalize(0.5), flexDirection: "row", }} >
                <View style={{ flex: 1, justifyContent: "center" }} >
                  <Text numberOfLines={1} style={[globalStyles.planeText_outfit_bold, { fontSize: Normalize(14), color: Colors.purple, letterSpacing: 0.5 }]} >{item.title}</Text>
                </View>
                {
                  item.isComingSoon &&
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                    <Text style={[globalStyles.comingSoon, { marginLeft: Normalize(0) }]} >Coming Soon</Text>
                  </View>}
              </TouchableOpacity>
            ))
          }

          {
            selectColorModal &&
            <Modal
              transparent
              visible={selectColorModal}
              animationType="slide"
              onRequestClose={onpressselectColor}
            >
              <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "space-around", alignItems: "center", flexDirection: "row" }} >
                <TouchableOpacity
                onPress={() => {
                  setThemeColor(BlueShades.Title)
                  setAsync("theme", BlueShades.Title)
                  onpressselectColor()
                }}
                style={{ height: Normalize(100), width: Normalize(100), backgroundColor: BlueShades.deep, justifyContent: "center", alignItems: "center" }} >
                  <Text
                     style={{ color: Colors.white }} >{BlueShades.Title}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setThemeColor(PurpleShades.Title)
                    setAsync("theme", PurpleShades.Title)
                    onpressselectColor()
                  }}
                  style={{ height: Normalize(100), width: Normalize(100), backgroundColor: PurpleShades.deep, justifyContent: "center", alignItems: "center" }} >
                  <Text style={{ color: Colors.white }} >{PurpleShades.Title}</Text>
                </TouchableOpacity>
              </View>

            </Modal>

          }

        </View>
      </View>
    </View>
  )
}
