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
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../../../constant/StylePage';
import { Normalize } from '../../../constant/for_responsive/Dimens';
import { Colors } from '../../../constant/Colors';
import CustomBottom from '../../../helper/CustomBottom';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { few_constants } from '../../../constant/small_constant/Few_Constants';
export default function EditProfile({ visible, onpress }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loader, setLoader] = useState(false);

  const onpressRegister = () => {
    onpress();
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
                  paddingHorizontal: Normalize(15),
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
                name={'Submit'}
                onPress={onpressRegister}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
