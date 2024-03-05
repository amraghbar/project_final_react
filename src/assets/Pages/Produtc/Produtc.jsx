import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Produtc() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/products/${id}`
      );
      setProduct(data.product);
      console.log(data.product);
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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h4>Product ID: {id}</h4>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="col">
              <div className=" mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={product.mainImage.secure_url}
                      style={{ width: "100%", height: "81%" }}
                      className="img-fluid rounded-start"
                      alt={product.name}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      <p className="card-text">{product.slug}</p>
                      <p className="card-text">{product.price}$</p>
                      <p className="card-text">{product.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
  
}

export default Produtc;
