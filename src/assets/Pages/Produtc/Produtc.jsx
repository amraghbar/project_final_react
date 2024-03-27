import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function Produtc() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const setAddCart = async (productId) => {
    const token = localStorage.getItem("userToken");
    const { data } = await axios.post(
      `${import.meta.env.VITE_API}/cart`,
      {
        productId,
      },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    if (data) {
      toast.success("تم الاضافة بنجاح ", {
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
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API}/products/${id}`
        );
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
          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="col">
              <div className="mb-3">
                <div className="row g-0">
                  <div className="col-md-4 p-2">
                    {product && product.mainImage && (
                      <>
                        <img
                          src={product.mainImage.secure_url}
                          style={{ width: "100%", height: "81%" }}
                          className="img-fluid rounded-start"
                          alt={product.name}
                        />
                      </>
                    )}
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{product?.name}</h5>
                      <p className="card-text">{product?.description}</p>
                      <p className="card-text">{product?.slug}</p>
                      <p className="card-text">{product?.price}$</p>
                      <p className="card-text">{product?.status}</p>
                      <div className="d-flex mb-3">
                        {product.subImages.map((image, index) => (
                          <img
                            key={index}
                            src={image.secure_url}
                            alt={`Product Image ${index + 1}`}
                            style={{
                              width: "100px",
                              height: "auto",
                              marginRight: "10px",
                            }}
                          />
                        ))}
                      </div>
                      <div
                        className="d-flex justify-content-center align-items-center p-2"
                      >
                        <button
                          onClick={() => setAddCart(product._id)}
                          className="btn btn-outline-primary"
                        >
                          Add to Cart
                        </button>
                        <Link to={`/products/${product._id}/review`} className="btn btn-outline-info">
                          Add Review
                        </Link>
                      </div>
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
