import React from "react";
import { useData } from "../context/Datacontext";

const Filtersection = ({
  search,
  setsearch,
  catagory,
  pricerange,
  setcatagory,
  handleCategoryChange,
  setpricerange,
}) => {
  const { categoryOnlyData, BrandOnlyData } = useData();
  return (
    <div className="bg-gray-100 hidden md:block h-max mt-10 p-4 rounded-md">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setsearch(e.target.value)}
        className="bg-white p-2 rounded-md border-gray-400 border-2"
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
          value={pricerange[1]}
          onChange={(e) =>
            setpricerange([pricerange[0], Number(e.target.value)])
          }
          min="0"
          max="5000"
        />
      </div>
      <button
        className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer"
        onClick={() => {
          setsearch("");
          setcatagory("All");
          setpricerange([0, 5000]);
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filtersection;

// import React from "react";
// import { useData } from "../context/Datacontext";

// const Filtersection = () => {
//   const { productsofCategory, productsofBrand } = useData();

//   return (
//     <div className="bg-gray-100 h-max mt-10 p-4 rounded-md">

//       <div className="flex flex-col gap-3 mt-4">
// {productsofCategory?.map((item, index) => {
//   return (
//     <div key={index} className="flex gap-2">
//       <input type="checkbox" />
//       <button>{item}</button>
//     </div>
//   );
// })}
//       </div>
//               {/* brnad data */}

//      <h1 className="mt-5 font-semibold text-4xl">Brand</h1>
// <div className="flex flex-col gap-3 mt-4">
//   {productsofBrand?.map((item, index) => {
//     return (
//       <div key={index} className="flex gap-2">
//         <input type="checkbox" />
//         <button>{item}</button>
//       </div>
//     );
//   })}
// </div>

//       <h1 className='mt-5 font-sembold text-xl mb-3'>Price Range</h1>
// <div className='flex flex-col gap-2'>
//     <label htmlFor="priceRange">Price Range: $0 - $5000</label>
//     <input type="range" name="priceRange" id="priceRange" min="0" max="5000" />
// </div>
// <button className='bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer'>Reset Filters</button>
// </div>
//   );
// };

// export default Filtersection;
