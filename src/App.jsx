import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import axios from "axios";
import Footer from "./components/Footer";
import Singleproductpage from "./pages/Singleproductpage";
import Categoryproduct from "./components/Categoryproduct";
import { useCart } from "./context/Cartcontext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  // ✅ Yeh ab sahi hai

  const [mylocation, setlocation] = useState(null); // ✅ state yahan rakho
  const [opendropdown, setopendropdown] = useState(false);
  const { cartItem } = useCart()
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      // console.log("Coords:", latitude, longitude);

      const API_KEY = "pk.7275505d7c68134d6de3ce5a2f4daa40";
      const url = `https://us1.locationiq.com/v1/reverse?key=${API_KEY}&lat=${latitude}&lon=${longitude}&format=json`;

      try {
        const response = await axios.get(url);
        const exactLocation = response.data.address;
        // console.log("Location data:", exactLocation);
        setlocation(exactLocation); // ✅ state update
        setopendropdown(false);
      } catch (error) {
        console.error("Your error is:", error);
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);
//Load cart from local storage on initial render
  // useEffect(() => {
  //   const storedCart = localStorage.getItem('cartItem')
  //   if(storedCart){
  //     setCartItem(JSON.parse(storedCart))
  //   }
  // }, []);

// save cart to local storage whenever cartItem changes
useEffect(() => {
  localStorage.setItem("cartItem", JSON.stringify(cartItem));
}, [cartItem]);

  return (
    <BrowserRouter>
      <Navbar
        location={mylocation}
        setopendropdown={setopendropdown}
        opendropdown={opendropdown}
        getlocation={getLocation}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Singleproductpage />} />
        <Route path="/category/:category" element={<Categoryproduct />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<ProtectedRoute><Cart location={mylocation} getLocation={getLocation}/></ProtectedRoute>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
