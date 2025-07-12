import axios from "axios";
import { createContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState();

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(
        "https://fakestoreapi.in/api/products?limit=150"
      );
      const extractData = res.data.products
      setData(extractData)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DataContext.Provider value={{ data, setData,fetchAllProducts }}>
      {children}
    </DataContext.Provider>
  );
};
