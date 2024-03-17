import React from "react";


export const ImgBanner = ({ titleImg }) => {
  return (
    <div className="item w-full h-[400px]">
      <img className="w-full object-cover" src={titleImg} alt="" />
    </div>
  );
};
