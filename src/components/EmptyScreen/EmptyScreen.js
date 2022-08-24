import { StyleSheet, Text, View } from 'react-native';
import Lottie from 'lottie-react-native';

import React from 'react';
import { globalStyles } from '../../constant/StylePage';
import { Colors } from '../../constant/Colors';
import { Normalize } from '../../constant/for_responsive/Dimens';

const EmptyScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Lottie
        source={require('../../../assets/animation/emptylist.json')}
        autoPlay

        loop
        style={{ width: 100 }}
      />
      <Text style={[globalStyles.planeText_outfit_Medium,{color:Colors.grey,marginTop:Normalize(8)}]}>No data Present</Text>
    </View>
  );
};

export default EmptyScreen;

const styles = StyleSheet.create({});
