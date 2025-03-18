import React from "react";
import { Link } from "react-router-dom";



export const Header = () => {
  return (
    <div className="flex justify-between  items-center  px-36 h-20">
      <h1 className="text-3xl font-semibold py-9">
        <Link to="/">
        FOOD <span className="text-red-500">EAT</span>
        </Link>
      </h1>
      <div className="flex justify-center items-center gap-10">
        <nav>
          <ul className="flex justify-center items-center gap-5">
            <Link to="/Land">
              <li>Home</li>
            </Link >
            <Link to="/restaurant">
              <li>Restaurant</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>

          </ul>
        </nav>
        <div>
            <Link to="/login">
                <button>Login</button>
            </Link>
        </div>
      </div>
    </div>
  );
};
