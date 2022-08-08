import axios from "axios";
export const paymentHandler=(payload)=>{
    const data = JSON.stringify(payload);
      
      const config = {
        method: 'patch',
        url: 'https://shrouded-fortress-54793.herokuapp.com/api/payment/payment_acc?ticketTableId=62efda44c8620b36d4185a46',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}