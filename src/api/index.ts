import axios from 'axios';
import config from '../config/config';

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export {};