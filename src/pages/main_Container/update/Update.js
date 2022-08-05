import { View, Text, Linking } from 'react-native'
import React from 'react'
import RNUpiPayment from 'react-native-upi-payment'
export default function Update() {



  const openPaymentApp = async (payApp) => {
    let url = '';
    let txt = "For ticket"
    let price = 15
    let toWhom = "Rocky bhai"

    switch (payApp) {
      case 'PAYTM': url = 'paytmmp'; break;
      case 'GPAY': url = 'gpay'; break;
      case 'PHONEPE': url = 'phonepe'; break;
    }
    url = url + `://upi/pay?pa=iamakon810@okicici&pn=${toWhom}&mc=0000&tr=123456789ABCDEFG&tn=${txt}&am=${price}&cu=INR`
    // console.log('URL : ', url);
    try {
      await Linking.openURL(url);
    }
    catch (err) {
      console.error('ERROR : ', err);
    }
  }


  const upi_payment_package_test = () => {
    RNUpiPayment.initializePayment({
      vpa: 'prakashmaity@ybl', // or can be john@ybl or mobileNo@upi
      payeeName: 'prakashmaity@ybl',
      amount: '1',
      transactionRef: 'aaaf-532-moei-fu'
    }, successCallback, failureCallback);
  }



  const successCallback = (data) => {
    console.log("successCallback------", data)
  }

  const failureCallback = (data) => {
    console.log("failureCallback------", data)
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
      <Text
        // onPress={() => openPaymentApp("GPAY")}
        onPress={upi_payment_package_test}

        style={{ padding: 20, backgroundColor: "red", color: "white" }} >Update</Text>
    </View>
  )
}