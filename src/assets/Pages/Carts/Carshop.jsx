// Carshop.js
import React from "react";
import { Offcanvas } from "react-bootstrap";
export const cartItems = [];
function Carshop({ show, handleClose }) {
  console.log(cartItems);
  return (
    cartItems.length === 0 ? ( // Check if cartItems is an empty array
          <p>لا توجد عناصر في السلة</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index}>
              <p>{item.name}</p>
            </div>
          ))
        )
  );
}

export default Carshop;
