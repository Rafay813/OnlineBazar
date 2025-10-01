import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const Datacontext = createContext({});

export const Dataprovider = ({ children }) => {
  const [data, setdata] = useState([]);

  // ✅ Fetch FakeStore products
 const getingallproducts = async () => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products?limit=150");
    setdata(res.data); // API direct array return karti hai
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};


  // ✅ unique categories
  const getUniqueCategory = (data, property) =>{
  let newVal = data?.map((curElem) =>{
    return curElem[property]
  })
  newVal = [ "All",...new Set(newVal)]
  return newVal
}



const categoryOnlyData = getUniqueCategory(data, "category")
const BrandOnlyData=getUniqueCategory(data, "category")
  useEffect(() => {
    getingallproducts();
  }, []);


     

  // ✅ FakeStore API has no brand → fallback

  return (
    <Datacontext.Provider
      value={{
        data,
        setdata,
        getingallproducts,
        BrandOnlyData,
        categoryOnlyData
        // productsofBrand,
      }}
    >
      {children}
    </Datacontext.Provider>
  );
};

export const useData = () => {
  return useContext(Datacontext);
};
