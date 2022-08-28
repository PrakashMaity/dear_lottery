import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../../constant/StylePage';
import Custom_header from '../../../helper/Custom_header';
import { Normalize } from '../../../constant/for_responsive/Dimens';
import { Colors } from '../../../constant/Colors';
import { images } from '../../../constant/Images';
import ImageView from 'react-native-image-viewing';
export default function AboutUs() {
  const [visible, setIsVisible] = useState(false);
  const [selectImageIdx, setSelectImageIdx] = useState('');
  const imagesOnpress = (val) => {
    setSelectImageIdx(val);
    setIsVisible(true);
  };

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

  const licenceData = [
    {
      text: '1',
      uri: "https://res.cloudinary.com/dxfrfd9n3/image/upload/v1661701384/IMG-20220828-WA0000_me27lj.jpg",
    },
    {
      text: '2',
      uri: "https://res.cloudinary.com/dxfrfd9n3/image/upload/v1661701384/IMG-20220828-WA0001_zaak2l.jpg",
    },
  ];

  return (
    <View style={globalStyles.mainContainer_withoutpadding}>
      <Custom_header back title={'About Us'} />

      <View style={globalStyles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{ alignItems: 'center', paddingVertical: Normalize(15) }}
          >
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
          {/* Licence */}
          <View style={styles.eachTextBox}>
            <Text style={styles.headerText}>Licence :</Text>
          </View>

          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            {licenceData.map((item, index) => (
              <TouchableOpacity
              onPress={() => imagesOnpress(index)}
                key={index}
                style={{
                  height: Normalize(180),
                  width: '48%',
                  backgroundColor: Colors.background_shade,
                  borderRadius: Normalize(5),
                  padding: Normalize(2),
                  borderWidth: Normalize(1.5),
                  borderColor: Colors.purple,
                }}
              >
                <Image
                  source={{uri:item.uri}}
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>

          {visible && (
            <ImageView
              images={licenceData}
              imageIndex={selectImageIdx}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
              // FooterComponent={(item) => (
              //   <Text
              //     style={{
              //       color: 'white',
              //       fontSize: Normalize(15),
              //       textAlign: 'center',
              //       fontFamily: 'Outfit-Medium',
              //       paddingVertical: Normalize(8),
              //     }}
              //   >
              //     {/* {licenceData[item.imageIndex].text} */}
              //      results
              //   </Text>
              // )}
            />
          )}

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
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
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
