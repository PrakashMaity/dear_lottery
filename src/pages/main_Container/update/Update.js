import { View, Text, Linking, ScrollView } from 'react-native'
import React from 'react'
import RazorpayCheckout from 'react-native-razorpay';
import { Colors } from '../../../constant/Colors';
import Toast from 'react-native-simple-toast';
import Custom_header from '../../../helper/Custom_header';
import { few_constants } from '../../../constant/small_constant/Few_Constants';
import { Normalize } from '../../../constant/for_responsive/Dimens';
import { globalStyles } from '../../../constant/StylePage';
export default function Update() {

  return (
    <View style={{ flex: 1 }}>

      <Custom_header title={"Update"} />
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{ paddingHorizontal: few_constants.paddingHorizantal, paddingVertical: Normalize(8) }} >

          {
            [0, 1, 2, 3, 4, 5].map((item, index) => (
              <View key={index} style={{ padding: Normalize(8), width: "99%", alignSelf: "center", backgroundColor: Colors.lightpurple, marginBottom: Normalize(8), borderRadius: Normalize(8), elevation: Normalize(3), }} >
                <Text numberOfLines={2} style={[globalStyles.planeText_outfit_bold, { fontSize: Normalize(12), color: Colors.blue, letterSpacing: 0.5 }]} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in</Text>
                <Text style={[globalStyles.planeText_outfit_regular, { color: Colors.blueText2, fontSize: Normalize(11.5), paddingVertical: Normalize(5) }]} >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
                <Text style={[globalStyles.planeText_outfit_regular, { fontSize: Normalize(11.5), color: Colors.blue, textAlign: "right" }]} >2nd jun,22   2.30pm</Text>
              </View>
            ))


          }

        </View>
      </ScrollView>
    </View>
  )
}
// const payment = () => {
//   const options = {
//     description: 'Credits towards consultation',
//     image: 'https://i.imgur.com/3g7nmJC.png',
//     currency: 'INR',
//     key: 'rzp_live_oFEqC8chIw7LbX', // Your api key
//     amount: '100',
//     name: 'Prakash Maity',
//     prefill: {
//       email: 'prakashmaity62@gmail.com',
//       contact: '9609430604',
//       name: 'Razorpay Software'
//     },
//     theme: { color: Colors.purple }
//   }
//   RazorpayCheckout.open(options).then((data) => {
//     // handle success
//     console.log(`Success: ${data.razorpay_payment_id}`, data);

//     if (data.razorpay_payment_id) {
//       Toast.show("Payment Sucessfull")
//     }


//   }).catch((error) => {
//     // handle failure
//     // console.log("Error:", error);

//     if (error.error) {
//       if (error.error.reason) {
//         Toast.show(error.error.reason)
//       }
//     }


//   });
// }