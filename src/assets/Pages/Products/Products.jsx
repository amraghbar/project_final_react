import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortValue, setSortValue] = useState("");

  const productsPerPage = 3;

  const totalNumberOfProducts = 8;
  const totalNumberOfPages = Math.ceil(totalNumberOfProducts / productsPerPage);
  const pages = Array.from({ length: totalNumberOfPages }, (_, i) => i + 1);
  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API
        }/products?page=${currentPage}&limit=${productsPerPage}&sort=${sortValue}&search=${searchValue}&price[gte]=${minPrice}&price[lte]=${maxPrice}`
      );
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getData();
  }, [currentPage]);

  const handleSelectChange = async (e) => {
    e.preventdefault();
    console.log(e);
    let seot = e;
    try {
      setSortValue(seot);
      setLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API
        }/products?page=${currentPage}&limit=10&sort=${sortValue}`
      );
      setProducts(data.products.slice(0, 3));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const DisplayHandleChange = (event) => {
    e.preventdefault();
    setLimt(event.target.value);
  };
  const handleSearch = async ( e) => {
    let seot = e;
    setSearchValue(seot);
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API
        }/products?page=${currentPage}&limit=10&sort=${sortValue}&search=${searchValue}`
      );
      setProducts(data.products.slice(0, 3));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePriceFilter = async () => {
    e.preventdefault();
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API
        }/products?page=${currentPage}&limit=10&sort=${sortValue}&search=${searchValue}&price[gte]=${minPrice}&price[lte]=${maxPrice}`
      );
      setProducts(data.products.slice(0, 3));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Products</h1>
      <div className="d-flex flex-wrap justify-content-between gap-3">
        <div>
          <form className="d-flex w-75 mb-2" role="number" onSubmit={getData}>
            <input
              className="form-control me-2 "
              type="number"
              placeholder="Display"
              aria-label="number"
              onChange={DisplayHandleChange}
            />
            <button className="btn btn-outline-success" type="submit">
              Diplay
            </button>
          </form>
        </div>
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
              onChange={handleSearch.value}
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
              onChange={handlePriceFilter}
            />
            <input
              type="number"
              placeholder="Max Price"
              className="text-light bg-danger col-4"
              onChange={handlePriceFilter}
            />
            <button className="btn btn-outline-primary shadow-sm" type="submit">
              Apply
            </button>
          </form>

          <button
            type="reset"
            className="btn btn-danger text-light custom-class mb-2"
          >
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
                  <div className="text-center">
                    {[...Array(Math.round(product.avgRating))].map(
                      (_, index) => (
                        <FontAwesomeIcon
                          icon={solidStar}
                          className="star"
                          key={index}
                          style={{ color: "red" }}
                        />
                      )
                    )}
                    {[...Array(5 - Math.round(product.avgRating))].map(
                      (_, index) => (
                        <FontAwesomeIcon
                          icon={regularStar}
                          className="star"
                          key={index}
                        />
                      )
                    )}
                  </div>
                  <p className="card-text">Price: ${product.price}</p>
                  <p className="card-text"> {product.discount}</p>
                  <Link
                    to={`/Categories/${product._id}/Product/${product._id}`}
                  >
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
          {pages.map((page) => (
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
