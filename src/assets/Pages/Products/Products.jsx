import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

function Products() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const getData = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/products/category/${id}`);
      setCategories(data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
   <h4>Category ID: {id}</h4>
      {loading ? (
        <p>Loading...</p>
      ) : categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {categories.map((category, index) => (
            <div key={index} className="col">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={category.mainImage.secure_url } style={{ width: '100%', height: '81%' }} className="img-fluid rounded-start" alt={category.name} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{category.name}</h5>
                      <p className="card-text">{category.description}</p>
                      <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                      <Link to={`Produtc/${category._id}`} class="btn btn-primary" >Go Details</Link>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Products;
