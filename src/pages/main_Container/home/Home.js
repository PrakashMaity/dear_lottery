import { View, Text, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { globalStyles } from '../../../constant/StylePage'
import { Normalize } from '../../../constant/for_responsive/Dimens'
import { Colors } from '../../../constant/Colors'
import { few_constants } from '../../../constant/small_constant/Few_Constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { images } from '../../../constant/Images'
import { addComma } from '../../../helper/AddComma'
import { useNavigation } from '@react-navigation/native'
export default function Home() {

  const navigation=useNavigation()

  const Home_header = () => {
    return (<View style={{ height: Normalize(50), width: "100%", backgroundColor: Colors.purple, flexDirection: "row", paddingHorizontal: few_constants.paddingHorizantal, alignItems: "center", justifyContent: "space-between" }} >
      <StatusBar backgroundColor={Colors.purple} barStyle={"light-content"} />
      <Text numberOfLines={1} style={[globalStyles.planeText_outfit_Medium, { width: "70%" }]} >Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title </Text>
      <View style={{ alignItems: "center" }} >
        <MaterialCommunityIcons name={"account-circle"} color={Colors.lightpurple} size={Normalize(26)} />
        <Text numberOfLines={1} style={[globalStyles.planeText_outfit_Medium, { fontSize: Normalize(9) }]} >{few_constants.rupee} {addComma("10000000")}</Text>
      </View>
    </View>)
  }
  const Home_banner = () => {
    return (
      <View style={{ height: Normalize(100), marginHorizontal: few_constants.paddingHorizantal, marginVertical: Normalize(10), borderRadius: Normalize(8), backgroundColor: Colors.lightpurple, overflow: "hidden", elevation: Normalize(2) }} >
        <Image source={images.home_banner} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
      </View>
    )
  }

  const two_botton_data = [
    {
      title: "Notice",
      image: images.notice,
      func: ""
    },
    {
      title: "Result",
      image: images.result,
      func: ""
    },
  ]

  const Result_notice = () => {
    return (
      <View style={{ height: Normalize(80), marginHorizontal: few_constants.paddingHorizantal, flexDirection: "row", justifyContent: "space-between" }} >
        {
          two_botton_data.map((item, index) => (
            <View key={index} style={{ height: "100%", width: "48%", alignItems: "center", justifyContent: "space-between" }} >
              <TouchableOpacity
                onPress={() => { }}
                style={{ height: "80%", width: "100%", backgroundColor: Colors.lightpurple, borderRadius: Normalize(8), overflow: "hidden", elevation: Normalize(2), borderWidth: 0, borderColor: Colors.purple }} >
                <Image source={item.image} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
              </TouchableOpacity>
              <Text style={{ fontSize: Normalize(12), fontFamily: "Outfit-SemiBold", color: Colors.blue }} >{item.title}</Text>
              <View style={{ height: Normalize(10), width: Normalize(10), borderRadius: Normalize(10) / 2, backgroundColor: Colors.red, position: "absolute", top: -Normalize(3), left: -Normalize(3), borderRightColor: Colors.white, borderBottomColor: Colors.white, borderBottomWidth: 1.4, borderRightWidth: 1.4 }} ></View>
            </View>
          ))
        }
      </View>
    )

  }

  const Ticket_card = () => {
    return (

      <View style={{ height: Normalize(80), width: "99%", alignSelf: "center", backgroundColor: Colors.lightpurple, marginTop: Normalize(10), elevation: Normalize(2), borderRadius: Normalize(8), padding: Normalize(5) }} >
        <View style={{ flex: 1, flexDirection: "row", }} >
          <View style={{ height: "100%", width: "35%", borderRadius: Normalize(10), backgroundColor: "#e6dff4", overflow: "hidden", elevation: 0.8 }} >
            <Image source={images.ticket} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
          </View>
          <View style={{ flex: 1, paddingHorizontal: Normalize(8) }} >
            <Text style={{ fontSize: Normalize(13), fontFamily: "Outfit-SemiBold", color: Colors.blue }} >5 Series Ticktes</Text>
            <Text style={{ fontSize: Normalize(11), fontFamily: "Outfit-Medium", color: "#bf0c09", paddingTop: Normalize(2) }} >Open upto 10pm</Text>
            <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: Normalize(6) }} >
              <TouchableOpacity
              onPress={()=>navigation.navigate("AllTickets_Page")}
              style={{ height: "70%", width: "80%", alignItems: "center", justifyContent: "center", alignSelf: "flex-end", backgroundColor: Colors.green_new, borderRadius: Normalize(20), elevation: Normalize(2) }} >
                <Text style={{ color: Colors.white, fontSize: Normalize(11), fontFamily: "Outfit-Medium", letterSpacing: 0.7 }} >See All Tickets</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

    )
  }

  return (
    <View style={globalStyles.mainContainer_withoutpadding} >
      <Home_header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >

        {/* banner */}
        <Home_banner />
        {/* result and notice */}
        <Result_notice />
        {/* tickets */}
        <View style={{ padding: few_constants.paddingHorizantal }} >
          <Text style={[globalStyles.planeText_outfit_bold, { color: Colors.blue }]} >Today's Ticktes <Text style={{fontSize: Normalize(10), fontFamily: "Outfit-Medium"}} >( 30th july,22 | Saturday )</Text></Text>
          <Ticket_card />
          <Ticket_card />
          <Ticket_card />
          <Ticket_card />
          <Ticket_card />
          <Ticket_card />
        </View>
      </ScrollView>


    </View>
  )
}