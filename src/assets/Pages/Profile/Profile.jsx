import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./pro.css";
function Profile() {
  const [userProfile, setUserProfile] = useState({});
  const [currentSection, setCurrentSection] = useState("basic");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const profileResponse = await axios.get(
        `${import.meta.env.VITE_API}/user/profile`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setUserProfile(profileResponse.data.user);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch profile data");
      setLoading(false);
    }
  };

  const handleFetchOrders = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const orderResponse = await axios.get(
        `${import.meta.env.VITE_API}/order`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setOrders(orderResponse.data.orders);
      setCurrentSection("orders");
    } catch (error) {
      setError("Failed to fetch order data");
    }
  };

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {/* Sidebar */}
      <div className="collapse d-block sidebar collapse bg-white col-lg-4 col-md-3 col-sm-2 d-flex flex-wrap">
        <div className="position-sticky d-block d-flex flex-wrap">
          <div className="list-group list-group-flush mx-3 mt-4">
            <SidebarItem
              text="Basic information"
              onClick={() => handleSectionChange("basic")}
            />
            <SidebarItem
              text="Email & Password"
              onClick={() => handleSectionChange("email-password")}
            />
            <SidebarItem text="Orders" onClick={handleFetchOrders} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" col-12 col-lg-4 col-md-9 col-sm-10 col-xs-12 d-flex flex-wrap">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {currentSection === "basic" && !loading && !error && (
          <BasicInformation user={userProfile} />
        )}
        {currentSection === "email-password" && !loading && !error && (
          <EmailPassword user={userProfile} />
        )}
        {currentSection === "orders" && !loading && !error && (
          <Orders orders={orders} handleFetchOrders={handleFetchOrders} />
        )}
      </div>
    </div>
  );
}

function SidebarItem({ text, onClick }) {
  return (
    <a
      href="#"
      className="list-group-item list-group-item-action py-2 ripple"
      onClick={onClick}
    >
      <span>{text}</span>
    </a>
  );
}

function Orders({ orders, handleFetchOrders }) {
  const handleDeleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.patch(
        `${import.meta.env.VITE_API}/order/cancel/${orderId}`,
        null,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Order deleted successfully");
        handleFetchOrders();
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const confirmDeleteOrder = (orderId) => {
    if (window.confirm("هل أنت متأكد أنك تريد حذف الطلب؟")) {
      handleDeleteOrder(orderId);
    }
  };

  return (
    <div className="col-12 d-flex flex-wrap">
      <h2>Orders</h2>
      <div id="table-responsive">
        <table
          id="table"
          className="display table table-bordered table-striped"
        >
          <thead>
            <tr>
              <th>Name Order</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Number of Products</th>
              <th>Coupon Name</th>
              <th>Status</th>
              <th>Final Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>Order {index + 1}</td>
                <td>{order.address}</td>
                <td>{order.phoneNumber}</td>
                <td>{order.products.length}</td>
                <td>{order.couponName}</td>
                <td>{order.status}</td>
                <td>{order.finalPrice}$</td>
                <td>
                  {order.status === "pending" && (
                    <button onClick={() => confirmDeleteOrder(order._id)}>
                      حذف الطلب
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BasicInformation({ user }) {
  return (
    <div className="col-12 col-xl-8 col-la-4 cpl-md-3 col-sm-2">
      <h2>Basic Information</h2>
      {user.image && user.image.secure_url ? (
        <>
          <img src={user.image.secure_url} alt="Profile" />
          <h4>Name: {user.userName}</h4>
        </>
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
}

function EmailPassword({ user }) {
  return (
    <div className="col-12 col-xl-8  col-la-4 cpl-md-3 col-sm-2">
      <h2>Email & Password</h2>
      <p>Email: {user.email}</p>
      <p>changePasswordTime: {user.changePasswordTime}</p>
      <Link to="/sendcode" className="btn btn-outline-success">
        Change Password
      </Link>
    </div>
  );
}

export default Profile;
