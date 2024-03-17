import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../../constants";
import { IoIosClose, IoIosMenu } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa6";
import Navitem from "./Navitem";
import NavitemCollap from "./NavitemCollap";
import { useWindowSize } from "@uidotdev/usehooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createPost } from "../../../services/index/posts";

// const item_Menu = [
//   {
//     title: "Dashboard",
//     link: "/admin",
//     icon: <LuLayoutDashboard className="text-xl" />,
//     name: "dashboard",
//     type: "link",
//   },
//   {
//     title: "Comments",
//     link: "/admin/comments",
//     icon: <FaRegComment className="text-xl" />,
//     name: "comments",
//     type: "link",
//   },
//   {
//     title: "Posts",
//     content: [
//       {
//         title: "New",
//         link: "/admin/posts/news",
//       },
//       {
//         title: "Manage",
//         link: "/admin/posts/manage",
//       },
//     ],
//     link: "/admin/posts",
//     icon: <LuLayoutDashboard className="text-xl" />,
//     name: "posts",
//     type: "collab",
//   },
// ];

export const Header = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const [menuActive, setMenuActive] = useState(false);
  const [navName, setNavName] = useState("dashboard");
  const windowSize = useWindowSize();

  const menuHandler = () => {
    setMenuActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (windowSize.width < 1024) {
      setMenuActive(false);
    } else {
      setMenuActive(true);
    }
  }, [windowSize.width]);

  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
    useMutation({
      mutationFn: ({ slug, token }) => {
        return createPost({
          token: token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        toast.success("Post đã được tạo vui long chinh sua");
        console.log(data);
        navigate(`/admin/posts/manage/edit/${data?.slug}`);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handlerCreateNewPost = ({ token }) => {
    mutateCreatePost({ token });
  };

  return (
    <header className="flex h-[auto] w-full items-center justify-between p-4 lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start z-50">
      <Link to={"/"}>
        <img src={images.Logo} className="w-32 lg:hidden" alt="logo" />
      </Link>
      <div className="cursor-pointer lg:hidden">
        {menuActive ? (
          <IoIosClose className="w-6 h-6" onClick={menuHandler} />
        ) : (
          <IoIosMenu className="w-6 h-6" onClick={menuHandler} />
        )}
      </div>
      {menuActive && (
        <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden "
            onClick={menuHandler}
          />
          {/* sideBar */}
          <div className="fixed top-0 bottom-0 left-0 z-50 w-3/4 overflow-y-auto bg-white p-4 lg:static lg:h-full lg:w-full lg:p-6 ">
            <Link>
              <img src={images.Logo} className="w-32" alt="" />
            </Link>
            <h4 className="mt-16 text-xl font-bold text-gray-500">Main Menu</h4>
            <div className="flex flex-col">
              <Navitem
                title="Dashboard"
                link="/admin"
                icon={<LuLayoutDashboard className="text-xl" />}
                name="dashboard"
                navName={navName}
                setNavName={setNavName}
              />

              <Navitem
                title="Users"
                link="/admin/users"
                icon={<FaRegComment className="text-xl" />}
                name="users"
                navName={navName}
                setNavName={setNavName}
              />

              <Navitem
                title="Comments"
                link="/admin/comments"
                icon={<FaRegComment className="text-xl" />}
                name="comments"
                navName={navName}
                setNavName={setNavName}
              />

              <NavitemCollap
                title="Posts"
                icon={<LuLayoutDashboard className="text-xl" />}
                name="posts"
                navName={navName}
                setNavName={setNavName}
              >
                <Link to="/admin/posts/manage" className="text-lg font-semibold">Tất cả bài đăng</Link>
                {/* <button
                  disabled={isLoadingCreatePost}
                  className="text-start disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() =>
                    handlerCreateNewPost({
                      token: userState.userInfo.token,
                    })
                  }
                >
                  Thêm bài đăng mới
                </button> */}
                <Link to="/admin/categorypost" className="text-lg font-semibold">Quản lý thể loại</Link>
                <Link to="/admin/tags" className="text-lg font-semibold">Quản lý Tags</Link>
                {/* <Navitem
                  title="CategoryPost"
                  link="/admin/categorypost"
                  icon={<FaRegComment className="text-xl" />}
                  name="categorypost"
                  navName={navName}
                  setNavName={setNavName}
                /> */}
                {/* <Navitem
                  title="Tags"
                  link="/admin/tags"
                  icon={<FaRegComment className="text-xl" />}
                  name="tags"
                  navName={navName}
                  setNavName={setNavName}
                /> */}
              </NavitemCollap>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
