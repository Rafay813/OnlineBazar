
import React from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cartcontext';
const Productcart = ({product}) => {
  const navigate=useNavigate()
  const {addToCart,cartitem}=useCart()
  return (
    <div className='border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max'>
       <img 
         src={product.image} 
         alt={product.title} 
        className='bg-gray-100 w-full h-56 object-contain rounded-md'
       onClick={() => navigate(`/products/${product.id}`)}

      />
      <h1 className="p-1 font-semibold whitespace-nowrap overflow-hidden">
         {product.title}
      </h1>
       <p className='my-1 text-lg text-gray-800 font-bold'>${product.price}</p>
       <button onClick={()=>addToCart(product)} className='bg-red-500 px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold'>
        <IoCartOutline className='w-6 h-6'  /> Add to Cart
      </button>
    </div>
  );
}

export default Productcart;


// import React from 'react';
// import { IoCartOutline } from 'react-icons/io5';

// const Productcart = ({ product }) => {
//   return (
//     <div className='border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max'>
//       <img 
//         src={product.image} 
//         alt={product.title} 
//         className='bg-gray-100 w-full h-56 object-contain rounded-md'
//       />
//       <h1 className="p-1 font-semibold whitespace-nowrap overflow-hidden">
//         {product.title}
//       </h1>
//       <p className='my-1 text-lg text-gray-800 font-bold'>${product.price}</p>
      
//     </div>
//   );
// };

// export default Productcart;
