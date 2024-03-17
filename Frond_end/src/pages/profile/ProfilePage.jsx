import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../../components/MainLayout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateProfile } from "../../services/index/users";
import { ProfileAvatar } from "../../components/ProfileAvatar";
import toast from "react-hot-toast";
import { userActions } from "../../store/reducers/userReducers";
// import { FavoritePage } from "./Favorite";
import { Tabs } from "../../components/container/Tabs";
// import { Favorite } from "./container/Favorite";
import { InfoUser } from "./container/InfoUser";
import { Favorite } from "./container/Favorite";
import { GrFavorite } from "react-icons/gr";
import { TbUserEdit } from "react-icons/tb";
import { IoBookOutline } from "react-icons/io5";
import { PostManagerUser } from "./container/PostManagerUser";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);

  // const {
  //   data: profileData,
  //   isLoading: profileIsLoading,
  //   error: profileError,
  // } = useQuery({
  //   queryFn: () => {
  //     return getUserProfile({ token: userState.userInfo.token });
  //   },
  //   queryKey: ["profile"],
  // });

  // const { mutate, isLoading, upadateProfileIsLoading } = useMutation({
  //   mutationFn: ({ name, email, password }) => {
  //     return updateProfile({
  //       token: userState.userInfo.token,
  //       userData: { name, email, password },
  //     });
  //   },
  //   onSuccess: (data) => {
  //     dispatch(userActions.setUserInfo(data));
  //     localStorage.setItem("account", JSON.stringify(data));
  //     queryClient.invalidateQueries(["profile"]);
  //     toast.success("Profile đã được update");
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //     console.log(error);
  //   },
  // });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/login");
    }
  }, [navigate, userState.userInfo]);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isValid },
  // } = useForm({
  //   defaultValues: {
  //     name: "",
  //     email: "",
  //     password: "",
  //   },
  //   values: useMemo(() => {
  //     return {
  //       name: profileIsLoading || !profileData ? "" : profileData.name,
  //       email: profileIsLoading || !profileData ? "" : profileData.email,
  //     };
  //   }, [profileData?.name, profileData?.email, profileIsLoading]),
  //   mode: "onChange",
  // });

  // const submitHandler = (data) => {
  //   const { name, email, password } = data;
  //   mutate({ name, email, password });
  // };
  // console.log(profileData);

  const tabs = [
    {
      label: "Các bài đăng yêu thích",
      content: <Favorite />,
      icon: <GrFavorite />,
    },
    {
      label: "Thông tin cá nhân",
      content: <InfoUser />,
      icon: <TbUserEdit />,
    },
    {
      label: "Bài đăng của bạn",
      content: <PostManagerUser />,
      icon: <IoBookOutline />,
    },
  ];
  return (
    <MainLayout>
      <section className="relative container mx-auto px-5 py-10 ">
        {/* <div className="w-full max-w-sm mx-auto">
          <ProfileAvatar avatar={profileData?.avatar} />
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="name"
                className="text-gray-500 font-semibold block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  minLength: {
                    value: 1,
                    message: "Độ dài tên phải có ít nhất 1 ký tự",
                  },
                  required: {
                    value: true,
                    message: "Bắt buộc",
                  },
                })}
                placeholder="Enter name"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.name ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.name?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="email"
                className="text-gray-500 font-semibold block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Nhập email hợp lệ",
                  },
                  required: {
                    value: true,
                    message: "Bắt buộc",
                  },
                })}
                placeholder="Enter email"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.email ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="password"
                className="text-gray-500 font-semibold block"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter new password"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.password ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isValid || profileIsLoading || upadateProfileIsLoading}
              className="bg-violet text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Lưu Thông tin
            </button>
          </form>
        </div> */}
        <div>
          <h1 className="text-4xl font-medium text-purple-500 mb-5">Thông tin cá nhân</h1>
          <Tabs tabs={tabs} />
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
