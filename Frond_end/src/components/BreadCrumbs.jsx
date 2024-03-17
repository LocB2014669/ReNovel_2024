import React from "react";
import { Link } from "react-router-dom";

const BreadCrumbs = ({ data, classname, wfull }) => {
  return (
    <div
      className={`${wfull} flex items-center py-4 overflow-x-auto whitespace-nowrap`}
    >
      {data.map((item, index) => (
        <div
          key={index}
          className={`text-black opacity-50 text-base z-10 ${classname} `}
        >
          <Link to={item.link}>{item.name}</Link>
          {index !== data.length - 1 && <span className="px-3">/</span>}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
