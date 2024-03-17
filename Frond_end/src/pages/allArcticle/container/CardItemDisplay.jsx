import React from "react";
import { images, stable } from "../../../constants";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const CardItemDisplay = ({ postsData }) => {
  console.log(postsData, "postDataaricccccc");
  return (
    <div className="flex items-center flex-wrap gap-x-[12px] gap-y-3">
      {postsData?.data
        ?.filter((item) => (item.checked = true))
        .map((item, index) => (
          <div
            key={index}
            className="relative group w-[365px] h-96 overflow-hidden bg-black border rounded-3xl"
          >
            <img
              className="object-cover w-full h-full transform duration-700 backdrop-opacity-100"
              src={
                item.photo
                  ? stable.UPLOAD_FOLDER_BASE_URL + item.photo
                  : images.Yae
              }
              alt={item.title}
            />
            <div className="absolute w-full h-full shadow-2xl opacity-20 transform duration-500 inset-y-full group-hover:-inset-y-0"></div>
            <div className="absolute bg-gradient-to-t from-black w-full h-full transform duration-500 inset-y-3/4 group-hover:-inset-y-0">
              <div className="absolute w-full flex place-content-center">
                <p className="capitalize font-serif font-bold text-xl text-center shadow-2xl text-white mt-10">
                  {item.title}
                </p>
              </div>
              <div className="absolute w-full flex place-content-center mt-20">
                <p className="font-sans text-center w-4/5 text-white mt-5 line-clamp-6">
                  {item.caption}
                </p>
              </div>
              <div className="absolute w-full flex place-content-center justify-between bottom-24">
                {/* <p className="font-sans text-center w-4/5 text-white mt-5">
                  Người đăng:
                  <p>{item?.user?.name}</p>
                </p>
                <p className="font-sans text-center w-4/5 text-white mt-5">
                  {item?.view} lượt xem
                </p> */}
                {/* <div className="flex items-center gap-x-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={
                      item.user.avatar
                        ? stable.UPLOAD_FOLDER_BASE_URL + item.user.avatar
                        : images.Yae
                    }
                    alt="avatar"
                  />
                  <div className="flex flex-col">
                    <h4 className="font-bold italic text-dark-light text-sm">
                      {item.user.name}
                    </h4>
                    <div className="flex items-center gap-x-2">
                      <span className="bg-violet bg-opacity-20 w-fit p-1.5 rounded-full">
                        <FaCheck className="w-2 h-2 text-violet" />
                      </span>
                      <span className="italic text-dark-soft text-xs">
                        {item.user.verified ? "verified" : "Unverified"} Master
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>
              <button className="absolute left-1/4 bottom-4 border-violet text-violet hover:bg-opacity-20 hover:bg-violet font-bold rounded-lg h-10 w-48">
                <Link to={`/article/${item.slug}`}>Xem Đánh Giá</Link>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};
