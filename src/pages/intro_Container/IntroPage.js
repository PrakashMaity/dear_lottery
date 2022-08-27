import { View, Text, Image } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { globalStyles } from '../../constant/StylePage';
import { getAsync, setAsync } from '../../helper/asyncstorage/AsyncStoragePage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Normalize } from '../../constant/for_responsive/Dimens';
import { images } from '../../constant/Images';
import { myContext } from '../../helper/context/ContextPage';
import { PurpleShades } from '../../helper/colorChange/ColorsObject';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosPost } from '../../http/axios/CustomAxiosCall';
import { getFcmToken } from '../../services/FcmToken/getFcmToken';
import { baseUrlWithEndPoint } from '../../services/BaseUrl/baseUrl';
import { postAxios } from '../../services/postData';
import { Colors } from 'react-native/Libraries/NewAppScreen';
export default function IntroPage() {
  const { themeColor, setThemeColor, userID, setUserID } =
    useContext(myContext);
  const navigation = useNavigation();

  const checkisLogin = async () => {
    const res = await getAsync('isLogin');
    const theme = await getAsync('theme');
    const loginDetails = await AsyncStorage.getItem('login_details');

    // console.log("======",theme)

    if (theme != null) {
      setThemeColor(theme);
    } else {
      setThemeColor(PurpleShades.Title);
      setAsync('theme', PurpleShades.Title);
    }

    if (loginDetails == null) {
      navigation.replace('LoginOrSignUp');
    } else {
      // console.log('-----------------------');
      //   loginFunc();
      introloginFunc();
    }
    // navigation.replace("tabBar")
  };

  useEffect(() => {
    checkisLogin();
  }, []);
  const introloginFunc = async () => {
    const normal_loginDetails = await AsyncStorage.getItem('login_details');
    const toStringify = JSON.parse(normal_loginDetails);
    const data = {
      user: toStringify.user,
      password: toStringify.password,
      role: 'user',
      fcmToken: await getFcmToken(),
    };
    const res = await postAxios(baseUrlWithEndPoint.auth.login, data);

    // console.log(res)
    if (res.success) {
      //   console.log(res);
      storeintroLogindata(res.data);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'tabBar' }],
        })
      );
    } else {
      navigation.replace('LoginOrSignUp');
    }
  };
  const storeintroLogindata = async (res) => {
    const details = await AsyncStorage.getItem('login_details');
    const data = JSON.parse(details);
    const userData = {
      name: res.data.name,
      password: data.password,
      userId: res.data._id,
      phoneNo: res.data.phone,
      email: res.data.email,
    };
    setUserID(res.data._id);
    const login_details = { user: data.user, password: data.password };
    const to_stringify = JSON.stringify(login_details);
    AsyncStorage.setItem('login_details', to_stringify);
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem('userDetails', jsonValue);
    await AsyncStorage.setItem('token', res.token);
  };

  return (
    <View
      style={[
        globalStyles.mainContainer,
        { justifyContent: 'center', alignItems: 'center' },
      ]}
    >
      <View
        style={{
          height: Normalize(200),
          width: Normalize(200),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={images.applogo}
          style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
        />
      </View>
      <Text style={globalStyles.pageHeaderText}>Welcome to Gita Lottery</Text>
      <Text
        style={[globalStyles.planeText_outfit_Medium, { color: Colors.blue }]}
      >
        since 2022
      </Text>

      <View
        style={{
          height: Normalize(60),
          width: Normalize(60),
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: Normalize(15),
          right: Normalize(15),
        }}
      >
        <Image
          source={images.madeInIndia}
          style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
        />
      </View>
    </View>
  );
}
