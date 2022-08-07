import { View, Text, Linking } from 'react-native'
import React from 'react'
import RazorpayCheckout from 'react-native-razorpay';
import { Colors } from '../../../constant/Colors';
import Toast from 'react-native-simple-toast';
// import RNUpiPayment from 'react-native-upi-payment'
export default function Update() {

  const payment = () => {
    const options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_live_oFEqC8chIw7LbX', // Your api key
      amount: '100',
      name: 'Prakash Maity',
      prefill: {
        email: 'prakashmaity62@gmail.com',
        contact: '9609430604',
        name: 'Razorpay Software'
      },
      theme: { color: Colors.purple }
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      console.log(`Success: ${data.razorpay_payment_id}`, data);

      if (data.razorpay_payment_id) {
        Toast.show("Payment Sucessfull")
      }


    }).catch((error) => {
      // handle failure
      // console.log("Error:", error);

      if (error.error) {
        if (error.error.reason) {
          Toast.show(error.error.reason)
        }
      }


    });
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
      <Text
        onPress={() => payment()}
        // onPress={upi_payment_package_test}

        style={{ padding: 20, backgroundColor: "red", color: "white" }} >Update payment</Text>
    </View>
  )
}