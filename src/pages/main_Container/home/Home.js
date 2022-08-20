import { View, Text, StatusBar, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import Lottie from 'lottie-react-native';
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../../constant/StylePage'
import { Normalize } from '../../../constant/for_responsive/Dimens'
import { Colors } from '../../../constant/Colors'
import { few_constants } from '../../../constant/small_constant/Few_Constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { images } from '../../../constant/Images'
import { addComma } from '../../../helper/AddComma'
import { useNavigation } from '@react-navigation/native'
import { axiosGet } from '../../../http/axios/CustomAxiosCall'
import { getseriesTime, todayDate, whichDay } from '../../../helper/TimeRelatedFunc'
import { data } from '../../../helper/DemoData'
import LoaderPage from '../../../helper/components/LoaderPage'
import Toast from 'react-native-simple-toast';
import { notificationListner } from '../../../helper/notification/PushNotification';
import { myContext } from '../../../helper/context/ContextPage';
import { rang } from '../../../helper/colorChange/SelectTheme';

export default function Home() {
  const { setUserDetails, themeColor, userAllDetails, setUserAllDetails } = useContext(myContext)

  const navigation = useNavigation()
  const [allSeries, SetAllSeries] = useState([])
  const [myOrderList, SetMyOrderList] = useState([])
  const [loader, SetLoader] = useState(false)
  const [refreshing, SetRefreshing] = useState(false)

  useEffect(() => {
    notificationListner(navigation);
  }, [])


  const Home_header = () => {
    return (<View style={{ height: Normalize(50), width: "100%", backgroundColor: Colors.purple, flexDirection: "row", paddingHorizontal: few_constants.paddingHorizantal, alignItems: "center", justifyContent: "space-between" }} >
      <StatusBar backgroundColor={Colors.purple} barStyle={"light-content"} />
      <Text numberOfLines={1} style={[globalStyles.planeText_outfit_Medium, { width: "70%", letterSpacing: 1 }]} >Lottery shop <Text style={{ fontSize: Normalize(11) }} >(24*7)</Text></Text>
      <View style={{ alignItems: "center" }} >
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} >
          <MaterialCommunityIcons name={"account-circle"} color={Colors.lightpurple} size={Normalize(26)} />
        </TouchableOpacity>
        {/* <Text numberOfLines={1} style={[globalStyles.planeText_outfit_Medium, { fontSize: Normalize(9) }]} >{few_constants.rupee} {addComma("0")}</Text> */}
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
      navigateTo: "Notice"
    },
    {
      title: "Result",
      image: images.result,
      navigateTo: "Result"
    },
  ]
  const Result_notice = () => {
    return (
      <View style={{ height: Normalize(80), marginHorizontal: few_constants.paddingHorizantal, flexDirection: "row", justifyContent: "space-between" }} >
        {
          two_botton_data.map((item, index) => (
            <View key={index} style={{ height: "100%", width: "48%", alignItems: "center", justifyContent: "space-between" }} >
              <TouchableOpacity
                onPress={() => { navigation.navigate(item.navigateTo) }}
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
  const Ticket_card = ({ item }) => {
    return (
      <View style={{ height: Normalize(80), width: "99%", alignSelf: "center", backgroundColor: Colors.lightpurple, marginTop: Normalize(10), elevation: Normalize(2), borderRadius: Normalize(8), padding: Normalize(5) }} >
        <View style={{ flex: 1, flexDirection: "row", }} >
          <View style={{ height: "100%", width: "35%", borderRadius: Normalize(10), backgroundColor: Colors.background_shade2, overflow: "hidden", elevation: 0.8 }} >
            <Image source={images.ticket} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
          </View>
          <View style={{ flex: 1, paddingHorizontal: Normalize(8) }} >
            <Text style={{ fontSize: Normalize(13), fontFamily: "Outfit-SemiBold", color: Colors.blue }} >{item.series} Ticktes</Text>
            {/* <Text style={{ fontSize: Normalize(11), fontFamily: "Outfit-Medium", color:Colors.blue, paddingTop: Normalize(2) }} >Price: <Text style={{color:Colors.red}} >$ 1200</Text></Text> */}
            <Text style={{ fontSize: Normalize(11), fontFamily: "Outfit-Medium", color: Colors.red, paddingTop: Normalize(2), letterSpacing: 0.5 }} >Closing Time : <Text style={{ fontFamily: "Outfit-SemiBold", fontSize: Normalize(11.5) }} >{getseriesTime(item.endTime)}</Text></Text>
            <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: Normalize(6) }} >
              <TouchableOpacity
                disabled={item.isLock}
                onPress={() => navigation.navigate("AllTickets_Page", { id: item._id, header: `${item.series} Ticktes` })}
                style={{ height: "75%", width: "80%", alignItems: "center", justifyContent: "center", alignSelf: "flex-end", backgroundColor: Colors.green, borderRadius: Normalize(20), elevation: Normalize(2), opacity: item.isLock ? 0.7 : 1 }} >
                <Text style={{ color: Colors.white, fontSize: Normalize(11), fontFamily: "Outfit-Medium", letterSpacing: 0.7 }} >See All Tickets</Text>
              </TouchableOpacity>
              {/* FFAA33 */}
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: Colors.purple, padding: Normalize(5), position: "absolute", top: Normalize(3), left: Normalize(3), borderRadius: Normalize(5), elevation: Normalize(1) }} >
          <Text style={{ color: Colors.white, fontFamily: "Outfit-Medium", fontSize: Normalize(8) }} >{few_constants.rupee} <Text style={{ letterSpacing: 0.5 }} >{addComma(item.price)}</Text></Text>
        </View>
        {item.isLock && <View style={{ backgroundColor: Colors.red, paddingVertical: Normalize(2), paddingHorizontal: Normalize(4), position: "absolute", top: Normalize(5), right: Normalize(5), borderRadius: Normalize(2), elevation: Normalize(1) }} >
          <Text style={{ color: Colors.white, fontFamily: "Outfit-Medium", fontSize: Normalize(7) }} >Opening soon</Text>
        </View>}
      </View>
    )
  }
  const Blank_Ticket_card = () => {
    return (
      <View style={{ height: Normalize(80), width: "99%", alignSelf: "center", backgroundColor: Colors.lightpurple, marginTop: Normalize(10), elevation: Normalize(2), borderRadius: Normalize(8), overflow: "hidden" }} >
        <View style={{ flex: 1, padding: Normalize(5), }} >
          <View style={{ flex: 1, flexDirection: "row" }} >
            <View style={{ height: "100%", width: "35%", borderRadius: Normalize(10), backgroundColor: Colors.lightpurple, overflow: "hidden", elevation: 0.8 }} >
              <Image source={images.ticket} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
            </View>
            <View style={{ flex: 1, paddingHorizontal: Normalize(8) }} >
              <View style={{ height: Normalize(13), width: "75%", backgroundColor: Colors.lightpurple2, borderRadius: Normalize(3), }} />
              <View style={{ height: Normalize(11), width: "65%", backgroundColor: Colors.lightpurple2, marginTop: Normalize(2), borderRadius: Normalize(3), }} />
              <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: Normalize(6) }} >
                <View style={{ height: "75%", width: "80%", alignItems: "center", justifyContent: "center", alignSelf: "flex-end", backgroundColor: Colors.green, borderRadius: Normalize(20), elevation: Normalize(2), }} >
                  <Text style={{ color: Colors.white, fontSize: Normalize(11), fontFamily: "Outfit-Medium", letterSpacing: 0.7 }} >See All Tickets</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: Colors.purple, padding: Normalize(5), position: "absolute", top: Normalize(3), left: Normalize(3), borderRadius: Normalize(5), elevation: Normalize(1) }} >
            <Text style={{ color: Colors.white, fontFamily: "Outfit-Medium", fontSize: Normalize(8) }} >{few_constants.rupee} <Text style={{ letterSpacing: 0.5 }} ></Text></Text>
          </View>
        </View>


        <View style={{ height: "100%", width: "100%", position: "absolute", backgroundColor: Colors.background_shade, opacity: 0.7, justifyContent: "center", alignItems: "center" }} >
          {/* <Text style={[globalStyles.planeText_outfit_bold, { color: Colors.purple, fontSize: Normalize(13) }]} > New Update Coming soon </Text> */}
        </View>
        <View style={{ height: "100%", width: "100%", position: "absolute", justifyContent: "center", alignItems: "center" }} >
          <Text style={[globalStyles.planeText_outfit_bold, { color: Colors.purple, fontSize: Normalize(13) }]} > New Update Coming soon </Text>
        </View>

        {/* <View style={{ backgroundColor: Colors.red, paddingVertical: Normalize(2), paddingHorizontal: Normalize(4), position: "absolute", top: Normalize(5), right: Normalize(5), borderRadius: Normalize(2), elevation: Normalize(1) }} >
          <Text style={{ color: Colors.white, fontFamily: "Outfit-Medium", fontSize: Normalize(7) }} >New Update Coming Soon</Text>
        </View> */}

      </View>
    )
  }
  const getSeriesData = async () => {
    SetLoader(true)
    const res = await axiosGet("ticket/series_get")
    if (res.response) {
      // console.log("getSeriesData---------", res)
    } else {
      SetAllSeries(res.data)
    }
    SetLoader(false)
  }
  const getCartData = async () => {
    SetLoader(true)
    const res = await axiosGet(`cart/get_data?userId=${userAllDetails.userId}`)
    if (res.response) {
    } else {
      SetMyOrderList(res.data.cartTicket)
    }
    SetLoader(false)
  }



  const getAsyncStorageDetails = async () => {
    const fcmtoken = await AsyncStorage.getItem('fcmtoken')
    const isLogin = await AsyncStorage.getItem('isLogin')
    const userDetails = await AsyncStorage.getItem('userDetails')
    const token = await AsyncStorage.getItem('token')

    const theme = await AsyncStorage.getItem('theme')

    var a = JSON.parse(userDetails)

    setUserAllDetails(a)

    setUserDetails(userDetails)
    // console.log("fcmtoken----", fcmtoken)
    // console.log("isLogin----", isLogin)
    // console.log("userDetails----", userDetails)
    // console.log("token----", token)
    // console.log("theme----", theme, "async--------", themeColor)
  }
  useEffect(() => {
    getAsyncStorageDetails()
    getSeriesData()
    getCartData()
  }, [])
  const refresh_home = async () => {
    const res = await axiosGet("ticket/series_get")
    if (res.response) {
      console.log("getSeriesData---------", res)
    } else {
      SetAllSeries(res.data)
    }
    SetLoader(false)
  }
  const refresh_home_cart = async () => {
    const res = await axiosGet(`cart/get_data?userId=${userAllDetails.userId}`)
    if (res.response) {
    } else {
      SetMyOrderList(res.data.cartTicket)
    }
  }
  const onRefresh = () => {
    SetRefreshing(true)
    Toast.show("Refreshing...")
    refresh_home()
    refresh_home_cart()
    SetRefreshing(false)
  }
  return (
    <View style={globalStyles.mainContainer_withoutpadding} >
      <Home_header />
      {
        loader ?
          <LoaderPage />
          :
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"

            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >

            {/* banner */}
            <Home_banner />
            {/* result and notice */}
            <Result_notice />
            {/* tickets */}


            {/* <TouchableOpacity
              style={{ height: 100, width: "100%", backgroundColor: rang().deep }} >
            </TouchableOpacity> */}

            <View style={{ padding: few_constants.paddingHorizantal }} >
              <Text style={[globalStyles.planeText_outfit_bold, { color: Colors.purple }]} >Recent Ticktes <Text style={{ fontSize: Normalize(10), fontFamily: "Outfit-Medium" }} >( {todayDate()} | {whichDay()} )</Text></Text>

              {
                allSeries.length != 0 ?
                  <View>
                    {
                      allSeries.map((item, index) => (
                        <View key={index} >
                          <Ticket_card item={item} />
                        </View>
                      ))
                    }
                  </View>
                  :

                  <View>
                    {
                      [1, 2].map((item, index) => (
                        <View key={index} >
                          <Blank_Ticket_card item={item} />
                        </View>
                      ))
                    }
                  </View>

              }
              {/* My order */}
              {myOrderList.length > 0 && <View>
                <Text style={[globalStyles.planeText_outfit_bold, { color: Colors.purple, paddingVertical: few_constants.paddingHorizantal }]} >My Order</Text>
                <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                  {
                    myOrderList.map((item, index) => (
                      <View key={index} style={{ height: Normalize(24), width: "48%", backgroundColor: Colors.lightpurple, borderRadius: Normalize(8), elevation: Normalize(1), marginBottom: Normalize(8), justifyContent: "center", alignItems: "center", paddingHorizontal: Normalize(6) }} >
                        <Text numberOfLines={1} style={{ fontSize: Normalize(11.5), color: Colors.purple, fontFamily: "Outfit-Medium" }} >{item.ticketNumber}</Text>
                      </View>
                    ))
                  }
                </View>
              </View>}
            </View>
          </ScrollView>
      }

    </View>
  )
}