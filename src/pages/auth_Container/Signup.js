import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, { useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { globalStyles } from '../../constant/StylePage';
import { Normalize } from '../../constant/for_responsive/Dimens';
import { Colors } from '../../constant/Colors';
import CustomBottom from '../../helper/CustomBottom';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { apis } from '../../constant/apis/Constants_Apis';
import { axiosPost } from '../../http/axios/CustomAxiosCall';
import { postAxios } from '../../services/postData';
import { baseUrlWithEndPoint } from '../../services/BaseUrl/baseUrl';
import { getFcmToken } from '../../services/FcmToken/getFcmToken';
import { myContext } from '../../helper/context/ContextPage';

export default function Signup() {
  const { userID, setUserID } = useContext(myContext);

  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [password_eye, setPassword_eye] = useState(false);
  const [con_password_eye, setCon_password_eye] = useState(false);
  const [loader, setLoader] = useState(false);

  const onpressRegister = () => {
    try {
      const EmailVerify = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (
        name == '' ||
        phone == '' ||
        password == '' ||
        confirm_password == ''
      ) {
        Toast.show('Please fill up all field');
      } else {
        if (name == '' && name.trim('') == '') {
          Toast.show('Enter your name');
        } else {
          if (!phoneNumber_check(phone)[0]) {
            Toast.show(phoneNumber_check(phone)[1]);
          } else {
            if (password.length < 6) {
              Toast.show('Enter minimum 6 digits password');
            } else {
              if (confirm_password == '') {
                Toast.show('Enter confirm password also');
              } else {
                if (password != confirm_password) {
                  Toast.show('Must be enter same password');
                } else {
                  if (email.length > 0) {
                    if (!EmailVerify.test(email)) {
                      Toast.show('Enter your valid email address');
                    } else {
                      registerFunc();
                    }
                  } else {
                    registerFunc();
                  }
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.log('onpressRegister-----', error);
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
  const registerFunc = async () => {
    try {
      setLoader(true);
      const data = {
        name: name,
        email: email,
        phone: phone,
        password: password,
        role: 'user',
        fcmToken: await getFcmToken(),
      };
      const res = await postAxios(baseUrlWithEndPoint.auth.register, data);
      // console.log(res.message.data.message);

      if (res.success) {
        storeRegisterdata(res.data);
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
        if (res.status == 404 || res.status == 400) {
          Toast.show(res.message.data.message);
          setLoader(false);
        }
      }

      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log('error_signup.........', error);
    }
  };

  const storeRegisterdata = async (res) => {
    let userData = {
      name: res.data.name,
      password: password,
      userId: res.data._id,
      phoneNo: res.data.phone,
      email: res.data.email,
    };
    setUserID(res.data._id)
    // console.log(userData)
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem('userDetails', jsonValue);
    await AsyncStorage.setItem('token', res.token);
    const login_details = { user: phone, password: password };
    const to_stringify = JSON.stringify(login_details);
    await AsyncStorage.setItem('login_details', to_stringify);
  };
  const clearData = () => {
    setName('');
    setPhone('');
    setEmail('');
    setPassword('');
    setConfirm_password('');
    setPassword_eye(false);
    setCon_password_eye(false);
    setPassword_eye(false);
  };
  return (
    <View
      style={[globalStyles.mainContainer, { paddingHorizontal: Normalize(25) }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <View style={{ paddingVertical: Normalize(28) }}>
          <Text style={[globalStyles.pageHeaderText, { textAlign: 'center' }]}>
            Let's Get Started!
          </Text>
          <Text
            style={[globalStyles.pageSubHeaderText, { textAlign: 'center' }]}
          >
            Create an account to try your luck.
          </Text>
        </View>
        <View style={{}}>
          {/* name */}

          <Text style={globalStyles.textinputHeader}>Enter your Name</Text>
          <TextInput
            value={name}
            placeholder="Name"
            placeholderTextColor={Colors.lightpurple}
            style={[globalStyles.textinputStyle]}
            onChangeText={(e) => {
              setName(e);
            }}
          />

          {/* phone number */}

          <Text style={globalStyles.textinputHeader}>
            Enter whatsapp Number
          </Text>
          <TextInput
            value={phone}
            keyboardType="phone-pad"
            placeholder="Phone Number"
            maxLength={10}
            placeholderTextColor={Colors.lightpurple}
            style={globalStyles.textinputStyle}
            onChangeText={(e) => {
              setPhone(e);
            }}
          />

          {/* email */}

          <Text style={globalStyles.textinputHeader}>
            Enter Email Address{' '}
            <Text style={{ fontSize: Normalize(10) }}>(Optional)</Text>
          </Text>
          <TextInput
            value={email}
            autoCapitalize="none"
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor={Colors.lightpurple}
            style={globalStyles.textinputStyle}
            onChangeText={(e) => {
              setEmail(e);
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

          {/* confirmed password */}

          <Text style={globalStyles.textinputHeader}>
            Enter Confirm Password
          </Text>
          <View style={globalStyles.textinputStyle_onlybox}>
            <View style={{ flex: 1 }}>
              <TextInput
                value={confirm_password}
                autoCapitalize="none"
                secureTextEntry={con_password_eye ? false : true}
                placeholder="Confirm Password"
                placeholderTextColor={Colors.lightpurple}
                style={[
                  globalStyles.textinputStyle_onlytext,
                  { borderColor: Colors.lightpurple },
                ]}
                onChangeText={(e) => {
                  setConfirm_password(e);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => setCon_password_eye(!con_password_eye)}
              style={{
                height: '100%',
                width: '10%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name={con_password_eye ? 'eye-off' : 'eye'}
                color={Colors.lightpurple}
                size={Normalize(20)}
              />
            </TouchableOpacity>
          </View>

          <CustomBottom
            loader={loader}
            name={'Register'}
            onPress={onpressRegister}
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
            Already have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Login')}
              style={{
                color: Colors.purple,
                fontFamily: 'Outfit-SemiBold',
                fontSize: Normalize(12),
              }}
            >
              {' '}
              Login here
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
