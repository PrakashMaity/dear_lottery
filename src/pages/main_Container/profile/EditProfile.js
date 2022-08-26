import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Linking,
  Modal,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { globalStyles } from '../../../constant/StylePage';
import { Normalize } from '../../../constant/for_responsive/Dimens';
import { Colors } from '../../../constant/Colors';
import CustomBottom from '../../../helper/CustomBottom';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { few_constants } from '../../../constant/small_constant/Few_Constants';
import { myContext } from '../../../helper/context/ContextPage';
import { phoneNumber_check } from '../../../helper/validation/Validation';
import Toast from 'react-native-simple-toast';
import { baseUrlWithEndPoint } from '../../../services/BaseUrl/baseUrl';
import { patchAxios } from '../../../services/patchData';
export default function EditProfile({ visible, onpress }) {
  const { accountDetails, setAccountDetails, userID } = useContext(myContext);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loader, setLoader] = useState(false);

  const setData = () => {
    setName(accountDetails.name);
    setPhone(accountDetails.phone);
    setEmail(accountDetails.email);
    // console.log(accountDetails.address);
    if (accountDetails.address != undefined || accountDetails.address != null) {
      setAddress(accountDetails.name);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  const onpressRegister = () => {
    // onpress();
    const EmailVerify = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (name == '' && name.trim('') == '') {
      Toast.show('Enter your name');
    } else {
      if (!phoneNumber_check(phone)[0]) {
        Toast.show(phoneNumber_check(phone)[1]);
      } else {
        if (email.length > 0) {
          if (!EmailVerify.test(email)) {
            Toast.show('Enter your valid email address');
          } else {
            updateFunc();
          }
        } else {
          updateFunc();
        }
      }
    }

    // console.log(accountDetails.address);
  };

  const updateFunc = async () => {
    const data = {
      name: name,
      email: email,
      phone: phone,
      address: address,
    };

    const res = await patchAxios(
      baseUrlWithEndPoint.profile.updateProfile + userID,
      data
    );

    console.log(res);
    if (res.success) {
      Toast.show(res.data.massage);
      onpress();
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onpress}
    >
      <View style={{ flex: 1, backgroundColor: Colors.background_shade }}>
        <View
          style={[
            globalStyles.mainContainer,
            { paddingHorizontal: Normalize(25) },
          ]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            <View
              style={{
                height: Normalize(50),
                width: '100%',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                onPress={onpress}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Ionicons
                  name={'arrow-back'}
                  color={Colors.purple}
                  size={Normalize(26)}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={[
                globalStyles.pageHeaderText,
                { textAlign: 'left', paddingBottom: Normalize(15) },
              ]}
            >
              Edit your profile
            </Text>
            <View style={{}}>
              {/* name */}

              <Text style={globalStyles.textinputHeader}>Name</Text>
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

              <Text style={globalStyles.textinputHeader}>whatsapp Number</Text>
              <TextInput
                value={phone}
                keyboardType="phone-pad"
                placeholder="whatsapp Number"
                maxLength={10}
                placeholderTextColor={Colors.lightpurple}
                style={globalStyles.textinputStyle}
                onChangeText={(e) => {
                  setPhone(e);
                }}
              />

              {/* email */}

              <Text style={globalStyles.textinputHeader}>Email</Text>
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

              {/* addresss */}

              <Text style={globalStyles.textinputHeader}>Address</Text>

              <View
                style={{
                  height: Normalize(100),
                  width: '100%',
                  backgroundColor: Colors.white,
                  marginBottom: Normalize(12),
                  marginTop: Normalize(5),
                  alignSelf: 'center',
                  borderRadius: Normalize(8),
                  borderWidth: Normalize(1.5),
                  borderColor: Colors.lightpurple,
                  paddingHorizontal: Normalize(12),
                }}
              >
                <TextInput
                  multiline
                  value={address}
                  autoCapitalize="none"
                  placeholder="Enter Your Address"
                  keyboardType="email-address"
                  placeholderTextColor={Colors.lightpurple}
                  style={{
                    width: '100%',
                    alignItems: 'stretch',
                  }}
                  onChangeText={(e) => {
                    setAddress(e);
                  }}
                />
              </View>

              <CustomBottom
                loader={loader}
                name={'Update'}
                onPress={onpressRegister}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
