import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_API
          }/products?page=${currentPage}&limit=${productsPerPage}`,{
          }
        );
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error: display an error message to the user
      }
    };

    fetchData();
    
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="container">
      <h1 className="text-center">Products</h1>
      <div className="row">
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card" style={{ width: "380px" }}>
                <img
                  src={product.mainImage.secure_url}
                  className="card-img-top"
                  alt={product.name}
                  style={{ width: "100%", height: "200px" }}
                  loading="lazy"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text" style={{ width: "100%" }}>
                    {product.description}
                  </p>
                  <p className="card-text">Price: ${product.price}</p>
                  <Link to={`/Categories/${product._id}/Produtc/${product._id}`}>
                    {" "}
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          <li className="page-item">
            <button
              className={`page-link ${currentPage === 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              1
            </button>
          </li>
          <li className="page-item">
            <button
              className={`page-link ${currentPage === 2 ? "active" : ""}`}
              onClick={() => setCurrentPage(2)}
              disabled={currentPage === 2}
            >
              2
            </button>
          </li>
          <li className="page-item">
            <button
              className={`page-link ${currentPage === 3 ? "active" : ""}`}
              onClick={() => setCurrentPage(3)}
              disabled={currentPage === 3}
            >
              3
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={nextPage}
              disabled={products.length < productsPerPage}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Products;
