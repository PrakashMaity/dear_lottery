import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import { globalStyles } from '../../../constant/StylePage';
import Custom_header from '../../../helper/Custom_header';
import { Normalize } from '../../../constant/for_responsive/Dimens';
import { Colors } from '../../../constant/Colors';
import { images } from '../../../constant/Images';

export default function AboutUs() {
  const socialMedia = [
    {
      title: 'Facebook',
      img: images.facebook,
      link: 'https://www.facebook.com/yuvasamaj.16/',
    },
    {
      title: 'Whatsapp',
      img: images.youtube,
      link: 'https://www.youtube.com/c/WeekendDiary',
    },
  ];

  return (
    <View style={globalStyles.mainContainer_withoutpadding}>
      <Custom_header back title={'About Us'} />
      <View style={globalStyles.mainContainer}>
        <View style={{ alignItems: 'center', paddingVertical: Normalize(15) }}>
          <View
            style={{
              height: Normalize(55),
              width: Normalize(55),
            }}
          >
            <Image
              source={images.applogo}
              style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
            />
          </View>

          <Text
            style={[
              globalStyles.pageHeaderText,
              {
                color: Colors.purple,
                fontSize: Normalize(23),
                paddingTop: Normalize(5),
              },
            ]}
          >
            Gita Lottery
          </Text>
        </View>

        {/* name */}
        <View style={styles.eachTextBox}>
          <Text style={styles.headerText}>Name :</Text>
          <Text style={[styles.dataText]}>Santanu Barh</Text>
        </View>

        {/* phone number */}
        <View style={styles.eachTextBox}>
          <Text style={styles.headerText}>phone No :</Text>
          <Text style={[styles.dataText]}>+91 7908363395</Text>
        </View>
        {/* Email */}
        <View style={styles.eachTextBox}>
          <Text style={styles.headerText}>Email :</Text>
          <Text style={[styles.dataText]}>santanu_barh@yahoo.in</Text>
        </View>
        {/* address */}
        <View style={styles.eachTextBox}>
          <Text style={styles.headerText}>Address :</Text>
          <Text style={[styles.dataText, { fontSize: Normalize(14.5) }]}>
            Durgachokh,Haldia,Purba Medinipur,West Bengal
          </Text>
        </View>
        {/* social media */}
        <View style={{ marginTop: Normalize(35), flexDirection: 'row' }}>
          {socialMedia.map((item, index) => (
            <TouchableOpacity
              onPress={() => Linking.openURL(item.link)}
              key={index}
              style={{
                height: Normalize(35),
                width: Normalize(35),
                borderRadius: Normalize(35) / 2,
                marginRight: Normalize(10),
              }}
            >
              <Image
                source={item.img}
                style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appLogoView: {},
  appName: {},

  eachTextBox: { paddingVertical: Normalize(4) },
  headerText: {
    color: Colors.purple,
    fontSize: Normalize(13),
    fontFamily: 'Outfit-Regular',
    paddingBottom: Normalize(3),
  },
  dataText: {
    color: Colors.greyText,
    fontSize: Normalize(16),
    fontFamily: 'Outfit-Medium',
  },
});
