import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { globalStyles } from '../../../constant/StylePage';
import { Normalize } from '../../../constant/for_responsive/Dimens';
import { Colors } from '../../../constant/Colors';
import { few_constants } from '../../../constant/small_constant/Few_Constants';
import RazorpayCheckout from 'react-native-razorpay';
import Lottie from 'lottie-react-native';
import { images } from '../../../constant/Images';
import { addComma } from '../../../helper/AddComma';
import Custom_header from '../../../helper/Custom_header';
import Toast from 'react-native-simple-toast';
import {
  axiosPatch,
  modifiedAxiosPatch,
} from '../../../http/axios/CustomAxiosCall';
import LoaderPage from '../../../helper/components/LoaderPage';
import { razerPay, razerPayGetter } from '../../../helper/paymentHelper';
import { myContext } from '../../../helper/context/ContextPage';
import { getAxios } from '../../../services/getData';
import { baseUrlWithEndPoint } from '../../../services/BaseUrl/baseUrl';
import GenaralModel from '../../../commonModel/GenarelModal';
import EmptyScreen from '../../../components/EmptyScreen/EmptyScreen';
import ServerErrorModel from '../../../commonModel/ServerErrorModel';
import NotFoundModel from '../../../commonModel/NotFoundModel';
import { getDate } from '../../../helper/TimeRelatedFunc';

export default function TicketPurchase({ route }) {
  const { userDetails } = useContext(myContext);
  const { id, header } = route.params;
  const [all_tickets, setAll_tickets] = useState([]);
  const [price, setPrice] = useState('');
  const [serverErrorModal, setServerErrorModal] = useState(false);
  const [notFoundModal, setNotFoundModal] = useState(false);
  const [ticketTableId, setTicketTableId] = useState('');
  const [refreshing, SetRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  const userdata = JSON.parse(userDetails);
  const [paymentStateModal, setPaymentStateModal] = useState(false);
  const [paymentStage, setPaymentStage] = useState('no payment');
  const [paymentStageData, setpaymentStageData] = useState({
    content: '',
    lottie: '',
    buttonDisable: false,
    color: 'red',
  });
  const [seriesDetails, setSeriesDetails] = useState({
    seriesName: '',
    price: '',
    time: '',
    date: '',
  });
  const ServerErrorModalOpen = () => {
    setServerErrorModal(true);
  };
  const ServerErrorModalClose = () => {
    setServerErrorModal(false);
  };
  const NotFoundModalOpen = () => {
    setNotFoundModal(true);
  };
  const NotFoundModalClose = () => {
    setNotFoundModal(false);
  };

  const TicketSelectLogic = (valueArguments) => {
    if (valueArguments.isAlreadyBuy) {
      return [styles.sold_Ticket_box, styles.sold_Ticket_num];
    } else {
      if (valueArguments.isSelected) {
        return [styles.selected_Ticket_box, styles.selected_Ticket_num];
      } else {
        return [styles.unSelected_Ticket_box, styles.unSelected_Ticket_num];
      }
    }
  };
  const TicketSelectHandler = (valueArguments) => {
    let prev_arr = all_tickets;
    let new_arr = [];

    prev_arr.map((item, index) => {
      if (valueArguments._id == item._id) {
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
  const GetAllTicketDetails = async (valueArguments) => {
    setLoader(valueArguments != undefined ? true : false);
    const data = {
      params: {
        seriesId: id,
      },
    };

    const res = await getAxios(baseUrlWithEndPoint.home.getAllTickets, data);
    if (res.success) {
      setTicketTableId(res.data.data._id);
      const newarr = [];
      res.data.data.numberList.map((item) => {
        item.isSelected = false;
        newarr.push(item);
      });
      setSeriesDetails({
        seriesName: res.data.data.series.series,
        price: res.data.data.series.price,
        time: res.data.data.time,
        date: res.data.data.series.startTime,
      });
      setAll_tickets(newarr);
      setPrice(res.data.data.price);
    } else {
      setLoader(false);
      if (res.status === 500) return ServerErrorModalOpen();
      return NotFoundModalOpen();
    }
    setLoader(false);
  };

  const TicketBuyHandler = async () => {
    const ticketArrayData = ticketDataMapper();
    const dataPayload = {
      ticketData: ticketArrayData,
      ticketBuyer: userdata.userId,
    };
    const resSendData = await modifiedAxiosPatch(
      `payment/ticket_borrow?ticketTableId=${ticketTableId}`,
      dataPayload
    );

    if (resSendData.success) {
      setPaymentStateModal(true);
      setPaymentStage('payment brrow');
      const totalTicket = resSendData.data.data.length;
      if(totalTicket === 0){
        return NotFoundModalOpen()
      }

      const totalAmount = (totalTicket * 100 * price).toString();
      const razerPayData = {
        amount: totalAmount,
        name: userdata.name,
        email: userdata.email != '' ? userdata.email : 'abc@gmail.com',
        phone: userdata.phoneNo,
      };
      const result = razerPayGetter(razerPayData);
      RazorpayCheckout.open(result)
        .then((Result) => {
          if (Result.razorpay_payment_id) {
            OnPaymentSuccess(
              Result.razorpay_payment_id,
              resSendData.data,
              totalAmount
            );
            let cart_iniciator = [];
            resSendData.data.data.forEach((element) => {
              cart_iniciator.push({
                ticketNumber: element.ticketNumber,
                series: id,
              });
            });
            UserOrderUpdate(cart_iniciator, totalAmount);
            setTimeout(() => {
              setPaymentStage('payment Done');
            }, 2500);
          }
        })
        .catch((error) => {
          TicketBorrowHandler(resSendData.data);
          setPaymentStateModal(true);
          setPaymentStage('payment not Done');
        });
    } else {
      if (resSendData.status === 500) return ServerErrorModalOpen();
      return NotFoundModalOpen();
    }
  };

  const UserOrderUpdate = async (data, totalAmount) => {
    const dataPayload = {
      cartTicket: data,
      amount: totalAmount,
    };
    const res = await modifiedAxiosPatch(
      `cart/cart_update?userId=${userdata.userId}`,
      dataPayload
    );

    if (res.success) {
      GetAllTicketDetails();
    } else {
      if (resSendData.status === 500) return ServerErrorModalOpen();
      setPaymentStateModal(true);
      return setPaymentStage('payment not Done');
    }
  };

  const TicketBorrowHandler = async (resSendData) => {
    const dataPayload = {
      freshData: resSendData.data,
      ticketTableId: ticketTableId,
    };
    const res = await axiosPatch(`payment/ticket_remove`, dataPayload);
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

  const OnPaymentSuccess = async (razerpayId, resSendData, totalAmount) => {
    try {
      const ticketArrayData = resSendData;
      const dataPayload = {
        ticketData: ticketArrayData.data,
        razerpay: razerpayId,
        ticketBuyer: userdata.userId,
        amount: totalAmount,
      };

      const result = await modifiedAxiosPatch(
        `payment/payment_acc?ticketTableId=${ticketTableId}`,
        dataPayload
      );
      if (result.success) {
        // GetAllTicketDetails();
        setPaymentStateModal(true);
        setPaymentStage('payment after success');
      } else {
        if (resSendData.status === 500) return ServerErrorModalOpen();
        setPaymentStateModal(true);
        return setPaymentStage('payment not Done');
      }
    } catch (err) {
      setPaymentStateModal(true);
      return setPaymentStage('payment not Done');
    }
  };

  const PageRefress = () => {
    SetRefreshing(true);
    Toast.show('Refreshing...');
    GetAllTicketDetails();
    SetRefreshing(false);
  };

  const TotalAmoutCalculation = () => {
    let a = countTIcket() * price * 100;
    return a.toString();
  };

  const ImageChangeByTime = (valueArguments) => {
    switch (valueArguments) {
      case '1 PM':
        return images.ticket1PM;
      case '8 PM':
        return images.ticket8PM;
      default:
        return images.ticket;
    }
  };

  useEffect(() => {
    GetAllTicketDetails('withloader');
  }, [id]);
  useEffect(() => {
    switch (paymentStage) {
      case 'no payment':
        setpaymentStageData({
          content:
            'Your payment not done , if your Money deduce then we will refund !',
          lottie: require('../../../../assets/animation/payment-unsuccessful.json'),
          buttonDisable: false,
          color: 'red',
        });
        break;
      case 'payment brrow':
        setpaymentStageData({
          content: 'Payment Pre-processing ...',
          lottie: require('../../../../assets/animation/start-payment.json'),
          buttonDisable: true,
          color: 'blue',
        });
        break;
      case 'payment after success':
        setpaymentStageData({
          content: 'Payment done ,wait for a miniuts...',
          lottie: require('../../../../assets/animation/paymentstart.json'),
          buttonDisable: true,
          color: 'blue',
        });
      case 'payment Done':
        setpaymentStageData({
          content: 'Congatulation , Your payment Successfully done !',
          lottie: require('../../../../assets/animation/paymentcomplete.json'),
          buttonDisable: false,
          color: 'green',
        });
        break;
      case 'payment not Done':
        setpaymentStageData({
          content:
            'Your payment not done , if your Money deduce then we will refund !',
          lottie: require('../../../../assets/animation/payment-unsuccessful.json'),
          buttonDisable: false,
          color: 'red',
        });
        break;
      default:
        setpaymentStageData({
          content:
            'Your payment not done , if your Money deduce then we will refund !',
          lottie: require('../../../../assets/animation/payment-unsuccessful.json'),
          buttonDisable: false,
          color: 'red',
        });
    }
  }, [paymentStage]);
  return (
    <View style={globalStyles.mainContainer_withoutpadding}>
      <Custom_header back title={'Tickets'} />
      <ServerErrorModel
        modelOpen={serverErrorModal}
        onRequestClose={ServerErrorModalClose}
      />
      <NotFoundModel
        modelOpen={notFoundModal}
        onRequestClose={NotFoundModalClose}
      />
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
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Lottie
            style={{ width: 100 }}
            source={require('../../../../assets/animation/116489-meta-animation.json')}
            autoPlay={true}
          />
        </View>
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
                <RefreshControl
                  refreshing={refreshing}
                  PageRefress={PageRefress}
                />
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
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={ImageChangeByTime(seriesDetails.time)}
                      style={{
                        height: '75%',
                        width: '75%',
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
                        {seriesDetails.seriesName} Ticktes
                      </Text>
                      <Text
                        style={{
                          fontSize: Normalize(11),
                          fontFamily: 'Outfit-Medium',
                          color: Colors.blue,
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
                          {seriesDetails.time}
                        </Text>
                      </Text>

                      <Text
                        style={{
                          fontSize: Normalize(11),
                          fontFamily: 'Outfit-Medium',
                          color: Colors.blue,
                          paddingTop: Normalize(2),
                          letterSpacing: 0.5,
                        }}
                      >
                        Draw Date -{' '}
                        <Text
                          style={{
                            fontFamily: 'Outfit-SemiBold',
                            fontSize: Normalize(11.5),
                          }}
                        >
                          {getDate(seriesDetails.date)}
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

              {all_tickets.length >= 1 ? (
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
                      onPress={() => TicketSelectHandler(item)}
                      disabled={item.isAlreadyBuy}
                      key={index}
                      style={TicketSelectLogic(item)[0]}
                    >
                      <Text
                        numberOfLines={1}
                        style={TicketSelectLogic(item)[1]}
                      >
                        {item.ticketNumber}
                      </Text>
                      {item.isAlreadyBuy && (
                        <Text style={styles.sold_out_text}>Sold out</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    marginTop: Normalize(50),
                  }}
                >
                  <EmptyScreen />
                </View>
              )}
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
                onPress={TicketBuyHandler}
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
