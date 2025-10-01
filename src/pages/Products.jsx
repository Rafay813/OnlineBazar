import React, { useEffect, useState } from "react";
import { useData } from "../context/Datacontext";
import Filtersection from "../components/Filtersection";
import Loading from "../assets/Loading4.webm";
import Productcart from "../components/Productcart";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";
import Mobilefilter from "../components/Mobilefilter";
const Products = () => {
  const { data, getingallproducts } = useData();
  const [search, setsearch] = useState("");
  const [catagory, setcatagory] = useState("All");
  const [pricerange, setpricerange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  console.log(data);
  useEffect(() => {
    getingallproducts();
    window.scrollTo(0, 0);
  }, []);
  const handleCategoryChange = (e) => {
    setcatagory(e.target.value);
    setPage(1);
    setOpenFilter(false)
  };
  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0,0)
  };
  const filteredData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (catagory === "All" || item.category === catagory) &&
      item.price >= pricerange[0] &&
      item.price <= pricerange[1]
  );
  const dynamicPage = Math.max(1, Math.ceil(filteredData?.length / 8));

  return (
    <div>
      <div className="max-w-6xl mx-auto mb-10 px-4">
        <Mobilefilter
          setOpenFilter={setOpenFilter}
          search={search}
          setsearch={setsearch}
          catagory={catagory}
          pricerange={pricerange}
          setcatagory={setcatagory}
          setpricerange={setpricerange}
          handleCategoryChange={handleCategoryChange}
          openFilter={openFilter}
        />
        {data?.length > 0 ? (
          <>
            <div className="flex gap-8">
              <Filtersection
                search={search}
                setsearch={setsearch}
                catagory={catagory}
                pricerange={pricerange}
                setcatagory={setcatagory}
                setpricerange={setpricerange}
                handleCategoryChange={handleCategoryChange}
              />
              {filteredData?.length > 0 ? (
                <div className="flex flex-col justify-center items-center">
                  <div className="grid grid-cols-2  md:grid-cols-4 mt-10 gap-1.5 md:gap-7">
                    {filteredData
                      ?.slice(page * 8 - 8, page * 8)
                      .map((product, index) => {
                        return <Productcart key={index} product={product} />;
                      })}
                  </div>
                  <Pagination
                    pageHandler={pageHandler}
                    page={page}
                    dynamicPage={dynamicPage}
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center md:h-[600px] md:w-[900px] mt-10">
                  <Lottie animationData={notfound} classID="w-[500px]" />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex h-[400px] justify-center items-center">
            <video muted autoPlay loop>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
