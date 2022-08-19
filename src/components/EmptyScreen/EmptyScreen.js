import { StyleSheet, Text, View } from 'react-native'
import Lottie from 'lottie-react-native';

import React from 'react'

const EmptyScreen = () => {
  return (
    <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
     <Lottie
                source={require('../../../assets/animation/emptylist.json')}
                autoPlay
                loop
                style={{width:100}}
                
              />
              <Text>No data Present</Text>
    </View>
  )
}

export default EmptyScreen

const styles = StyleSheet.create({})