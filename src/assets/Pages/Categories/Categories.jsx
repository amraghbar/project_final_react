import React, { useEffect, useState } from 'react';
import axios from 'axios';


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

  return (
    <>
   
  {categories.map(x => (
    <div key={x.id}>
      <h2>{x.name}</h2>
      <img src={x.image.secure_url} alt="" />
    </div>
  ))}

      
    </>
  );
}

export default Categories;
