import { View, Text, Linking } from 'react-native'
import React from 'react'
import RazorpayCheckout from 'react-native-razorpay';

// import RNUpiPayment from 'react-native-upi-payment'
export default function Update() {

const payment =()=>{
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
    theme: {color: '#F37254'}
  }
  RazorpayCheckout.open(options).then((data) => {
    // handle success
    alert(`Success: ${data.razorpay_payment_id}`);
  }).catch((error) => {
    // handle failure
    alert(`Error: ${error.code} | ${error.description}`);
  });
}

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
      <Text
        onPress={() => payment()}
        // onPress={upi_payment_package_test}

        style={{ padding: 20, backgroundColor: "red", color: "white" }} >Update</Text>
    </View>
  )
}