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

      const getUniqueCategory = (data,property) =>{
        let newVal = data?.map((cur)=>{
            return cur[property];
        })
        newVal = ["ALL",... new Set(newVal)]
        return newVal;
    }

    const categoryOnlyData = getUniqueCategory(data,'category');
    const brandOnlyData = getUniqueCategory(data,'brand')

  return (
    <DataContext.Provider value={{ data, setData,fetchAllProducts, categoryOnlyData,brandOnlyData }}>
      {children}
    </DataContext.Provider>
  );
};
