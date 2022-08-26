export const baseUrl = 'https://shrouded-fortress-54793.herokuapp.com/api/';

export const baseUrlWithEndPoint = {
  auth: {
    login: baseUrl + 'users/login',
    register: baseUrl + 'users/register',
  },
  home: {
    getAllSeries: baseUrl + 'ticket/series_get',
    result: baseUrl + 'result/result_get_all',
    getAllTickets: baseUrl + 'ticket/ticket_list_get',
    getAllBookingTickets: baseUrl + 'cart/get_data?userId=',
    ticket_borrow: baseUrl + 'payment/ticket_borrow?ticketTableId=',
    userDetails: baseUrl + 'users/getuser?userId=',
  },
  notice: {
    notice: baseUrl + 'notice/notice_get_all',
  },
  winner: {
    winner: baseUrl + 'winner/winner_get_all',
  },
  profile: {
    updateProfile:baseUrl+'users/updateUser?userId='
  },
};
