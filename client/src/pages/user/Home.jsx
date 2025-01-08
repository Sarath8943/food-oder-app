import React from "react";

export const Home = () => {
  return (
    <div>
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 min-h[600px]">

        <div className="flex flex-col justify-center gap-5 text-center md:text-left pt-24  md:p-0 scroll-pb-10"
        >
          <h1 className="text-4xl lg:text-6xl font-semibold">
            Delicious Food is Waiting For You
          </h1>
          <p className="">
            Delicious food is waiting for you! Indulge your taste buds with a
            variety of mouthwatering dishes crafted to perfection. Whether
            you're craving something savory, sweet, or spicy, our menu has
            something to satisfy every palate. Let the enticing aroma and
            vibrant flavors transport you to a world of culinary delight. Don’t
            wait—your next favorite meal is just a bite away!
          </p>
          <div className="flex justify-center md:justify-items-start">
            <button className="primary-btn hover:scale-105 duration-200">Food Menu</button>
          </div>
        </div>
        <div className=" flex flex-col justify-center">
          <img src="./image/food.jpg.webp" alt="" 
          className="animate-spin-slow img-shadow w-[400px] mx-auto"
          />
        </div>
      </div>
    </div>
  );
};
