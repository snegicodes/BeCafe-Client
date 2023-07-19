import React from "react";
import CustomNavbar from "./CustomNavbar";

const Base = ({ title = "Welcome", children, home }) => {
  return (
    <div className="container-fluid p-0 m-0">
      <CustomNavbar home={home} />
      {children}
    </div>
  );
};

export default Base;
