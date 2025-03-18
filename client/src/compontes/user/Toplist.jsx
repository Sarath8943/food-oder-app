import React from "react";
import img2 from "../../assets/cooking.webp";
import img3 from "../../assets/cooking.jpg"
import img4 from "../../assets/alfam.jpg"



export default function Toplist() {
  const foods = [
    { img: img2, name: "Grilled Fish", rating: 4.5, discount: "20% Off" },
    { img: img3, name: "Chiken Biriyani", rating: 4.7, discount: "15% Off" },
    { img: img4, name: "Alfam BBQ", rating: 4.8, discount: "10% Off" },
  ];

  return (
    <div className="text-black text-center py-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Top List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
        {foods.map((food, index) => (
          <div key={index} className="relative group bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105">
            <img
              src={food.img}
              alt={food.name}
              className="w-48 h-48 rounded-full object-cover shadow-md transition group-hover:brightness-110"
            />
            <h3 className="mt-4 text-lg font-semibold text-gray-800">{food.name}</h3>
            <p className="text-yellow-500 font-bold text-lg">
              {"⭐".repeat(Math.floor(food.rating))} ({food.rating})
            </p>
            <p className="text-red-500 text-sm font-medium mt-1">{food.discount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}