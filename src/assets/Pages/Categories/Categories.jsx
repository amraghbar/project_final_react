import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API}/categories/active?page=1&limit=9`
    );

    setCategories(data.categories);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div style={{ paddingTop: "50px" }}>
        <h2
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Categories
        </h2>
      </div>
      <Swiper
        spaceBetween={40}
        slidesPerView={3.6}
        pagination={{ clickable: true }}
        style={{ margin: "10px" }}
      >
        {categories.map((x) => (
          <SwiperSlide key={x.id}>
            <div className="row justify-content-center align-items-center">
              <h2>{x.name}</h2>
              <img
                src={x.image.secure_url}
                alt=""
                style={{ width: "200px", height: "200px" }}
              />
              <Link
                className="btn btn-outline-dark text-decoration-none text-dark"
                to={`/Categories/${x._id}`}
                style={{
                  backgroundColor: "red",
                  borderColor: "blue",
                  color: "white",
                }}
              >
                Details
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Categories;
