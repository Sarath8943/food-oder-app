import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "../user/Menu";

const API_URL = "http://localhost:4000/api/restaurant/get/all"; // Replace with your actual API URL

export const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-center py-24 px-5">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
        Order Your Favorite Food
      </h1>
      <p className="text-xl text-gray-100 mt-4 tracking-wide">
        Delicious meals from top restaurants
      </p>
      <div className="mt-6">
        <input
          type="text"
          placeholder="Search for restaurants..."
          className="p-3 w-full md:w-1/3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 focus:outline-none shadow-md transition-all duration-300"
        />
      </div>
    </div>
  );
};

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transform hover:scale-105 transition duration-300">
      <div className="overflow-hidden rounded-lg">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover rounded-lg transition duration-300 hover:brightness-110"
        />
      </div>
      <h3 className="mt-4 text-2xl font-bold text-gray-800">
        {restaurant.name}
      </h3>
      <p className="text-gray-500 text-sm mt-1">{restaurant.location}</p>
      <div className="flex items-center justify-between mt-4">
        <Link to={`/Menu/${restaurant._id}`}>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 shadow-md">
            View Menu
          </button>
        </Link>
      </div>
    </div>
  );
};

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        console.log("Fetching restaurants from API...");
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }
        const data = await response.json();
        console.log("Fetched data:", data);

        if (Array.isArray(data)) {
          setRestaurants(data);
        } else if (data && Array.isArray(data.restaurants)) {
          setRestaurants(data.restaurants);
        } else {
          throw new Error("Fetched data is not an arrya");
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading)
    return <p className="text-center mt-10">Loading restaurants...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="p-10 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Top Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export const Land = () => {
  return (
    <div>
      <HeroSection />
      <RestaurantList />
    </div>
  );
};
