// OrderDetails.jsx
// This component fetches and displays details of a specific order based on the order ID from the URL parameters.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../firebase/orderService";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) return <p>Loading order...</p>;

  return (
    <div>
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Total:</strong> ${order.total}</p>
      <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      <h3>Items:</h3>
      <ul>
        {order.items.map((item, idx) => (
          <li key={idx}>
            {item.title} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
