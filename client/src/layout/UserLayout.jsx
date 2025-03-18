import React from "react";
import { Header } from "../compontes/user/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../compontes/user/Footer";

export const UserLayout = () => {
  return (
    <div>
      <Header />

      <div className="min-h-96">
        <Outlet />
      </div>
      
      <Footer />
    </div>
  );
};
