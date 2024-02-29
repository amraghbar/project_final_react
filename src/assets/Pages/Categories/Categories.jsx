import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';

function Categories() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);

  const swiperParams = {
    slidesPerView: 'auto',
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    } // Remove the semicolon here
  };

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
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Swiper {...swiperParams}>
        {categories.map(x => (
          <div key={x.id}>
            <h2>{x.name}</h2>
            <img src={x.image.secure_url} alt="" />
          </div>
        ))}
      </Swiper>
    </>
  );
}

export default Categories;
