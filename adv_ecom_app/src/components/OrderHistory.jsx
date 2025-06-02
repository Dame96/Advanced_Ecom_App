// OrderHistory.jsx
// This component fetches and displays the user's order history, allowing them to view details of each order.

import React, { useEffect, useState } from "react";
import { getUserOrders } from "../firebase/orderService";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <Link to={`/orders/${order.id}`}>
            <p>Order ID: {order.id}</p>
            <p>Total: ${order.total}</p>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
          </Link>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
