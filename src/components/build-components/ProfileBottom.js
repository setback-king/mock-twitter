import React from "react";
import { Outlet } from "react-router-dom";

export const ProfileBottom = () => {
  return (
    <div className="profileBottom">
      <Outlet />
    </div>
  );
};
