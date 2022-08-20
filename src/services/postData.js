import axios from 'axios';

export const postAxios = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return {
      success: true,
      status: response.status,
      data: response.data,
    };
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
