import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
} from "@mui/material";
import { Button } from "@mui/material/legacy";
import "./Cartshop.css";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function Carshop() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const controller = new AbortController();
  const getDataCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setCartItems(data.products);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    getDataCart();
    return () => {};
  }, []);

  const handleIncrement = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API}/cart/incraseQuantity`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      const updatedCartItems = cartItems.map((item) =>
        item.details._id === productId
          ? {
              ...item,
              quantity: data.cart.products.find(
                (p) => p.productId === productId
              ).quantity,
            }
          : item
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };

  const handleDecrement = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API}/cart/decraseQuantity`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      const updatedCartItems = cartItems.map((item) => {
        if (item.details._id === productId) {
          const updatedQuantity = Math.max(
            1,
            data.cart.products.find((p) => p.productId === productId).quantity
          ); // Ensure quantity is at least 1
          return {
            ...item,
            quantity: updatedQuantity,
          };
        } else {
          return item;
        }
      });
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.patch(
        `${import.meta.env.VITE_API}/cart/removeItem`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      const updatedCartItems = cartItems.filter(
        (item) => item.details._id !== productId
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleIClera = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.patch(`${import.meta.env.VITE_API}/cart/clear`, null, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
  const itemCount = cartItems.length;
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.details.price * item.quantity;
  }, 0);
  function handleCheckoutClick(cartItems) {
    toast.success('اكمل   ', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
    console.log(" cart items:", cartItems);
  }

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol size="12">
            <MDBCard
              className="card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <MDBCardBody className="p-0">
                <MDBRow className="g-0">
                  <MDBCol lg="9">
                    <div className="p-4">
                      <div className="d-flex flex-column flex-wrap md-5">
                        <MDBTypography
                          tag="h1"
                          className="fw-bold mb-0 text-black"
                        >
                          Shopping Cart
                        </MDBTypography>
                        <div className="mb-0 text-muted wit">
                          {isLoading ? (
                            <p>Loading...</p>
                          ) : (
                            <>
                              {cartItems.length === 0 ? (
                                <p>لا توجد عناصر في السلة</p>
                              ) : (
                                <TableContainer
                                  component={Paper}
                                  className="tablecart"
                                >
                                  <Table
                                    aria-label="cart items table"
                                    className="tablecart"
                                  >
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell>Remove</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {cartItems.map((item) => (
                                        <TableRow key={item.details._id}>
                                          <TableCell>
                                            <img
                                              src={
                                                item.details.mainImage
                                                  .secure_url
                                              }
                                              alt={item.details.name}
                                            />
                                          </TableCell>
                                          <TableCell>
                                            ${item.details.name}
                                          </TableCell>
                                          <TableCell>
                                            ${item.details.price}
                                          </TableCell>
                                          <TableCell>
                                            <Button
                                              onClick={() =>
                                                handleDecrement(
                                                  item.details._id
                                                )
                                              }
                                            >
                                              -
                                            </Button>
                                            ${item.quantity}
                                            <Button
                                              onClick={() =>
                                                handleIncrement(
                                                  item.details._id
                                                )
                                              }
                                            >
                                              +
                                            </Button>
                                          </TableCell>
                                          <TableCell>
                                            $
                                            {item.details.price * item.quantity}
                                          </TableCell>
                                          <TableCell>
                                            <Button
                                              onClick={() =>
                                                handleRemoveItem(
                                                  item.details._id
                                                )
                                              }
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                fill="black"
                                                className="bi bi-x-circle"
                                                viewBox="0 0 16 16"
                                              >
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                              </svg>
                                            </Button>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                    <TableFooter>
                                      <TableRow>
                                        <TableCell colSpan={6} align="right">
                                          <Button
                                            onClick={handleIClera}
                                            className="btn-outline-danger"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="20"
                                              height="20"
                                              fill="red"
                                              className="bi bi-trash"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                            </svg>
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    </TableFooter>
                                  </Table>
                                </TableContainer>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol lg="3" className="bg-grey">
                    <div className="p-5">
                      <MDBTypography
                        tag="h3"
                        className="fw-bold mb-5 mt-2 pt-1"
                      >
                        Summary
                      </MDBTypography>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <MDBTypography tag="h5" className="text-uppercase">
                          items: {itemCount}
                        </MDBTypography>
                      </div>

                      <MDBTypography tag="h5" className="text-uppercase mb-3">
                        Give code
                      </MDBTypography>

                      <div className="mb-5">
                        <MDBInput size="lg" label="Enter your code" />
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Total price
                        </MDBTypography>
                        <MDBTypography tag="h5">{totalPrice}$</MDBTypography>
                      </div>

                      <MDBBtn color="red" block size="lg">
                        <Link
                          to="/Order"
                
                          state={{ cartItems }}
                          
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            textDecoration: "none",
                            padding: "8px 16px",
                            borderRadius: "4px",
                          }}
                          onClick={() => handleCheckoutClick(cartItems)}
                        >
                          CheckOut
                        </Link>
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default Carshop;
