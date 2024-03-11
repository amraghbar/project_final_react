import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { cartItems } from '../Carts/Carshop.jsx';
import { Bounce, toast } from "react-toastify";

function Produtc() {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Initialize product state with null
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
   const setAddCart= (data)=> {
   const x=  cartItems.push(data);
    if(x) {
      toast.success('تم الاضافة بنجاح ', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API}/products/${id}`);
        setProduct(data.product);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h4>Product ID: {id}</h4>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="col">
              <div className="mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    {product && product.mainImage && ( // Check if product and product.mainImage exist before accessing their properties
                      <img
                        src={product.mainImage.secure_url}
                        style={{ width: "100%", height: "81%" }}
                        className="img-fluid rounded-start"
                        alt={product.name}
                      />
                    )}
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{product?.name}</h5> 
                      <p className="card-text">{product?.description}</p> 
                      <p className="card-text">{product?.slug}</p> 
                      <p className="card-text">{product?.price}$</p> 
                      <p className="card-text">{product?.status}</p> 
                      <div>
                        <button onClick={() => setQuantity(Math.max(0, quantity - 1))}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)}>+</button>
                      </div>
                      <button onClick={() => setAddCart({ ...product, quantity })}>
                        Add to Cart
                      </button>
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
