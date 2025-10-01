import React from "react";
import { FaFilter } from "react-icons/fa";
import { useData } from "../context/Datacontext";

const Mobilefilter = ({openFilter, setOpenFilter, search,
  setsearch,
  catagory,
  pricerange,
  setcatagory,
  handleCategoryChange,
  setpricerange,}) => {
      const toggleFilter = ()=>{
        setOpenFilter(!openFilter)
    }
      const { categoryOnlyData, BrandOnlyData } = useData();
    
  return (
    <div>
      <>
        <div className="bg-gray-100 flex justify-between items-center md:hidden px-4 p-2 mt-5">
          <h1 className="font-semibold text-xl">Filters</h1>
          <FaFilter onClick={toggleFilter} className="text-gray-800" />
        </div>
      </>
      {
        openFilter?<div className='bg-gray-100 p-2 md:hidden'>
          <input type="text"
                        placeholder='Search..'
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                        className='bg-white p-2 rounded-md border-gray-400 border-2 w-full'
                    />
                    {/* category data */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-3 mt-4">
        {categoryOnlyData?.map((item, index) => {
          return (
            <div key={index} className="flex gap-2">
              <input
                type="checkbox"
                name={item}
                checked={catagory === item}
                value={item}
                onChange={handleCategoryChange}
              />
              <button>{item.toUpperCase()}</button>
            </div>
          );
        })}
      </div>
      <h1 className="mt-5 font-sembold text-xl mb-3">Price Range</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="priceRange">
          ${pricerange[0]} - ${pricerange[1]}
        </label>
        <input
          type="range"
          name="priceRange"
          id="priceRange"
          className="w-[200px] flex justify-center items-center"
          value={pricerange[1]}
          onChange={(e) =>
            setpricerange([pricerange[0], Number(e.target.value)])
          }
          min="0"
          max="5000"
        />
      </div>
      <button
        className="bg-red-500 text-white rounded-md px-4 py-0.5 mt-5 cursor-pointer"
        onClick={() => {
          setsearch("");
          setcatagory("All");
          setpricerange([0, 5000]);
        }}
      >
        Reset Filters
      </button>
        </div>:null
      }
    </div>
  );
};

export default Mobilefilter;
