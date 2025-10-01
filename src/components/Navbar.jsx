import { FactoryIcon, MapPin, ShoppingCart } from "lucide-react";
// import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { FaCaretDown } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { useCart } from "../context/Cartcontext";
import { useState } from "react";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = ({ location, setopendropdown, opendropdown, getlocation }) => {
  const [openNav, setOpenNav] = useState(false)
  const toggledropdown = () => {
    setopendropdown(!opendropdown);
  };
  const { cartItem } = useCart();

  return (
    <div className="bg-white py-3 shadow-2xl px-4 md:px-0">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* logo section */}
        <div className=" flex gap-7 items-center">
          <Link to={"/"}>
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">O</span>nline
              <span className="text-purple-500 font-serif">B</span>azar
            </h1>
          </Link>
          <div className="md:flex gap-1 text-gray-700 items-center hidden ">
            <MapPin className="text-red-500" />
            <span>
              {location ? (
                <div className=" -space-y-2">
                  <p>{location.country}</p>
                  <p>{location.state}</p>
                  <p>{location.city}</p>
                </div>
              ) : (
                "Add Adress"
              )}
            </span>
            <FaCaretDown className="cursor-pointer" onClick={toggledropdown} />
          </div>
          {opendropdown ? (
            <div className="w-[250px] shadow-2xl h-max left-60 top-16 border-2 z-50 bg-white fixed border-gray-100  p-5 rounded-md ">
              <h1 className="font-semibold mb-4 text-xl flex justify-between">
                Change location
                <span onClick={toggledropdown}>
                  <CgClose className="cursor-pointer" />
                </span>
              </h1>
              <button
                className="bg-red-500 hover:bg-red-400 rounded-md px-3 py-1 text-white cursor-pointer"
                onClick={getlocation}
              >
                Detect Location
              </button>
            </div>
          ) : null}
        </div>
        <nav className="flex gap-7 items-center">
          <ul className="md:flex gap-4 font-semibold items-center text-xl hidden">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-2 border-red-500 text-black-300 transition-all"
                    : "cursor-pointer"
                }`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-2 border-red-500 text-black-300 transition-all"
                    : "cursor-pointer"
                }`
              }
            >
              <li>Products</li>
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-2 border-red-500 text-black-300 transition-all"
                    : "cursor-pointer"
                }`
              }
            >
              <li>Contact</li>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-2 border-red-500 text-black-300 transition-all"
                    : "cursor-pointer"
                }`
              }
            >
              <li>About</li>
            </NavLink>
          </ul>
          <Link to={"/cart"} className="relative ">
            <ShoppingCart className="h-8 w-8" />
            <span className="bg-red-600 px-2.5 absolute rounded-full -top-3 -right-3 ">
              {cartItem.length}
            </span>
          </Link>
          <div className="hidden  md:block">
            <SignedOut>
              <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md  cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
           {
                        openNav ? <HiMenuAlt3 onClick={()=>setOpenNav(false)} className='h-7 w-7 md:hidden'/>:<HiMenuAlt1 
                        onClick={()=>setOpenNav(true)}
                        className='h-7 w-7 md:hidden'/>
            }
        </nav>
      </div>
                  <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav}/>

    </div>
  );
};

export default Navbar;
