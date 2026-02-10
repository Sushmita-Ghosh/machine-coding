import { useEffect, useState } from "react";
import Post from "./Post";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleFetchProducts = async () => {
      const res = await fetch("https://dummyjson.com/products?limit=10");
      const json = await res.json();
      const products = json.products;
      setData((prevData) => [...prevData, ...products]);
    };

    handleFetchProducts();
  }, []);

  return (
    <div>
      <h1 className="heading">Infinite Scroll With InterSection Observer</h1>
      <Post data={data} />
    </div>
  );
};

export default App;
