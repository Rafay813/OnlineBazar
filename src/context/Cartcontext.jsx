import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const Cartcontext = createContext(null);

export const Cartprovider = ({ children }) => {
 const [cartItem, setCartItem] = useState(() => {
    const stored = localStorage.getItem("cartItem");
    return stored ? JSON.parse(stored) : [];
  });
  // ✅ Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItem");
    if (storedCart && storedCart !== "undefined") {
      setCartItem(JSON.parse(storedCart));
    }
  }, []);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  const addToCart = (product) => {
    const itemInCart = cartItem.find((item) => item.id === product.id);

    if (itemInCart) {
      // Increase quantity if already in cart
      const updatedCart = cartItem.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItem(updatedCart);
      toast.success("Product quantity increased!");
    } else {
      // Add new item with quantity 1
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success("Product is added to cart!");
    }
  };

  const updateQuantity = (productId, action) => {
    const updatedCart = cartItem
      .map((item) => {
        if (item.id === productId) {
          let newQty = item.quantity;
          if (action === "increase") {
            newQty++;
            toast.success("Quantity increased!");
          } else if (action === "decrease") {
            newQty--;
            toast.success("Quantity decreased!");
          }
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter((item) => item != null); // remove item if qty = 0

    setCartItem(updatedCart);
  };

  const deleteItem = (productId) => {
    setCartItem(cartItem.filter((item) => item.id !== productId));
    toast.success("Product removed from cart!");
  };

  return (
    <Cartcontext.Provider
      value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem }}
    >
      {children}
    </Cartcontext.Provider>
  );
};

export const useCart = () => useContext(Cartcontext);
