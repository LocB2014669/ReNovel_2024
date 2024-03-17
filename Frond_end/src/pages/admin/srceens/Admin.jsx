import React from "react";
import { getAllUsers } from "../../../services/index/users";
import { useQuery } from "@tanstack/react-query";
import { CardItemAdmin } from "../components/CardItemAdmin";
import { FaRegUser } from "react-icons/fa";
import { TfiViewListAlt } from "react-icons/tfi";
import { SlTag } from "react-icons/sl";
import { HiOutlineEye } from "react-icons/hi2";
import { FaAngleDown } from "react-icons/fa6";
import { RiArrowUpSLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { getAllPosts, getAllPostsAdmin } from "../../../services/index/posts";
import { getAllTags } from "../../../services/index/tags";

export const Admin = () => {
  const { data: UserData } = useQuery({
    queryFn: () => getAllUsers(),
    queryKey: ["users"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const { data: Postuser } = useQuery({
    queryFn: () => getAllPostsAdmin(),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const { data: TagsData } = useQuery({
    queryFn: () => getAllTags(),
    queryKey: ["tags"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const currentDate = new Date();
  const previousWeekDate = new Date(
    currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );
  const totalView = Postuser?.data
    ?.filter(
      (post) =>
        new Date(post.updatedAt).getTime() >= previousWeekDate.getTime() &&
        new Date(post.updatedAt).getTime() <= currentDate.getTime()
    )
    .reduce((sum, post) => sum + (post.view || 0), 0);

  return (
    <div className="container lg:px-4 sm:px-8 h-[100vh]">
      <div className=" rounded-xl mb-4 w-full relative ">
        <div className="w-full flex justify-evenly items-center">
          <CardItemAdmin
            total={UserData?.length}
            title={"Số Tài Khoản Hoạt Động"}
            icon={<FaRegUser />}
          />
          <CardItemAdmin
            total={Postuser?.data?.length}
            title={"Số Bài Đăng Hiện Tại"}
            icon={<TfiViewListAlt />}
          />
          <CardItemAdmin
            total={totalView}
            title={"Lượt Truy Cập Theo Tuần"}
            icon={<HiOutlineEye />}
          />
          <CardItemAdmin
            total={TagsData?.length}
            title={"Tổng Số Chủ Đề"}
            icon={<SlTag />}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div class="card-header flex flex-row justify-between p-4 bg-white border rounded-t-xl">
          <h1 class="text-xl font-bold">Bảng Kế Hoạch</h1>
        </div>
        <div className="flex items-center justify-between bg-white rounded-b-xl">
          <div className="card">
            <table className="table-auto w-full text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-r"></th>
                  <th className="px-4 py-2 border-r">product</th>
                  <th className="px-4 py-2 border-r">price</th>
                  <th className="px-4 py-2">date</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr>
                  <td className="border border-l-0 px-4 py-2 text-center text-green-500">
                    <FaRegCircle />
                  </td>
                  <td className="border border-l-0 px-4 py-2">
                    Lightning to USB-C Adapter Lightning.
                  </td>
                  <td className="border border-l-0 px-4 py-2">
                    $<span className="num-2"></span>
                  </td>
                  <td className="border border-l-0 border-r-0 px-4 py-2">
                    <span className="num-2"></span> minutes ago
                  </td>
                </tr>
                <tr>
                  <td className="border border-l-0 px-4 py-2 text-center text-yellow-500">
                    <FaRegCircle />
                  </td>
                  <td className="border border-l-0 px-4 py-2">
                    Apple iPhone 8.
                  </td>
                  <td className="border border-l-0 px-4 py-2">
                    $<span className="num-2"></span>
                  </td>
                  <td className="border border-l-0 border-r-0 px-4 py-2">
                    <span className="num-2"></span> minutes ago
                  </td>
                </tr>
                <tr>
                  <td className="border border-l-0 px-4 py-2 text-center text-green-500">
                    <FaRegCircle />
                  </td>
                  <td className="border border-l-0 px-4 py-2">
                    Apple MacBook Pro.
                  </td>
                  <td className="border border-l-0 px-4 py-2">
                    $<span className="num-2"></span>
                  </td>
                  <td className="border border-l-0 border-r-0 px-4 py-2">
                    <span className="num-2"></span> minutes ago
                  </td>
                </tr>
                <tr>
                  <td className="border border-l-0 px-4 py-2 text-center text-red-500">
                    <FaRegCircle />
                  </td>
                  <td className="border border-l-0 px-4 py-2">
                    Samsung Galaxy S9.
                  </td>
                  <td className="border border-l-0 px-4 py-2">
                    $<span className="num-2"></span>
                  </td>
                  <td className="border border-l-0 border-r-0 px-4 py-2">
                    <span className="num-2"></span> minutes ago
                  </td>
                </tr>
                <tr>
                  <td className="border border-l-0 px-4 py-2 text-center text-yellow-500">
                    <FaRegCircle />
                  </td>
                  <td className="border border-l-0 px-4 py-2">
                    Samsung Galaxy S8 256GB.
                  </td>
                  <td className="border border-l-0 px-4 py-2">
                    $<span className="num-2"></span>
                  </td>
                  <td className="border border-l-0 border-r-0 px-4 py-2">
                    <span className="num-2"></span> minutes ago
                  </td>
                </tr>
                <tr>
                  <td className="border border-l-0 border-b-0 px-4 py-2 text-center text-green-500">
                    <FaRegCircle />
                  </td>
                  <td className="border border-l-0 border-b-0 px-4 py-2">
                    apple watch.
                  </td>
                  <td className="border border-l-0 border-b-0 px-4 py-2">
                    $<span className="num-2"></span>
                  </td>
                  <td className="border border-l-0 border-b-0 border-r-0 px-4 py-2">
                    <span className="num-2"></span> minutes ago
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-8">
            <h1 className="h2">5,337</h1>
            <p className="text-black font-medium">Sales this month</p>

            <div className="mt-20 mb-2 flex items-center">
              <div className="py-1 px-3 rounded bg-green-200 text-green-900 mr-3">
                <RiArrowUpSLine />
              </div>
              <p className="text-black">
                <span className="num-2 text-green-400">86</span>
                <span className="text-green-400">% more sales</span> in
                comparison to last month.
              </p>
            </div>

            <div className="flex items-center">
              <div className="py-1 px-3 rounded bg-red-200 text-red-900 mr-3">
                <FaAngleDown />
              </div>
              <p className="text-black">
                <span className="num-2 text-red-400">59</span>
                <span className="text-red-400">% revenue per sale</span> in
                comparison to last month.
              </p>
            </div>

            <a href="#" className="btn-shadow mt-6">
              view details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
