
import React from 'react';

function Order({ location }) {
  const { cartItems } = location.state;


  return (
    <div>
      <h1>Order Summary</h1>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item.details.name} - {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
}

export default Order;
