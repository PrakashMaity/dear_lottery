import axios from 'axios';

export const getAxios = async (url) => {
  try {
    const response = await axios.get(url);
    return { success: true, status: response.status, data: response.data };
  } catch (error) {
    if (error.response)
      return {
        success: false,
        status: error.response.status,
        message: error.response,
      };
    else {
      return { success: false, status: 500 };
    }
  }
};
