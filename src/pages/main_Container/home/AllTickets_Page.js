import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { globalStyles } from '../../../constant/StylePage';
import { Normalize } from '../../../constant/for_responsive/Dimens';
import { Colors } from '../../../constant/Colors';
import { few_constants } from '../../../constant/small_constant/Few_Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RazorpayCheckout from 'react-native-razorpay';

import { images } from '../../../constant/Images';
import { addComma } from '../../../helper/AddComma';
import { useNavigation } from '@react-navigation/native';
import Custom_header from '../../../helper/Custom_header';
import { allNumbers } from '../../../helper/DemoData';
import Toast from 'react-native-simple-toast';
import {
  axiosGet,
  axiosPatch,
  modifiedAxiosPatch,
} from '../../../http/axios/CustomAxiosCall';
import axios from 'axios';
import LoaderPage from '../../../helper/components/LoaderPage';
import { razerPay, razerPayGetter } from '../../../helper/paymentHelper';
import { paymentHandler } from '../../../http/services';
import { myContext } from '../../../helper/context/ContextPage';
import { getAxios } from '../../../services/getData';
import { baseUrlWithEndPoint } from '../../../services/BaseUrl/baseUrl';
import { patchAxios } from '../../../services/patchData';
import GenaralModel from '../../../commonModel/GenarelModal';
export default function AllTickets_Page({ route }) {
  const { userDetails } = useContext(myContext);
  const { id, header } = route.params;
  const [all_tickets, setAll_tickets] = useState([]);
  const [seriesData, setSeriesData] = useState('');
  const [price, setPrice] = useState('');
  const [seriesId, setSeriesId] = useState('');
  const [refreshing, SetRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  const userdata = JSON.parse(userDetails);

  const [paymentStateModal, setPaymentStateModal] = useState(false);
  const [paymentStage, setPaymentStage] = useState('no payment');
  const [paymentStageData, setpaymentStageData] = useState({
    content: '',
    lottie: '',
    buttonDisable: false,
    color:'red'
  });

  useEffect(() => {
    switch (paymentStage) {
      case 'no payment':
        setpaymentStageData({
          content:
            'Your payment not done , if your Money deduce then we will refund !',
          lottie: require('../../../../assets/animation/payment-unsuccessful.json'),
          buttonDisable: false,
    color:'red'

        });
        break;
      case 'payment brrow':
        setpaymentStageData({
          content: 'Payment Pre-processing ...',
          lottie: require('../../../../assets/animation/start-payment.json'),
          buttonDisable: true,
    color:'blue'

        });
        break;
      case 'payment after success':
        setpaymentStageData({
          content: 'Payment done ,wait for a miniuts...',
          lottie: require('../../../../assets/animation/paymentstart.json'),
          buttonDisable: true,
    color:'blue'

        });
      case 'payment Done':
        setpaymentStageData({
          content: 'Congatulation , Your payment Successfully done !',
          lottie: require('../../../../assets/animation/paymentcomplete.json'),
          buttonDisable: false,
    color:'green'

        });
        break;
      case 'payment not Done':
        setpaymentStageData({
          content:
            'Your payment not done , if your Money deduce then we will refund !',
          lottie: require('../../../../assets/animation/payment-unsuccessful.json'),
          buttonDisable: false,
    color:'red'

        });
        break;
      default:
        setpaymentStageData({
          content:
            'Your payment not done , if your Money deduce then we will refund !',
          lottie: require('../../../../assets/animation/payment-unsuccessful.json'),
          buttonDisable: false,
    color:'red'

        });
    }
  }, [paymentStage]);

  const isSeleted_ticket = (val) => {
    if (val.isAlreadyBuy) {
      return [styles.sold_Ticket_box, styles.sold_Ticket_num];
    } else {
      if (val.isSelected) {
        return [styles.selected_Ticket_box, styles.selected_Ticket_num];
      } else {
        return [styles.unSelected_Ticket_box, styles.unSelected_Ticket_num];
      }
    }
  };
  const onpress_ticketNum = (val) => {
    let prev_arr = all_tickets;
    let new_arr = [];

    prev_arr.map((item, index) => {
      if (val._id == item._id) {
        (item.isSelected = !item.isSelected), new_arr.push(item);
      } else {
        new_arr.push(item);
      }
    });
    setAll_tickets(new_arr);
  };
  const countTIcket = () => {
    let arr = all_tickets;
    let total = 0;
    arr.map((item) => {
      if (item.isSelected) {
        ++total;
      }
    });
    return total;
  };
  const getSeriesData = async (val) => {
    console.log(val);

    setLoader(val != undefined ? true : false);
    const data = {
      params: {
        seriesId: id,
      },
    };
    const res = await getAxios(baseUrlWithEndPoint.home.getAllTickets, data);

    if (res.success) {
      console.log(res.data.data.numberList);

      setSeriesId(res.data.data._id);
      var newarr = [];
      res.data.data.numberList.map((item) => {
        item.isSelected = false;
        newarr.push(item);
      });
      setAll_tickets(newarr);
      setPrice(res.data.data.price);
    } else {
      console.log(res.message);
    }
    setLoader(false);
  };

  useEffect(() => {
    getSeriesData('withloader');
  }, [id]);

  const onPress_buy = async () => {
    // let userdata = JSON.parse(userDetails);
    const ticketArrayData = ticketDataMapper();
    const dataPayload = {
      ticketData: ticketArrayData,
      ticketBuyer: userdata.userId,
    };
    const resSendData = await axiosPatch(
      `payment/ticket_borrow?ticketTableId=${seriesId}`,
      dataPayload
    );
    setPaymentStateModal(true)
    setPaymentStage('payment brrow')
    if (!resSendData) {
      console.log('resSendData :', resSendData);
      Toast.show('Somethink went wrong');
      // setPaymentStage('payment not Done')
    }

    const data = {
      amount: '100',
      name: userdata.name,
      email: userdata.email != '' ? userdata.email : 'abc@gmail.com',
      phone: userdata.phoneNo,
      // phone: '9733492348',
    };
    const result = razerPayGetter(data);
    RazorpayCheckout.open(result)
      .then((data) => {
        // console.log('Data :::::::-', data)
        if (data.razorpay_payment_id) {
          Toast.show('Payment Sucessfull');
          after_payment(data.razorpay_payment_id, resSendData);
          setPaymentStateModal(true);
          setPaymentStage('payment after success');
          // console.log("razorpay_payment_id-------------", data.razorpay_payment_id)
          let cart_iniciator = [];

          resSendData.data.forEach((element) => {
            cart_iniciator.push({
              ticketNumber: element.ticketNumber,
              series: seriesId,
            });
          });
          console.log('cart_iniciator @@@@', cart_iniciator);
          api_update_AddToCart(cart_iniciator);
          // setPaymentStateModal(true);
          setTimeout(()=>{
            setPaymentStage('payment Done');

          },2500)
        }
      })
      .catch((error) => {
        console.log('resSendData @@@@', resSendData);
          setPaymentStateModal(true);
        setPaymentStage('payment not Done');
        // console.log("Error:", error);
        borrow_remove_handler(resSendData);
        if (error.error) {
          if (error.error.reason) {
            Toast.show(error.error.reason);
          }
        }

        // const ticket_in_cart = ticket_add_to_cart(resSendData)
        // console.log("ticket_in_cart----", ticket_in_cart);
      });
  };
  const dataSendToRazerPay = {
    amount: '100',
    name: userdata.name,
    email: userdata.email,
    // phone: userdata.phoneNo,
    phone: '9733492348',
  };
  const onPress_buy_new = async () => {
    const ticketArrayData = ticketDataMapper();
    // console.log('ticketArrayData ', ticketArrayData);

    const dataPayload = {
      ticketData: ticketArrayData,
      ticketBuyer: userdata.userId,
    };
    const borrowResponse = await patchAxios(
      baseUrlWithEndPoint.home.ticket_borrow + seriesId,
      dataPayload
    );
    if (borrowResponse.success) {
      console.log('Ticket borrow :', borrowResponse.data.data);

      const result = razerPayGetter(dataSendToRazerPay);
    } else {
    }
  };

  const api_update_AddToCart = async (data) => {
    try {
      const dataPayload = {
        cartTicket: data,
        amount: calculateAmount(),
      };
      const res = await modifiedAxiosPatch(
        `cart/cart_update?userId=${userdata.userId}`,
        dataPayload
      );
    } catch (error) {
      console.log('api_update_AddToCart----', error);
    }
  };

  const borrow_remove_handler = async (resSendData) => {
    const dataPayload = {
      freshData: resSendData.data,
      ticketTableId: seriesId,
    };
    //  paymentHandler(dataPayload, seriesId);
    const res = await axiosPatch(`payment/ticket_remove`, dataPayload);
    console.log('res scscnscnsck 122sdv1 ----', res);
  };
  const ticketDataMapper = () => {
    const selectedArr = [];
    all_tickets.map((item, index) => {
      if (item.isSelected) {
        selectedArr.push({
          _id: item._id,
          isAlreadyBuy: true,
          userId: userdata.userId,
          ticketNumber: item.ticketNumber,
        });
      }
    });
    return selectedArr;
  };
  const ticket_add_to_cart = (currentArrayData) => {
    const selectedArr = [];
    currentArrayData.map((item, index) => {
      if (item.isSelected) {
        selectedArr.push({
          ticketNumber: item._id,
          series: seriesId,
        });
      }
    });
    return selectedArr;
  };

  const after_payment = async (razerpayId, resSendData) => {
    // Toast.show(countTIcket() + " * " + `${price} =${countTIcket() * price}  `)
    const ticketArrayData = resSendData;
    const dataPayload = {
      ticketData: ticketArrayData.data,
      razerpay: razerpayId,
      ticketBuyer: userdata.userId,
      amount: calculateAmount(),
    };
    //  paymentHandler(dataPayload, seriesId);
    const res = await axiosPatch(
      `payment/payment_acc?ticketTableId=${seriesId}`,
      dataPayload
    );
    if (res.response) {
      // console.log(res.response)
      console.log(res.response);
    } else {
      console.log(res);
      Toast.show(res.massage);
      getSeriesData();
    }
  };
  const onRefresh = () => {
    SetRefreshing(true);
    Toast.show('Refreshing...');
    getSeriesData();
    SetRefreshing(false);
  };

  const ticketAddToCart = async () => {
    try {
    } catch (error) {
      console.log('ticketAddToCart.......', error);
    }
  };

  const calculateAmount = (val) => {
    let a = countTIcket() * price * 100;
    return a.toString();
  };
  return (
    <View style={globalStyles.mainContainer_withoutpadding}>
      <Custom_header back title={header} />
      <GenaralModel
        Content={paymentStageData.content}
        modelOpen={paymentStateModal}
        animationFile={paymentStageData.lottie}
        onRequestClose={() => {
          setPaymentStateModal(false);
        }}
        buttonDisable={paymentStageData.buttonDisable}
        color={paymentStageData.color}
      />
      {loader ? (
        <LoaderPage />
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{
              paddingHorizontal: few_constants.paddingHorizantal,
              flex: 1,
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: Normalize(30) }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {/* page details */}

              <View
                style={{
                  height: Normalize(80),
                  width: '100%',
                  alignSelf: 'center',
                  marginVertical: Normalize(10),
                  borderRadius: Normalize(8),
                }}
              >
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
                      style={{
                        height: '100%',
                        width: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: Normalize(8),
                      justifyContent: 'space-around',
                    }}
                  >
                    <View style={{}}>
                      <Text
                        style={{
                          fontSize: Normalize(14.5),
                          fontFamily: 'Outfit-SemiBold',
                          color: Colors.blue,
                        }}
                      >
                        5 Series Ticktes
                      </Text>
                      <Text
                        style={{
                          fontSize: Normalize(11),
                          fontFamily: 'Outfit-Medium',
                          color: Colors.red,
                          paddingTop: Normalize(2),
                          letterSpacing: 0.5,
                        }}
                      >
                        Closing Time :{' '}
                        <Text
                          style={{
                            fontFamily: 'Outfit-SemiBold',
                            fontSize: Normalize(11.5),
                          }}
                        >
                          15 pm
                        </Text>
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: Colors.purple,
                        padding: Normalize(5),
                        borderRadius: Normalize(5),
                        elevation: Normalize(1),
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.white,
                          fontFamily: 'Outfit-SemiBold',
                          fontSize: Normalize(10),
                        }}
                      >
                        {' '}
                        Ticket Price : {few_constants.rupee}{' '}
                        <Text
                          style={{
                            letterSpacing: 0.5,
                            fontSize: Normalize(10),
                          }}
                        >
                          {addComma(price)}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* tickets numbers */}
              <Text style={[globalStyles.topicHeading]}>Ticket Number :</Text>

              <View
                style={{
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {all_tickets.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => onpress_ticketNum(item)}
                    disabled={item.isAlreadyBuy}
                    key={index}
                    style={isSeleted_ticket(item)[0]}
                  >
                    <Text numberOfLines={1} style={isSeleted_ticket(item)[1]}>
                      {item.ticketNumber}
                    </Text>
                    {item.isAlreadyBuy && (
                      <Text style={styles.sold_out_text}>Sold out</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
          {/* Buy now  section */}
          <View
            style={{
              height: Normalize(55),
              width: '100%',
              backgroundColor: Colors.lightpurple,
              marginTop: Normalize(5),
              elevation: Normalize(1),
              flexDirection: 'row',
              paddingHorizontal: Normalize(12),
            }}
          >
            <View style={{ flex: 1.4, justifyContent: 'center' }}>
              <Text
                style={{
                  fontSize: Normalize(15),
                  color: Colors.purple,
                  fontFamily: 'Outfit-Medium',
                }}
              >
                {few_constants.rupee} {addComma(countTIcket() * price)}{' '}
                <Text
                  style={{
                    fontSize: Normalize(10),
                    fontFamily: 'Outfit-SemiBold',
                    color: Colors.purple,
                  }}
                >
                  ( for {countTIcket()} tickets )
                </Text>
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                disabled={countTIcket() > 0 ? false : true}
                onPress={onPress_buy}
                style={{
                  height: '70%',
                  width: '90%',
                  backgroundColor:
                    countTIcket() > 0 ? Colors.purple : Colors.lightpurple,
                  borderRadius: Normalize(50),
                  elevation: Normalize(1),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Outfit-SemiBold',
                    fontSize: Normalize(12),
                    opacity: countTIcket() > 0 ? 1 : 0.2,
                    color: countTIcket() > 0 ? Colors.white : Colors.purple,
                  }}
                >
                  Buy Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  unSelected_Ticket_box: {
    height: Normalize(25),
    width: '48%',
    backgroundColor: Colors.lightpurple,
    borderRadius: Normalize(8),
    elevation: Normalize(1.5),
    marginBottom: Normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Normalize(6),
  },
  selected_Ticket_box: {
    height: Normalize(25),
    width: '48%',
    backgroundColor: Colors.purple,
    borderRadius: Normalize(8),
    elevation: Normalize(1),
    marginBottom: Normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Normalize(6),
  },
  sold_Ticket_box: {
    height: Normalize(25),
    width: '48%',
    backgroundColor: Colors.background_shade2,
    borderRadius: Normalize(8),
    elevation: Normalize(1),
    marginBottom: Normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Normalize(6),
    overflow: 'hidden',
  },

  unSelected_Ticket_num: {
    fontSize: Normalize(11),
    color: Colors.purple,
    fontFamily: 'Outfit-SemiBold',
  },
  selected_Ticket_num: {
    fontSize: Normalize(11),
    color: Colors.white,
    fontFamily: 'Outfit-SemiBold',
  },
  sold_Ticket_num: {
    fontSize: Normalize(10),
    color: Colors.disableText,
    fontFamily: 'Outfit-SemiBold',
  },
  sold_out_text: {
    color: Colors.white,
    fontFamily: 'Outfit-SemiBold',
    fontSize: Normalize(7),
    backgroundColor: Colors.red,
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: Normalize(5),
    borderBottomLeftRadius: Normalize(20),
  },
});
