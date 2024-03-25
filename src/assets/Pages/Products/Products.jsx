import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";

function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_API
          }/products?page=${currentPage}&limit=${productsPerPage}`
        );
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getData();
  }, [currentPage]);

  const handleSelectChange = async (value) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/products?page=${currentPage}&limit=${productsPerPage}&sort=${value}`
      );
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Products</h1>
      <div className="d-flex flex-wrap justify-content-between gap-3">
        <div className="mb-3 d-flex">
          <Select
            options={[
              { value: "name", label: "Name" },
              { value: "price", label: "Price" },
              { value: "discount", label: "Discount" },
              { value: "avgRating", label: "Stars" },
            ]}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption.value)
            }
            placeholder="Sort By"
            className="outline-danger"
          />
        </div>

        <div className="mb-3 d-flex gap-2">
          <form className="d-flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="bg-danger"
            />
            <button type="submit" className="btn btn-outline-danger shadow-xl">
              Search
            </button>
          </form>

          <form className="d-flex gap-2">
            <input
              type="number"
              placeholder="Min Price"
              className="bg-danger col-4 text-light"
            />
            <input
              type="number"
              placeholder="Max Price"
              className="text-light bg-danger col-4"
            />
            <button className="btn btn-outline-primary shadow-sm" type="submit">
              Apply
            </button>
          </form>

          <button type="reset" className="btn btn-danger text-light custom-class mb-2">
            Reset
          </button>
        </div>
      </div>
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
                    avgRating : {product.avgRating}
                  </p>
                  <p className="card-text">Price: ${product.price}</p>
                  <p className="card-text"> {product.discount}</p>
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
              onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[1, 2, 3].map((page) => (
            <li key={page} className="page-item">
              <button
                className={`page-link ${currentPage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
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
