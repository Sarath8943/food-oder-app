import React from "react";
import img1 from "../../assets/img1.jpg";
import { Link } from "react-router-dom";
import Toplist from "../../compontes/user/Toplist";


export const Home = () => {
  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8  place-items-center text-center md:text-left px-5 ">
        <div className="flex flex-col justify-center gap-5  text-center md:text-left pt-24 md:p-0">
          <h1 className="text-3xl lg:text-6xl font-semibold text-gray-800">
            Delicious Food is Waiting For You
          </h1>
          <p className="font-semibold text-gray-800">
            Delicious food is waiting for you! Indulge your taste buds with a
            variety of mouthwatering dishes crafted to perfection. Whether
            you're craving something savory, sweet, or spicy, our menu has
            something to satisfy every palate. Let the enticing aroma and
            vibrant flavors transport you to a world of culinary delight. Don’t
            wait—your next favorite meal is just a bite away!
          </p>
          <div className="flex justify-center md:justify-items-start">
            <Link to="/resraurant">
              <button className="primary-btn hover:scale-105 duration-200">
                Food Menu
              </button>
            </Link>
          </div>
        </div>
        <div className=" flex flex-col justify-center">
          <img
            src={img1}
            alt=""
            className="animate-spin-slow img-shadow w-[500px] h-[500px] mx-auto rounded-full object-cover"
          />
        </div>
        <section className="my-16">
          <Toplist/>
        </section>
      </div>
    </div>
  );
};
