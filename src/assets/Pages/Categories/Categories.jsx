import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

function Categories() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(`https://ecommerce-node4.vercel.app/categories/active?page=1&limit=9`);
    setCategories(data.categories);
  };

  const searchGetData = async () => {
    const { data } = await axios.get(`https://dummyjson.com/products/search?q=${searchQuery}`);
    setCategories(data.categories);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      searchGetData();
    } else {
      getData();
    }
  }, [searchQuery]);

  return (
    <>
      <div style={{ paddingTop: '50px' }}>
      <h2 style={{ backgroundColor: '#f8c291', color: '#6a89cc', padding: '10px', borderRadius: '5px', marginTop: '20px',  textAlign: 'center' }}>Categories</h2>
    </div>
     <Swiper
       spaceBetween={40}
       slidesPerView={5.5} 
       loop={true}
       pagination={{ clickable: true }}
      style={{ margin: '10px' }}
    >
      {categories.map((x) => (
        <SwiperSlide key={x.id}>
          <div>
            <h2>{x.name}</h2>
            <img src={x.image.secure_url} alt="" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </>
  );
}

export default Categories;
