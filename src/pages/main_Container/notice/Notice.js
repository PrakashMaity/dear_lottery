import { View, Text, Linking, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import RazorpayCheckout from 'react-native-razorpay';
import { Colors } from '../../../constant/Colors';
import Toast from 'react-native-simple-toast';
import Custom_header from '../../../helper/Custom_header';
import { few_constants } from '../../../constant/small_constant/Few_Constants';
import { Normalize } from '../../../constant/for_responsive/Dimens';
import { globalStyles } from '../../../constant/StylePage';
import { modifiedAxiosGet } from '../../../http/axios/CustomAxiosCall';
import { getDate, getTime } from '../../../helper/TimeRelatedFunc';
import LoaderPage from '../../../helper/components/LoaderPage';
export default function Notice() {

  const [allNotice, setAllNotice] = useState([])
  const [loader, setLoader] = useState(false)

  const getNoticeResult = async () => {
    try {
      setLoader(true)
      const res = await modifiedAxiosGet("notice/notice_get_all");
      // console.log(res)
      if (res.status === 200) {
        // console.log("res : ", res.data.data);
        setLoader(false)
        setAllNotice(res.data.data)
      } else {
        setLoader(false)
        console.log("Failed : ", "Something went Wrong");
      }
    } catch (error) {
      setLoader(false)
      console.log("getNoticeResult---", error)
    }
  }

  useEffect(() => {
    getNoticeResult()
  }, [])


  return (
    <View style={globalStyles.mainContainer_withoutpadding}>
      <Custom_header title={"Notice"} />
      {
        loader ?
          <LoaderPage /> :
          <ScrollView showsVerticalScrollIndicator={false} >
            <View style={{ paddingHorizontal: few_constants.paddingHorizantal, paddingVertical: Normalize(8) }} >

              {
                allNotice.map((item, index) => (
                  <View key={index} style={{ padding: Normalize(8), width: "99%", alignSelf: "center", backgroundColor: Colors.lightpurple, marginBottom: Normalize(8), borderRadius: Normalize(8), elevation: Normalize(3), }} >
                    <Text numberOfLines={2} style={[globalStyles.planeText_outfit_bold, { fontSize: Normalize(12), color: Colors.purple, letterSpacing: 0.5 }]} >{item.headline}</Text>
                    <Text style={[globalStyles.planeText_outfit_regular, { color: Colors.blueText2, fontSize: Normalize(11.5), paddingVertical: Normalize(5) }]} >
                      {item.content}
                    </Text>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}} >
                      <Text style={[globalStyles.planeText_outfit_regular, { fontSize: Normalize(11.5), color: Colors.blue }]} >{getDate(item.createdAt)}</Text>
                      <Text style={[globalStyles.planeText_outfit_regular, { fontSize: Normalize(11.5), color: Colors.blue }]} >{getTime(item.createdAt)}</Text>
                    </View>
                  </View>
                ))
              }
            </View>
          </ScrollView>}
    </View>
  )
}