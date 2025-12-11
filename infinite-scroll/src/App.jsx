import { useEffect, useState } from "react";
import "./App.css";
import CryptoList from "./components/CryptoList";
import axios from "axios";

const App = () => {
  const [coinsData, setCoinsData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false`
      );
      setCoinsData(response.data);
    }

    fetchData();
  }, []);
  return (
    <div className="app">
      <h1>Crypto Gallery</h1>
      <CryptoList coinsData={coinsData} />
    </div>
  );
};

export default App;
