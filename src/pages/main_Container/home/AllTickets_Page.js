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
import { axiosGet, axiosPatch } from '../../../http/axios/CustomAxiosCall';
import axios from 'axios';
import LoaderPage from '../../../helper/components/LoaderPage';
import { razerPay, razerPayGetter } from '../../../helper/paymentHelper';
import { paymentHandler } from '../../../http/services';
import { myContext } from '../../../helper/context/ContextPage';
export default function AllTickets_Page({ route }) {
  const { userDetails } = useContext(myContext)
  const { id, header } = route.params;
  const [all_tickets, setAll_tickets] = useState([]);
  const [seriesData,setSeriesData]= useState('')
  const [price, setPrice] = useState('');
  const [seriesId, setSeriesId] = useState('');
  const [refreshing, SetRefreshing] = useState(false)
  const [loader, setLoader] = useState(false);
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
    var prev_arr = all_tickets;
    var new_arr = [];

    prev_arr.map((item, index) => {
      if (val.ticketNumber == item.ticketNumber) {

        item.isSelected = !item.isSelected,

          new_arr.push(item);
      } else {
        new_arr.push(item);
      }
    });
    setAll_tickets(new_arr);
  };
  const countTIcket = () => {
    var arr = all_tickets;
    let total = 0;
    arr.map((item) => {
      if (item.isSelected) {
        ++total;
      }
    });
    return total;
  };
  const getSeriesData = async () => {
    setLoader(true);
    const data = {
      params: {
        seriesId: id,
      },
    };
    const res = await axiosGet('ticket/ticket_list_get', data);

    console.log(res.data)

    if (res.response) {
      console.log('getSeriesData------', res.response);
    } else {
      setSeriesId(res.data._id)
      var newarr = [];
      res.data.numberList.map((item) => {
        item.isSelected = false;
        // console.log(item)

        newarr.push(item);
      });
      setAll_tickets(newarr);
      setPrice(res.data.price);
    }
    setLoader(false);
  };
  useEffect(() => {
    getSeriesData();
  }, [id]);




  const onPress_buy = async () => {
    const userdata = JSON.parse(userDetails)
    const ticketArrayData = ticketDataMapper()
    console.log('ticketArrayData ',ticketArrayData)

    const dataPayload = {
      ticketData: ticketArrayData,
      ticketBuyer: userdata.userId,
    };
    console.log('userdata',userdata)

    const resSendData = await axiosPatch(`payment/ticket_borrow?ticketTableId=${seriesId}`, dataPayload)
    console.log('Ticket borrow :',resSendData)
    if(!resSendData){
      console.log('resSendData :',resSendData)
      Toast.show('Somethink went wrong')

    }
    // if(resSendData.status === 400){

    // }
    // if(resSendData.status === 404){
      
    // }
    // if(resSendData.status === 500){
      
    // }

    const data = {
      amount: '100',
      name: userdata.name,
      email: userdata.email,
      // phone: userdata.phoneNo,
      phone: "9733492348",
    };

    const result = razerPayGetter(data);
    RazorpayCheckout.open(result)
      .then((data) => {
        // console.log('Data :::::::-', data)
        if (data.razorpay_payment_id) {
          Toast.show("Payment Sucessfull")
          after_payment(data.razorpay_payment_id,resSendData)
          // console.log("razorpay_payment_id-------------", data.razorpay_payment_id)
        }
      })
      .catch((error) => {
        // console.log("Error:", error);
        borrow_remove_handler(resSendData)
        if (error.error) {
          if (error.error.reason) {
            Toast.show(error.error.reason)
          }
        }
      });
  }

  const borrow_remove_handler =async(resSendData)=>{
    const dataPayload = {
      freshData: resSendData.data,
      ticketTableId: seriesId,
    };
    //  paymentHandler(dataPayload, seriesId);
    const res = await axiosPatch(`payment/ticket_remove`, dataPayload)
    console.log('res scscnscnsck 122sdv1 ----',res)
  }
  const ticketDataMapper=()=>{
    const userdata = JSON.parse(userDetails)
    const selectedArr = []
    all_tickets.map((item, index) => {
      if (item.isSelected) {
        selectedArr.push({
          _id: item._id,
          isAlreadyBuy: true,
          userId: userdata.userId,
        })
      }
    })

    return selectedArr;
  }

  const after_payment = async (razerpayId,resSendData) => {
    // Toast.show(countTIcket() + " * " + `${price} =${countTIcket() * price}  `)
    const userdata = JSON.parse(userDetails)
    const ticketArrayData = resSendData;
    const dataPayload = {
      ticketData: ticketArrayData.data,
      razerpay: razerpayId,
      ticketBuyer: userdata.userId,
    };
    //  paymentHandler(dataPayload, seriesId);
    const res = await axiosPatch(`payment/payment_acc?ticketTableId=${seriesId}`, dataPayload)
    if (res.response) {
      // console.log(res.response)
      console.log(res.response)
    } else {
      console.log(res)
      Toast.show(res.massage)
      getSeriesData_withoutLoader()
    }
  };
  const getSeriesData_withoutLoader = async () => {
    const data = {
      params: {
        seriesId: id,
      },
    };
    const res = await axiosGet('ticket/ticket_list_get', data);
    // console.log(res)
    if (res.response) {
      console.log('getSeriesData------', res.response);
    } else {
      setSeriesId(res.data._id)
      var newarr = [];
      res.data.numberList.map((item) => {
        item.isSelected = false;
        newarr.push(item);
      });
      setAll_tickets(newarr);
      setPrice(res.data.price);
    }
  };

  const onRefresh = () => {
    SetRefreshing(true)
    Toast.show("Refreshing...")
    getSeriesData_withoutLoader()
    SetRefreshing(false)
  }
  return (
    <View style={globalStyles.mainContainer_withoutpadding}>
      <Custom_header back title={header} />

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
                    countTIcket() > 0 ? Colors.purple : Colors.lightpurple2,
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
                    color:
                      countTIcket() > 0 ? Colors.white : Colors.lightpurple,
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
