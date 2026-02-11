import { useEffect, useState, useRef } from "react";
import Post from "./Post";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // page index
  const limit = 3; // products per fetch

  /** skip => how many products to skip from top - for next batch */

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
          container.scrollHeight - 2 &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    container.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log("Page", page);
  console.log("products", data);

  const handleFetchProducts = async () => {
    setLoading(true);
    const res = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${limit * page}`,
    );
    const json = await res.json();
    const products = json.products;
    setData((prevData) => [...prevData, ...products]);
    setLoading(false); // stop loading **after fetch is done**
  };

  useEffect(() => {
    handleFetchProducts(); // can't write here as it's not async here
  }, [page]);

  return (
    <div>
      <h1 className="heading">Infinite Scroll</h1>
      <div className="post-div" ref={containerRef}>
        <Post data={data} />
      </div>

      {loading && <h1 style={{ textAlign: "center" }}>Loading...</h1>}
    </div>
  );
};

export default App;
