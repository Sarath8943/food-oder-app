import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// MenuCard component to display each menu item.
const MenuCard = ({ item }) => {
  return (
    <div className="border rounded-lg p-4 shadow-lg bg-white w-64">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-lg font-bold mt-2">{item.name}</h2>
      <p className="text-gray-600 text-sm">{item.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-green-600 font-semibold">${item.price}</span>
        <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
          Order
        </button>
      </div>
    </div>
  );
};

export const Menu = () => {
  const { id } = useParams(); // Get the restaurant ID from the URL
  console.log(id);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/restaurant/${id}`);
        console.log(response.data);
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant data");
          
        }
        const data = await response.json();
        console.log(data)
        setRestaurant(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [id]); // Only refetch if the ID changes

  if (loading) return <p className="text-center mt-10">Loading menu...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {restaurant?.menuItems && restaurant.menuItems.length > 0 ? (
  <div>
    <h1 className="text-2xl font-bold text-center">{restaurant.name}</h1>
    <p className="text-center text-gray-600">{restaurant.location}</p>
    <div className="flex flex-wrap gap-6 p-6 justify-center">
      {restaurant.menuItems.map((item, index) => (
        <MenuCard key={index} item={item} />
      ))}
    </div>
  </div>
) : (
  <p className="text-center">No menu available.</p>
)}

    </div>
  );
};


































// import React, { useEffect, useState } from "react";

// import { useParams } from "react-router-dom";

// const API_URL = "http://localhost:4000/api/restaurant/:id"; // Adjust API endpoint

// // const RestaurantCard = ({ restaurant, onViewMenu }) => {
// //   return (
// //     <div className="border rounded-lg p-4 shadow-lg bg-white w-64">
// //       <h2 className="text-lg font-bold">{restaurant.name}</h2>
// //       <p className="text-gray-600 text-sm">{restaurant.details}</p>
// //       <button
// //         className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mt-2"
// //         onClick={() => onViewMenu(restaurant.id)}
// //       >
// //         View Menu
// //       </button>
// //     </div>
// //   );
// // };

// const MenuCard = ({ item }) => {
//   return (
//     <div className="border rounded-lg p-4 shadow-lg bg-white w-64">
//       <img
//         src={item.image}
//         alt={item.name}
//         className="w-full h-40 object-cover rounded-md"
//       />
//       <h2 className="text-lg font-bold mt-2">{item.name}</h2>
//       <p className="text-gray-600 text-sm">{item.description}</p>
//       <div className="flex justify-between items-center mt-2">
//         <span className="text-green-600 font-semibold">${item.price}</span>
//         <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
//           Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export const Menu = () => {
//   const { id } = useParams();
//   const [restaurant, setRestaurant] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const response = await fetch(`${restaurant}/${id}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch menu");
//         }
//         const data = await response.json();
//         setRestaurant(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenu();
//   }, [id]);

//   if (loading) return <p className="text-center mt-10">Loading menu...</p>;
//   if (error)
//     return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       {!selectedRestaurant ? (
//         <div className="flex flex-wrap gap-6 justify-center">
//           {restaurants.map((restaurant) => (
//             <RestaurantCard
//               key={restaurant.id}
//               restaurant={restaurant}
//               onViewMenu={handleViewMenu}
//             />
//           ))}
//         </div>
//       ) : (
//         <div>
//           <h1 className="text-2xl font-bold text-center">
//             {selectedRestaurant.name}
//           </h1>
//           <p className="text-center text-gray-600">
//             {selectedRestaurant.details}
//           </p>
//           <div className="flex flex-wrap gap-6 p-6 justify-center">
//             {selectedRestaurant.menu.map((item, index) => (
//               <MenuCard key={index} item={item} />
//             ))}
//           </div>
//           <button
//             className="block mx-auto bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//             onClick={() => setSelectedRestaurant(null)}
//           >
//             Back to Restaurants
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // import React, { useEffect, useState } from "react";

// // const API_URL = "http://localhost:4000/api/restaurant/restaurantId"; // Replace with your actual API URL

// // const RestaurantCard = ({ restaurant, onViewMenu }) => {
// //   return (
// //     <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transform hover:scale-105 transition duration-300">
// //       <div className="overflow-hidden rounded-lg">
// //         <img
// //           src={restaurant.image}
// //           alt={restaurant.name}
// //           className="w-full h-48 object-cover rounded-lg transition duration-300 hover:brightness-110"
// //         />
// //       </div>
// //       <h3 className="mt-4 text-2xl font-bold text-gray-800">{restaurant.name}</h3>
// //       <p className="text-gray-500 text-sm mt-1">{restaurant.location}</p>
// //       <h4 className="mt-4 text-lg font-semibold">Menu</h4>
// //       <ul className="list-disc pl-5 text-gray-700">
// //         {restaurant.menu.map((item, index) => (
// //           <li key={index} className="mt-1">{item.name} - ${item.price}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // // const RestaurantList = () => {
// // //   const [restaurants, setRestaurants] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     const fetchRestaurants = async () => {
// // //       try {
// // //         const response = await fetch(API_URL);
// // //         if (!response.ok) {
// // //           throw new Error("Failed to fetch restaurants");
// // //         }
// // //         const data = await response.json();
// // //         setRestaurants(Array.isArray(data) ? data : data.restaurants || []);
// // //       } catch (error) {
// // //         setError(error.message);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchRestaurants();
// // //   }, []);

// // //   if (loading) return <p className="text-center mt-10">Loading restaurants...</p>;
// // //   if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

// // //   return (
// // //     <div className="p-10 bg-gray-100">
// // //       <h2 className="text-3xl font-bold mb-6">Top Restaurants</h2>
// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //         {restaurants.map((restaurant) => (
// // //           <RestaurantCard key={restaurant._id} restaurant={restaurant} />
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export const Menu = () => {
// // //   return (
// // //     <div>
// // //       <RestaurantList />
// // //     </div>
// // //   );
// // // };
