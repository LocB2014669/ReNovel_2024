import React, { useState } from "react";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
} from "../../../../services/index/postCategory";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DataTable } from "../../components/DataTable";

export const CategoryPost = () => {
  const [newCategory, setNewCategory] = useState("");

  const { data: categoryData, refetch } = useQuery({
    queryFn: () => getAllCategory(),
    queryKey: ["categories"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  const { mutate: mutateCreateCategory, isLoading: isLoadingCreateCategory } =
    useMutation({
      mutationFn: ({ title }) => {
        return createCategory({
          title: title,
        });
      },
      onSuccess: () => {
        toast.success("Đã tạo category thành công");
        setNewCategory(""); // Reset giá trị input
        refetch(); // Fetch lại dữ liệu categories sau khi tạo thành công
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  return (
    <div className="max-w-full lg:flex lg:gap-x-3 block">
      <div className="py-8 lg:h-12 lg:w-1/3 w-full">
        <input
          type="text"
          placeholder="Nhập tên category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border-violet px-2 py-3 w-full rounded-lg mb-5"
        />
        <button
     className="w-full px-3 py-3 border-violet bg-violet text-white border-4 font-bold rounded-lg duration-200"
          onClick={() => mutateCreateCategory({ title: newCategory })}
          disabled={isLoadingCreateCategory}
        >
          {isLoadingCreateCategory ? "Đang tạo..." : "Tạo"}
        </button>
      </div>

      <DataTable categoryData={categoryData} refetch={refetch} />
    </div>
  );
};
