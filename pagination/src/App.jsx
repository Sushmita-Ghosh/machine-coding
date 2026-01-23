import { useEffect, useState } from "react";
import "./App.css";
import { PAGE_SIZE } from "./constant";

export default function App() {
  /**STEP 1: Fetch the products and display on the UI */

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFetch = async () => {
    const fetchData = await fetch("https://dummyjson.com/products?limit=194");
    const jsonData = await fetchData.json();
    // console.log(jsonData);
    setProducts(jsonData.products);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  /** 2. Render 10products per page */

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = PAGE_SIZE + start;

  // console.log(currentPage, start, end);

  const ProductCard = (p) => {
    return (
      <div className="product">
        <img
          className="product-image"
          src={p.product.thumbnail}
          alt={p.product.title}
        />
        <p className="product-title">{p.product.title}</p>
      </div>
    );
  };

  const handlePageChange = (n) => {
    setCurrentPage(n);
  };

  const handlePrevChange = () => {
    console.log(currentPage);
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextChange = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Pagination Component</h1>
      {/* Pagination component */}
      <div className="pagination-component">
        {/* STEP 3: PREV & NEXT Buttons */}
        <div>
          <button
            disabled={currentPage === 0}
            className="pagination"
            onClick={handlePrevChange}
          >
            Prev
          </button>
        </div>
        {[...Array(noOfPages).keys()].map((n) => (
          <button
            className={`pagination ${currentPage === n && "active"}`}
            key={n}
            onClick={() => handlePageChange(n)}
          >
            {n + 1}
          </button>
        ))}
        <div>
          <button
            disabled={currentPage === noOfPages - 1}
            className="pagination"
            onClick={handleNextChange}
          >
            Next
          </button>
        </div>
      </div>
      {/* End of Pagination component */}

      {/* Products */}
      {!products.length ? (
        <></>
      ) : (
        <div className="products-container">
          {products.slice(start, end).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Products */}
    </div>
  );
}
