import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const [userProfile, setUserProfile] = useState({});
  const [currentSection, setCurrentSection] = useState("basic");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

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

  const handleIorder = async () => {
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

  return (
    <div className="d-flex">
      <div className="collapse d-block sidebar collapse bg-white col-la-4 col-sm-3 col-xs-2">
        <div className="position-sticky d-block">
          <div className="list-group list-group-flush mx-3 mt-4">
            <SidebarItem
              text="Basic information"
              onClick={() => handleSectionChange("basic")}
            />
            <SidebarItem
              text="Email & PassWord"
              onClick={() => handleSectionChange("email-password")}
            />
            <SidebarItem text="Orders" onClick={handleIorder} />
          </div>
        </div>
      </div>

      <div className="col-9 col-la-8 col-md-5 col-sm-4">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {currentSection === "basic" && !loading && !error && (
          <BasicInformation user={userProfile} />
        )}
        {currentSection === "email-password" && !loading && !error && (
          <EmailPassword user={userProfile} />
        )}
        {currentSection === "orders" && !loading && !error && (
          <Orders orders={orders} />
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
function Orders({ orders }) {
  return (
    <div>
      <h2>Orders</h2>
      <table
        id="example"
        className="display table table-bordered table-striped"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th>Name Order</th>
            <th>Address</th>
            <th>phoneNumber</th>
            <th>Number of products</th>
            <th>couponName</th>
            <th>status</th>
            <th>finalPrice</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>
              Order {index + 1}
              </td>
              <td>{order.address}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.products.length}</td>
              <td>{order.couponName}</td>
              <td>{order.status}</td>
              <td>{order.finalPrice}$</td>
            </tr>
          ))}
        </tbody>
      </table>
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
