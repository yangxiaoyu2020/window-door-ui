// src/components/OrderList.tsx

import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../api';
import config from '../config/config';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const ordersData = await fetchOrders();
        setOrders(ordersData);
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, []);

  return (
    orders
  );
};

export default OrderList;
