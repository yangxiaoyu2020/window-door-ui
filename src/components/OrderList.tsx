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
    <div>
      <h2>Order List</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>{order.name}</li>
        ))}
      </ul>
      <p>API base URL: {config.API_BASE_URL}</p>
    </div>
  );
};

export default OrderList;
