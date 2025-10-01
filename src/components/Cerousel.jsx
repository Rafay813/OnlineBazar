import React, { useContext, useEffect } from "react";
import { Datacontext } from "../context/Datacontext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Catagory from "./Catagory";

const Cerousel = () => {
  const { data, getingallproducts } = useContext(Datacontext);

  useEffect(() => {
    getingallproducts();
  }, []);
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className}`}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowLeft
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            left: "45px",
          }}
        />
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className}`}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowRight
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "1px",
            right: "45px",
          }}
        />
      </div>
    );
  };

  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
  };

  return (
    <div>
      <Slider {...settings}>
        {data?.slice(0, 7).map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]"
          >
            <div className="flex flex-col md:flex-row  justify-center items-center h-[600px] my-20 md:my-0 gap-10 px-4">
              <div className="md:space-y-6 space-y-3">
                <h3 className="text-red-400 text-sm font-sans font-semibold">
                  Powering your
                </h3>
                <h1 className="font-bold text-xl md:text-4xl line-clamp-2 md;line-clamp-3 uppercase text-white md:w-[500px]">
                  {item.title}
                </h1>
                <p className="line-clamp-3 uppercase text-gray-400 pr-7 md:w-[500px]">
                  {item.description}
                </p>
                <button className="bg-gradient-to-r flex-wrap from-red-500 to-purple-500 px-3 py-2 text-white cursor-pointer mt-2 rounded-md">
                  Shop Now
                </button>
              </div>
              <div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-full w-[400px]  h-[450px] hover:scale-105 transition-all bg-gray-300 shadow-2xl shadow-red-200"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <Catagory/>
    </div>
  );
};

export default Cerousel;
