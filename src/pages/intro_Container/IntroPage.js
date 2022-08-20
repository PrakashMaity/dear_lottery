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
export default function IntroPage() {
  const { themeColor, setThemeColor } = useContext(myContext);
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
      console.log('-----------------------');
      //   loginFunc();
      introloginFunc();
    }
    // navigation.replace("tabBar")
  };

  useEffect(() => {
    checkisLogin();
  }, []);

  const loginFunc_old = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmtoken');
    let fcmToken_for_api = '';
    if (fcmToken != null) {
      fcmToken_for_api = fcmToken;
    } else {
      const newFCMToken = await messaging().getToken();
      fcmToken_for_api = newFCMToken;
      await AsyncStorage.setItem('fcmtoken', newFCMToken);
    }

    const normal_loginDetails = await AsyncStorage.getItem('login_details');
    const to_stringify = JSON.parse(normal_loginDetails);
    const data = {
      user: to_stringify.user,
      password: to_stringify.password,
      role: 'user',
      fcmToken: fcmToken_for_api,
    };
    const res = await axiosPost('users/login', data);
    console.log('Response ', res);
    if (res.response) {
      if (res.response.status == 404 || res.response.status == 400) {
      }
    } else {
      const details = await AsyncStorage.getItem('login_details');
      const data = JSON.parse(details);
      await AsyncStorage.setItem('isLogin', 'true');
      const userData = {
        name: res.data.name,
        password: data.password,
        userId: res.data._id,
        phoneNo: res.data.phone,
        email: res.data.email,
      };
      const login_details = { user: data.user, password: data.password };
      const to_stringify = JSON.stringify(login_details);
      AsyncStorage.setItem('login_details', to_stringify);
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem('userDetails', jsonValue);
      await AsyncStorage.setItem('token', res.token);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'tabBar' }],
        })
      );
    }
  };
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
      <View style={{ height: Normalize(260), width: Normalize(260) }}>
        <Image
          source={images.splash}
          style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
        />
      </View>
    </View>
  );
}
