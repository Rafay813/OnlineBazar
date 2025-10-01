import React from "react";
import { useCart } from "../context/Cartcontext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";
import emptyCart from '../assets/empty-cart.png'
const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();
  const { user } = useUser();
  const navigate = useNavigate()

  const totalPrice = cartItem?.reduce((total, item) => total + item.price, 0);

  return (
    <div className="mt-10 mb-5 max-w-4xl mx-auto px-4 md:px-0">
      {cartItem?.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">MY CART({cartItem.length})</h1>
          <div>
            <div className="mt-10">
              {cartItem?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full bg-gray-100 mt-3 flex justify-between items-center rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 rounded-md   "
                      />
                      <div>
                        <h1 className="md:w-[300px] line-clamp-2">{item.title}</h1>
                        <p className="text-red-600 text-lg font-semibold">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                    <div className="bg-red-600 text-white text-xl rounded-md flex gap-3 p-2">
                      <button
                        onClick={() =>
                          updateQuantity(cartItem, item.id, "decrease")
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(cartItem, item.id, "increase")
                        }
                      >
                        +
                      </button>
                    </div>
                    <span
                      onClick={() => deleteItem(item.id)}
                      className="hover:bg-white/60 rounded-full transition-all p-3 hover:shadow-2xl"
                    >
                      <FaRegTrashAlt className="text-xl text-red-500 cursor-pointer" />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="bg-gray-200 rounded-md mt-5 p-7 space-y-3 ">
              <h1 className="text-gray-800 font-bold text-2xl">
                Delivery Info
              </h1>
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="p-2 rounded-md"
                  value={user?.fullName}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Full Address</label>
                <input
                  type="text"
                  placeholder="Enter your Address"
                  className="p-2 rounded-md"
                  value={location?.district}
                />
              </div>
              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">State</label>
                  <input
                    type="text"
                    placeholder="Enter your state"
                    className="p-2 rounded-md w-full"
                    value={location?.state}
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">PostCode</label>
                  <input
                    type="text"
                    placeholder="Enter your postcode"
                    className="p-2 rounded-md w-full"
                    value={location?.postcode}
                  />
                </div>
              </div>
              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">Country</label>
                  <input
                    type="text"
                    placeholder="Enter your Country"
                    className="p-2 rounded-md w-full"
                    value={location?.country}
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">Phone.No</label>
                  <input
                    type="text"
                    placeholder="Enter your Number"
                    className="p-2 rounded-md w-full"
                  />
                </div>
              </div>
              <button className="bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer">
                Submit
              </button>
              <div className="flex items-center justify-center w-full text-gray-700">
                ---------OR-----------
              </div>
              <div className="flex justify-center">
                <button
                  onClick={getLocation()}
                  className="bg-red-500 text-white px-3 py-2 cursor-pointer rounded-md"
                >
                  Detect Location
                </button>
              </div>
            </div>
            {/* bill details */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max">
              <h1 className="text-gray-800 font-bold text-xl">Bill details</h1>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <span>
                    <LuNotebookText />
                  </span>
                  Items total
                </h1>
                <p>{totalPrice}</p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <span>
                    <MdDeliveryDining />
                  </span>
                  Delivery Charge
                </h1>
                <p className="text-red-500 font-semibold">
                  <span className="text-gray-600 line-through">$25</span> FREE
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <span>
                    <GiShoppingBag />
                  </span>
                  Handling Charge
                </h1>
                <p className="text-red-500 font-semibold">$5</p>
              </div>
              <hr className="text-gray-200 mt-2" />
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Grand total</h1>
                <p className="font-semibold text-lg">${totalPrice + 5}</p>
              </div>
              <div>
                <h1 className="font-semibold text-gray-700 mb-3 mt-7">
                  Apply Promo Code
                </h1>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="p-2 rounded-md w-full"
                  />
                  <button className="bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md">
                    Apply
                  </button>
                </div>
              </div>
              <button className="bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
<div className="flex flex-col gap-3 justify-center items-center h-[600px]">
          <h1 className="text-red-500/80 font-bold text-5xl text-muted">
            Oh no! Your cart is empty
          </h1>
          <img src={emptyCart} alt="" className="w-[400px]" />
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer "
          >
            Continue Shopping
          </button>
        </div>      )}
    </div>
  );
};

export default Cart;
