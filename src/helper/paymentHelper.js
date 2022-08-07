import RazorpayCheckout from 'react-native-razorpay';
import { razer_pay_token } from '../constant/authConstant';
import { Colors } from '../constant/Colors';

// const options = {
//   description: 'Credits towards consultation',
//   image: 'https://i.imgur.com/3g7nmJC.png',
//   currency: 'INR',
//   key: razer_pay_token, // Your api key
//   amount: '100',
//   name: 'Prakash Maity',
//   prefill: {
//     email: 'prakashmaity62@gmail.com',
//     contact: '9609430604',
//     name: 'Razorpay Software',
//   },
//   theme: { color: Colors.purple },
// };



export const razerPayGetter = (client_data) => {
  const options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: razer_pay_token, // Your api key
    amount: client_data.amount.toString(),
    name: client_data.name,
    prefill: {
      email: client_data.email,
      contact: client_data.phone,
      name: client_data.name,
    },
    theme: { color: Colors.purple },
  };
  return options;
};
// export const razerPay = (client_data) => {
//   RazorpayCheckout.open(razerPayGetter(client_data))
//     .then((data) => {
//         return data;
//     })
//     .catch((error) => {});
// };
