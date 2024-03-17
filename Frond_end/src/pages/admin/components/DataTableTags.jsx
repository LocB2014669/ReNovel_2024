import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { deleteCategory } from "../../../services/index/postCategory";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { deleteTags } from "../../../services/index/tags";

export const DataTableTags = ({ data, refetch, onEditTags }) => {
  // const [valueEditTags, setValueEditTags] = useState("");
  const { mutate: mutateDeleteTags, isLoading: isLoadingDeleteTags } =
    useMutation({
      mutationFn: ({ tagId }) => {
        return deleteTags({
          tagId: tagId,
        });
      },
      onSuccess: (data) => {
        toast.success("Category đã được Xóa");
        refetch();
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });
  return (
    <div className="container lg:px-4 mx-auto sm:px-8 lg:w-2/3 w-full">
      {/* max-w-3xl */}
      <div className="py-8">
        <div className="flex lg:flex-row flex-col justify-between w-full mb-1 sm:mb-0">
          <h2 className="lg:text-2xl text-xl mb-3 lg:mb-0 leading-tight text-violet">
            Danh Sách Tags
          </h2>
        </div>
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal table-auto">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat lg:text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Tên Tags
                  </th>
                  <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left text-gray-800 uppercase bg-white border-b border-gray-200 "
                  >
                    Thời Gian Tạo
                  </th>
                  <th
                    scope="col"
                    className="lg:px-5 px-2  py-3 lg:text-sm text-[12px] font-montserrat text-center lg:text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {isLoadingDeleteTags ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 w-full">
                      Loading......
                    </td>
                  </tr>
                ) : data?.length === 0 ? (
                  <td colSpan={5} className="text-center py-10 w-full">
                    Không Có Thể Loại Nào Được Tạo
                  </td>
                ) : (
                  data?.map((item) => (
                    <tr key={item._id}>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 ">
                        <div className="truncate">
                          <p>{item.title}</p>
                        </div>
                      </td>
                      <td className="px-5 py-5 lg:text-sm text-[12px] text-nowrap bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Date(item.createdAt).toLocaleDateString(
                            "vi-VN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </td>
                      <td className="px-5 py-5 flex items-center text-sm bg-white border-b border-gray-200 space-x-5">
                        <button
                          disabled={isLoadingDeleteTags}
                          type="button"
                          className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed "
                          onClick={() => mutateDeleteTags({ tagId: item?._id })}
                        >
                          Xoá
                        </button>
                        <button
                          onClick={() => onEditTags(item._id, item.title)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* {!isLoading && (
               <Pagination
                 onPageChange={(page) => setCurrentPage(page)}
                 currentPage={currentPage}
                 // totalPageCount={JSON.parse(
                 //   postsData?.headers?.["x-totalpagecount"]
                 // )}
               />
             )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
