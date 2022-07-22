import {View, Text} from 'react-native';
import React from 'react';
import RNUpiPayment from 'react-native-upi-payment';
export default function App() {
  const payment = async () => {
    try {
      const res = await RNUpiPayment.initializePayment(
        {
          vpa: 'iamakon810@okicici', // or can be john@ybl or mobileNo@upi
          payeeName: 'Ankan Roy',
          amount: '1',
          transactionRef: 'aasf-332-ao8i-fn',
        },
        successCallback,
        failureCallback,
      );

      console.log(res);
    } catch (error) {
      console.log('....', error);
    }
  };
  const successCallback = successCallback => {
    console.log('successCallback', successCallback);
  };
  const failureCallback = failureCallback => {
    console.log('failureCallback', failureCallback);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Reducer_plus_minus /> */}
      {/* <Reducer_plus_minus_2 /> */}
      {/* <Reducer_plus_minus_3/> */}

      <Text
        onPress={payment}
        style={{
          paddingHorizontal: '15%',
          paddingVertical: '4%',
          backgroundColor: 'darkviolet',
          borderRadius: 50,
          color: 'white',
          fontSize: 25,
          fontWeight: '700',
        }}>
        Payment
      </Text>
    </View>
  );
}
