// AwesomeProject
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../../constant/StylePage';
import { Normalize } from '../../../constant/for_responsive/Dimens';
import { Colors } from '../../../constant/Colors';
import { few_constants } from '../../../constant/small_constant/Few_Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { images } from '../../../constant/Images';
import { addComma } from '../../../helper/AddComma';
import { useNavigation } from '@react-navigation/native';
import { axiosGet } from '../../../http/axios/CustomAxiosCall';
import Lottie from 'lottie-react-native';

import {
  getDate,
  getseriesTime,
  todayDate,
  whichDay,
} from '../../../helper/TimeRelatedFunc';
import { data } from '../../../helper/DemoData';
import LoaderPage from '../../../helper/components/LoaderPage';
import Toast from 'react-native-simple-toast';
import { notificationListner } from '../../../helper/notification/PushNotification';
import { myContext } from '../../../helper/context/ContextPage';
import { rang } from '../../../helper/colorChange/SelectTheme';
import { getAxios } from '../../../services/getData';
import {
  baseUrl,
  baseUrlWithEndPoint,
} from '../../../services/BaseUrl/baseUrl';
import axios from 'axios';
import NotFoundModel from '../../../commonModel/NotFoundModel';
import ServerErrorModel from '../../../commonModel/ServerErrorModel';
import EmptyScreen from '../../../components/EmptyScreen/EmptyScreen';

export default function Home() {
  const {
    userID,
    userDetails,
    setUserDetails,
    themeColor,
    userAllDetails,
    setUserAllDetails,
    accountDetails,
    setAccountDetails,
  } = useContext(myContext);

  const navigation = useNavigation();
  const [allSeries, SetAllSeries] = useState([]);
  const [myOrderList, SetMyOrderList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refreshing, SetRefreshing] = useState(false);
  const [notfoundModal, SetNotfoundModal] = useState(false);
  const [serverErrorModal, SetServerErrorModal] = useState(false);

  const notFoundModalOpenClose = () => {
    SetNotfoundModal(!notfoundModal);
  };
  const serverErrorModalOpenClose = () => {
    SetServerErrorModal(!serverErrorModal);
  };

  useEffect(() => {
    notificationListner(navigation);
  }, []);
  const Home_header = () => {
    return (
      <View
        style={{
          height: Normalize(50),
          width: '100%',
          backgroundColor: Colors.purple,
          flexDirection: 'row',
          paddingHorizontal: few_constants.paddingHorizantal,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <StatusBar backgroundColor={Colors.purple} barStyle={'light-content'} />

        <View
          style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}
        >
          <View
            style={{
              height: Normalize(25),
              width: Normalize(25),
              marginRight: Normalize(5),
            }}
          >
            <Image
              source={images.applogo}
              style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
            />
          </View>

          <Text
            numberOfLines={1}
            style={[
              globalStyles.planeText_outfit_Medium,
              { width: '70%', letterSpacing: 1 },
            ]}
          >
            Gita Lottery
          </Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <MaterialCommunityIcons
              name={'account-circle'}
              color={Colors.lightpurple}
              size={Normalize(26)}
            />
          </TouchableOpacity>
          {/* <Text numberOfLines={1} style={[globalStyles.planeText_outfit_Medium, { fontSize: Normalize(9) }]} >{few_constants.rupee} {addComma("0")}</Text> */}
        </View>
      </View>
    );
  };
  const Home_banner = () => {
    return (
      <View
        style={{
          height: Normalize(100),
          marginHorizontal: few_constants.paddingHorizantal,
          marginVertical: Normalize(10),
          borderRadius: Normalize(8),
          backgroundColor: Colors.lightpurple,
          overflow: 'hidden',
          elevation: Normalize(2),
        }}
      >
        <Image
          source={images.home_banner}
          style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
        />
      </View>
    );
  };
  const two_botton_data = [
    {
      title: 'Notice',
      image: images.notice,
      navigateTo: 'Notice',
    },
    {
      title: 'Result',
      image: images.result,
      navigateTo: 'Result',
    },
  ];
  const Result_notice = () => {
    return (
      <View
        style={{
          height: Normalize(80),
          marginHorizontal: few_constants.paddingHorizantal,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {two_botton_data.map((item, index) => (
          <View
            key={index}
            style={{
              height: '100%',
              width: '48%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(item.navigateTo);
              }}
              style={{
                height: '80%',
                width: '100%',
                backgroundColor: Colors.lightpurple,
                borderRadius: Normalize(8),
                overflow: 'hidden',
                elevation: Normalize(2),
                borderWidth: 0,
                borderColor: Colors.purple,
              }}
            >
              <Image
                source={item.image}
                style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: Normalize(12),
                fontFamily: 'Outfit-SemiBold',
                color: Colors.blue,
              }}
            >
              {item.title}
            </Text>
            {/* <View
              style={{
                height: Normalize(10),
                width: Normalize(10),
                borderRadius: Normalize(10) / 2,
                backgroundColor: Colors.red,
                position: 'absolute',
                top: -Normalize(3),
                left: -Normalize(3),
                borderRightColor: Colors.white,
                borderBottomColor: Colors.white,
                borderBottomWidth: 1.4,
                borderRightWidth: 1.4,
              }}
            ></View> */}
          </View>
        ))}
      </View>
    );
  };
  const whichImage = (val) => {
    switch (val) {
      case '1 PM':
        return images.ticket1PM;
      case '8 PM':
        return images.ticket8PM;
      default:
        return images.ticket;
    }
  };
  const whichColorShade = (val) => {
    // val="8 PM"
    // console.log(val)
    switch (val) {
      case '1 PM':
        return Colors.colorShade1PM;
      case '8 PM':
        return Colors.colorShade8PM;
      default:
        return images.lightpurple;
    }
  };
  const whichColorShadeFade = (val) => {
   
    switch (val) {
      case '1 PM':
        return '#dbfbf5';
      case '8 PM':
        return '#ffe0d7'
      default:
        return images.lightpurple;
    }
  };

  const ticketDataFilter = (ticketArray) => {
    const response = ticketArray.filter((element) => element.isLock === false);
    return response;
  };

  const cartTicketFilter = (cartArray) => {
    const response = cartArray.filter((element) => element.series !== null);
    return response;
  };

  const Ticket_card = ({ item }) => {
    return (
      <View
        style={{
          height: Normalize(80),
          width: '99%',
          alignSelf: 'center',
          backgroundColor: Colors.lightpurple,
          marginTop: Normalize(10),
          elevation: Normalize(2),
          borderRadius: Normalize(8),
          padding: Normalize(5),
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View
            style={{
              height: '100%',
              width: '35%',
              borderRadius: Normalize(10),
              backgroundColor: Colors.background_shade2,
              overflow: 'hidden',
              elevation: 0.8,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={whichImage(item.timeSlot.time)}
              style={{ height: '75%', width: '75%', resizeMode: 'contain' }}
            />
          </View>
          <View style={{ flex: 1, paddingHorizontal: Normalize(8) }}>
            <Text
              style={{
                fontSize: Normalize(12),
                fontFamily: 'Outfit-SemiBold',
                color: Colors.blue,
              }}
            >
              {item.series} Ticktes
            </Text>
            {/* <Text style={{ fontSize: Normalize(11), fontFamily: "Outfit-Medium", color:Colors.blue, paddingTop: Normalize(2) }} >Price: <Text style={{color:Colors.red}} >$ 1200</Text></Text> */}
            <Text
              style={{
                fontSize: Normalize(11),
                fontFamily: 'Outfit-Medium',
                color: Colors.red,
                paddingTop: Normalize(2),
                letterSpacing: 0.5,
              }}
            >
              Draw Time -{' '}
              <Text
                style={{
                  fontFamily: 'Outfit-SemiBold',
                  fontSize: Normalize(11.5),
                }}
              >
                {item.timeSlot.time}
              </Text>
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                paddingBottom: Normalize(6),
              }}
            >
              <TouchableOpacity
                disabled={item.isLock}
                onPress={() => {
                  // console.log(item)
                  navigation.navigate('TicketPurchase', {
                    id: item._id,
                    header: `${item.series} Ticktes`,
                  });
                }}
                style={{
                  height: '75%',
                  width: '80%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                  backgroundColor: Colors.green,
                  borderRadius: Normalize(20),
                  elevation: Normalize(2),
                  opacity: item.isLock ? 0.7 : 1,
                }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: Normalize(11),
                    fontFamily: 'Outfit-Medium',
                    letterSpacing: 0.7,
                  }}
                >
                  Pick your Number
                </Text>
              </TouchableOpacity>
              {/* FFAA33 */}
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: Colors.purple,
            padding: Normalize(5),
            position: 'absolute',
            top: Normalize(3),
            left: Normalize(3),
            borderRadius: Normalize(5),
            elevation: Normalize(1),
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontFamily: 'Outfit-Medium',
              fontSize: Normalize(8),
            }}
          >
            {few_constants.rupee}{' '}
            <Text style={{ letterSpacing: 0.5 }}>{addComma(item.price)}</Text>
          </Text>
        </View>
        <View
          style={{
            backgroundColor: Colors.blue,
            padding: Normalize(3),
            position: 'absolute',
            top: Normalize(3),
            right: Normalize(3),
            borderRadius: Normalize(3),
            elevation: Normalize(1),
          }}
        >
          <Text
            style={{
              color: Colors.white,
              fontFamily: 'Outfit-Medium',
              fontSize: Normalize(7),
            }}
          >
            <Text style={{ letterSpacing: 0.5 }}>
              {getDate(item.startTime)}
            </Text>
          </Text>
        </View>
        {item.isLock && (
          <View
            style={{
              backgroundColor: Colors.red,
              paddingVertical: Normalize(2),
              paddingHorizontal: Normalize(4),
              position: 'absolute',
              top: Normalize(5),
              right: Normalize(5),
              borderRadius: Normalize(2),
              elevation: Normalize(1),
            }}
          >
            <Text
              style={{
                color: Colors.white,
                fontFamily: 'Outfit-Medium',
                fontSize: Normalize(7),
              }}
            >
              Opening soon
            </Text>
          </View>
        )}
      </View>
    );
  };
  const Blank_Ticket_card = () => {
    return (
      <View
        style={{
          height: Normalize(80),
          width: '99%',
          alignSelf: 'center',
          backgroundColor: Colors.lightpurple,
          marginTop: Normalize(10),
          elevation: Normalize(2),
          borderRadius: Normalize(8),
          overflow: 'hidden',
        }}
      >
        <View style={{ flex: 1, padding: Normalize(5) }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View
              style={{
                height: '100%',
                width: '35%',
                borderRadius: Normalize(10),
                backgroundColor: Colors.lightpurple,
                overflow: 'hidden',
                elevation: 0.8,
              }}
            >
              <Image
                source={images.ticket}
                style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
              />
            </View>
            <View style={{ flex: 1, paddingHorizontal: Normalize(8) }}>
              <View
                style={{
                  height: Normalize(13),
                  width: '75%',
                  backgroundColor: Colors.lightpurple2,
                  borderRadius: Normalize(3),
                }}
              />
              <View
                style={{
                  height: Normalize(11),
                  width: '65%',
                  backgroundColor: Colors.lightpurple2,
                  marginTop: Normalize(2),
                  borderRadius: Normalize(3),
                }}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  paddingBottom: Normalize(6),
                }}
              >
                <View
                  style={{
                    height: '75%',
                    width: '80%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'flex-end',
                    backgroundColor: Colors.green,
                    borderRadius: Normalize(20),
                    elevation: Normalize(2),
                  }}
                >
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: Normalize(11),
                      fontFamily: 'Outfit-Medium',
                      letterSpacing: 0.7,
                    }}
                  >
                    Choice you Number
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: Colors.purple,
              padding: Normalize(5),
              position: 'absolute',
              top: Normalize(3),
              left: Normalize(3),
              borderRadius: Normalize(5),
              elevation: Normalize(1),
            }}
          >
            <Text
              style={{
                color: Colors.white,
                fontFamily: 'Outfit-Medium',
                fontSize: Normalize(8),
              }}
            >
              {few_constants.rupee} <Text style={{ letterSpacing: 0.5 }}></Text>
            </Text>
          </View>
        </View>

        <View
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            backgroundColor: Colors.background_shade,
            opacity: 0.7,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></View>
        <View
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            // justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              globalStyles.planeText_outfit_bold,
              { color: Colors.red, fontSize: Normalize(13) },
            ]}
          >
            Currently No Game Running !
          </Text>
          <Text
            style={[
              globalStyles.planeText_outfit_bold,
              { color: Colors.blue, fontSize: Normalize(10) },
            ]}
          >
            Wait for next Update
          </Text>
        </View>
      </View>
    );
  };
  const getAllSeries = async (val) => {
    // console.log("--------------")

    setLoader(val != undefined ? true : false);
    const res = await getAxios(baseUrlWithEndPoint.home.getAllSeries);
    // console.log(res.data.data)
    if (res.success) {
      SetAllSeries(res.data.data);
      setLoader(false);
    } else {
      setLoader(false);
      SetAllSeries([]);
      if (res.status > 399 && res.status < 500) {
        // notFoundModalOpenClose();
      } else if (res.status > 499 && res.status < 600) {
        serverErrorModalOpenClose();
      }
    }
    setLoader(false);
  };
  const getAsyncStorageDetails = async () => {
    const fcmtoken = await AsyncStorage.getItem('fcmtoken');
    const isLogin = await AsyncStorage.getItem('isLogin');
    const userDetails = await AsyncStorage.getItem('userDetails');
    const token = await AsyncStorage.getItem('token');

    const theme = await AsyncStorage.getItem('theme');

    var a = JSON.parse(userDetails);

    setUserAllDetails(a);

    setUserDetails(userDetails);
    // console.log("fcmtoken----", fcmtoken)
    // console.log("isLogin----", isLogin)
    // console.log("userDetails----", userDetails)
    // console.log("token----", token)
    // console.log("theme----", theme, "async--------", themeColor)
  };

  const getUserDetails = async () => {
    if (userID != '') {
      const res = await getAxios(baseUrlWithEndPoint.home.userDetails + userID);
      // console.log(res.data.data);
      if (res.success) {
        setAccountDetails(res.data.data);
      }
    }
  };
  useEffect(() => {
    getAsyncStorageDetails();
  }, []);

  useEffect(() => {
    withLoader();
  }, [userID]);

  const getMybookingList = async (val) => {
    // console.log('******************', userID);
    setLoader(val != undefined ? true : false);
    const res = await getAxios(
      baseUrlWithEndPoint.home.getAllBookingTickets + userID
    );
    // console.log('++++------+++++', res.success);
    if (res.success) {
      SetMyOrderList(res.data.data);
      setLoader(false);
    } else {
      // console.log('getMybookingList---', res.status);
      setLoader(false);
    }
    setLoader(false);
  };
  const onRefresh = () => {
    SetRefreshing(true);
    Toast.show('Refreshing...');
    reloadOnComeBack();
    SetRefreshing(false);
  };

  const isTicket = (val) => {
    // console.log(val)
    if (val == null || val == undefined || val.length == 0) {
      return false;
    } else {
      return true;
    }
  };
  const reloadOnComeBack = () => {
    if (userID != '') {
      getAllSeries();
      getMybookingList();
      getUserDetails();
    } else {
      console.log('empty id -2  ');
    }
  };
  const withLoader = () => {
    if (userID != '') {
      getAllSeries('withLoader');
      getMybookingList('withLoader');
      getUserDetails();
    } else {
      console.log('empty id ');
    }
  };

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      reloadOnComeBack();
    });
    return willFocusSubscription;
  }, [userID]);

  return (
    <View style={globalStyles.mainContainer_withoutpadding}>
      <Home_header />
      {loader ? (
        <LoaderPage />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* banner */}
          <Home_banner />
          {/* result and notice */}
          <Result_notice />
          {/* tickets */}
          {notfoundModal && (
            <NotFoundModel
              modelOpen={notfoundModal}
              onRequestClose={notFoundModalOpenClose}
            />
          )}
          {serverErrorModal && (
            <ServerErrorModel
              modelOpen={serverErrorModal}
              onRequestClose={serverErrorModalOpenClose}
            />
          )}
          <View style={{ padding: few_constants.paddingHorizantal }}>
            <Text
              style={[
                globalStyles.planeText_outfit_bold,
                { color: Colors.purple },
              ]}
            >
              Recent Ticktes
            </Text>

            {ticketDataFilter(allSeries).length != 0 ? (
              <View>
                {ticketDataFilter(allSeries).map((item, index) => (
                  <View key={index}>
                    <Ticket_card item={item} />
                  </View>
                ))}
              </View>
            ) : (
              <View>
                {[1].map((item, index) => (
                  <View key={index}>
                    <Blank_Ticket_card item={item} />
                  </View>
                ))}
              </View>
            )}
            {/* My order */}

            <Text
              style={[
                globalStyles.planeText_outfit_bold,
                {
                  color: Colors.purple,
                  paddingVertical: few_constants.paddingHorizantal,
                },
              ]}
            >
              My Order
            </Text>

            {myOrderList.length > 0 ? (
              <>
                {myOrderList.map((item, index) => (
                  <Fragment key={index}>
                    <View
                      style={{
                        // padding: Normalize(5),
                        borderRadius: Normalize(8),
                        backgroundColor: Colors.lightpurple,
                        elevation: Normalize(2),
                        borderRadius: Normalize(8),
                        marginBottom: Normalize(10),
                      }}
                    >
                      {cartTicketFilter(item.cartTicket).length > 0 && (
                        <View style={{ marginBottom: Normalize(6),padding: Normalize(5) }}>
                          {/* <Text
                            onPress={() => console.log(item)}
                            numberOfLines={1}
                            style={{
                              fontSize: Normalize(11.5),
                              color: Colors.blue,
                              fontFamily: 'Outfit-Medium',
                              marginBottom: Normalize(6),
                            }}
                          >
                            Ticket of {getDate(item.createdAt)}
                          </Text> */}
                          <View
                            style={{
                              flexWrap: 'wrap',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            {isTicket(item.cartTicket) &&
                              item.cartTicket.map(
                                (childitem, childindex) =>
                                  childitem.series != null && (
                                    <View
                                      key={childindex}
                                      // onPress={() => console.log(item)}
                                      style={{
                                        paddingVertical: Normalize(5),
                                        width: '48%',
                                        backgroundColor:whichColorShadeFade(childitem.series.timeSlot.time),
                                        borderRadius: Normalize(5),
                                        elevation: Normalize(2),
                                        marginBottom: Normalize(8),
                                        paddingHorizontal: Normalize(6),
                                        overflow: 'hidden',
                                      }}
                                    >
                                      <Text
                                        numberOfLines={1}
                                        style={{
                                          color: Colors.purple,
                                          fontSize: Normalize(10),
                                          paddingTop: Normalize(2),
                                          paddingBottom: Normalize(5),
                                          fontFamily: 'Outfit-Medium',
                                        }}
                                      >
                                        {childitem.series.series} <Text style={{fontSize:Normalize(7),}}> ({childitem.series.timeSlot.time})</Text>
                                        {/* {childitem.series.timeSlot.time}
                                        <Text
                                          style={{
                                            fontSize: Normalize(9),
                                            fontFamily: 'Outfit-Medium',
                                          }}
                                        >
                                          , {childitem.series.series}
                                        </Text> */}
                                      </Text>

                                      <Text
                                        numberOfLines={1}
                                        style={[
                                          globalStyles.planeText_outfit_Medium,
                                          {
                                            color: Colors.purple,
                                            fontSize: Normalize(7),
                                            paddingTop: Normalize(2),
                                            paddingBottom: Normalize(5),
                                          },
                                        ]}
                                      >
                                        {getDate(childitem.series.startTime)}
                                      </Text>

                                      <View
                                        style={{
                                          height: Normalize(18),
                                        }}
                                      >
                                        <View
                                          style={{
                                            backgroundColor:
                                            whichColorShade(childitem.series.timeSlot.time),
                                            elevation: Normalize(1),
                                            height: '100%',
                                            width: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: Normalize(3),
                                          }}
                                        >
                                          <Text
                                            numberOfLines={1}
                                            style={[
                                              globalStyles.planeText_outfit_Medium,
                                              {
                                                color: Colors.white,
                                                fontSize: Normalize(10),
                                              },
                                            ]}
                                          >
                                            Ticket no :{' '}
                                            <Text
                                              style={{
                                                fontSize: Normalize(11),
                                                fontFamily: 'Outfit-Medium',
                                                color: Colors.white,
                                              }}
                                            >
                                              {childitem.ticketNumber}
                                            </Text>
                                          </Text>
                                        </View>
                                      </View>
                                      <View
                                        style={{
                                          padding: Normalize(3),
                                          backgroundColor: Colors.blue,
                                          position: 'absolute',
                                          right: 0,
                                          borderBottomLeftRadius: Normalize(5),
                                        }}
                                      >
                                        <Text
                                          style={{
                                            fontSize: Normalize(9.5),
                                            color: Colors.white,
                                            fontFamily: 'Outfit-Medium',
                                          }}
                                        >
                                          {few_constants.rupee}{' '}
                                          {childitem.series.price}
                                        </Text>
                                      </View>
                                    </View>
                                  )
                              )}
                          </View>
                        </View>
                      ) }
                    </View>
                  </Fragment>
                ))}
              </>
            ) : (
              <EmptyScreen />
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
