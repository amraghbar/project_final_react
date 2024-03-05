import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Link } from 'react-router-dom';

function Categories() {
  const [categories, setCategories] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API}/categories/active?page=1&limit=9`);
  
    setCategories(data.categories);
  };



  useEffect(() => {
    getData();
  }, []);

  
  return (
    <>
      <div style={{ paddingTop: '50px' }}>
      <h2 style={{ backgroundColor: '#f8c291', color: '#6a89cc', padding: '10px', borderRadius: '5px', marginTop: '20px',  textAlign: 'center' }}>Categories</h2>
    </div>
     <Swiper
       spaceBetween={40}
       slidesPerView={5.5} 
       pagination={{ clickable: true }}
      style={{ margin: '10px' }}
    >
      {categories.map((x) => (
        <SwiperSlide key={x.id}>
          <div>
            <h2>{x.name}</h2>
            <img src={x.image.secure_url} alt="" />
            <Link to={`/Products/${x._id}`}> Details</Link> 
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </>
  );
}

export default Categories;