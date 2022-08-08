import axios from "axios";
export const paymentHandler = (payload, seriesId) => {
  const data = JSON.stringify(payload);
  const config = {
    method: 'patch',
    url: `https://shrouded-fortress-54793.herokuapp.com/api/payment/payment_acc?ticketTableId=${seriesId}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    });
}