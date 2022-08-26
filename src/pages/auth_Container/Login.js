import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { globalStyles } from '../../constant/StylePage';
import { Normalize } from '../../constant/for_responsive/Dimens';
import { Colors } from '../../constant/Colors';
import CustomBottom from '../../helper/CustomBottom';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFcmToken } from '../../services/FcmToken/getFcmToken';
import { baseUrlWithEndPoint } from '../../services/BaseUrl/baseUrl';
import { postAxios } from '../../services/postData.js';
import { myContext } from '../../helper/context/ContextPage';
export default function Login() {
  const { userID, setUserID } = useContext(myContext);
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [password_eye, setPassword_eye] = useState(false);
  const [loader, setLoader] = useState(false);
  const onpressLogin = async () => {
    try {
      if (user.length == '') {
        Toast.show('Enter your email or phone number');
      } else {
        if (password.length == '') {
          Toast.show('Enter your password');
        } else {
          loginFunc();
        }
      }
    } catch (error) {
      console.log('onpressLogin-----', error);
    }
  };
  const phoneNumber_check = (val) => {
    const pattern = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (val == '' || val.trim('') == '') {
      return [false, 'Enter Your phone Number'];
    } else if (val.length != 10 || pattern.test(val)) {
      return [false, 'Enter Your valid phone Number'];
    } else {
      return [true, 'ok'];
    }
  };
  const clearData = () => {
    setUser('');
    setPassword('');
    setPassword_eye(false);
    Keyboard.dismiss();
  };

  const loginFunc = async () => {
    setLoader(true);
    const data = {
      user: user,
      password: password,
      role: 'user',
      fcmToken: await getFcmToken(),
    };
    const res = await postAxios(baseUrlWithEndPoint.auth.login, data);
    // console.log('Response ', res);
    if (res.success) {
      // console.log(res);
      storeLogindata(res.data);
      clearData();
      Toast.show(res.data.massage);
      setLoader(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'tabBar' }],
        })
      );
    } else {
      setLoader(false);
      //   console.log(res.status);
      if (res.status == 404 || res.status == 400) {
        Toast.show(res.message.data.massage);
        setLoader(false);
      }
    }
    setLoader(false);
  };
  const storeLogindata = async (res) => {
    let userData = {
      name: res.data.name,
      password: password,
      userId: res.data._id,
      phoneNo: res.data.phone,
      email: res.data.email,
    };
    setUserID(res.data._id)
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem('userDetails', jsonValue);
    await AsyncStorage.setItem('token', res.token);
    const login_details = { user: user, password: password };
    const to_stringify = JSON.stringify(login_details);
    await AsyncStorage.setItem('login_details', to_stringify);
  };

  return (
    <View
      style={[globalStyles.mainContainer, { paddingHorizontal: Normalize(25) }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ paddingTop: '33%' }}
      >
        <View style={{ paddingVertical: Normalize(28) }}>
          <Text style={[globalStyles.pageHeaderText, { textAlign: 'center' }]}>
            Get Started!
          </Text>
          <Text
            style={[globalStyles.pageSubHeaderText, { textAlign: 'center' }]}
          >
            to try your luck.
          </Text>
        </View>
        <View style={{}}>
          {/* email */}

          <Text style={globalStyles.textinputHeader}>Enter Email or Phone</Text>
          <TextInput
            value={user}
            autoCapitalize="none"
            placeholder="Email / Phone "
            keyboardType="default"
            placeholderTextColor={Colors.lightpurple}
            style={globalStyles.textinputStyle}
            onChangeText={(e) => {
              setUser(e);
            }}
          />
          {/* password */}

          <Text style={globalStyles.textinputHeader}>Enter Password</Text>
          <View style={globalStyles.textinputStyle_onlybox}>
            <View style={{ flex: 1 }}>
              <TextInput
                value={password}
                autoCapitalize="none"
                secureTextEntry={password_eye ? false : true}
                placeholder="Password"
                placeholderTextColor={Colors.lightpurple}
                style={globalStyles.textinputStyle_onlytext}
                onChangeText={(e) => {
                  setPassword(e);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => setPassword_eye(!password_eye)}
              style={{
                height: '100%',
                width: '10%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name={password_eye ? 'eye-off' : 'eye'}
                color={Colors.lightpurple}
                size={Normalize(20)}
              />
            </TouchableOpacity>
          </View>
          <CustomBottom
            loader={loader}
            name={'Login'}
            onPress={onpressLogin}
            // onPress={()=>navigation.navigate("tabBar")}
          />
          <Text
            style={[
              globalStyles.pageSubHeaderText,
              {
                textAlign: 'center',
                fontSize: Normalize(11),
                paddingBottom: Normalize(20),
              },
            ]}
          >
            Don't have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Signup')}
              style={{
                color: Colors.purple,
                fontFamily: 'Outfit-SemiBold',
                fontSize: Normalize(12),
              }}
            >
              {' '}
              Register here
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
