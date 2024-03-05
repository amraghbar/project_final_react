import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Products() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/products/category/${id}`);
      setCategories(data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      <h4>Category ID: {id}</h4>
      <ul>
        {categories.map((category,index) => (
          <div key={index}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            </div>
        ))}
      </ul>
    </>
  );
}

export default Products;
