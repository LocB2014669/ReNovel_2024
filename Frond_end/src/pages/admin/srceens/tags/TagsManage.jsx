import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  createTags,
  getAllTags,
  updateTags,
} from "../../../../services/index/tags";
import { DataTable } from "../../components/DataTable";
import { DataTableTags } from "../../components/DataTableTags";
import toast from "react-hot-toast";

export const TagsManage = () => {
  const [newTags, setNewTags] = useState("");
  const [editTagsData, setEditTagsData] = useState(null);

  const { data: tagsData, refetch } = useQuery({
    queryFn: () => getAllTags(),
    queryKey: ["tags"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  const { mutate: mutateCreateTags, isLoading: isLoadingCreateTags } =
    useMutation({
      mutationFn: ({ title }) => {
        return createTags({
          title: title,
        });
      },
      onSuccess: () => {
        toast.success("Đã tạo Tags thành công");
        setNewTags(""); // Reset giá trị input
        
        refetch(); // Fetch lại dữ liệu categories sau khi tạo thành công
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });
  const { mutate: mutateEditTags, isLoading: isLoadingEditTags } = useMutation({
    mutationFn: ({ tagId, title }) => {
      return updateTags({
        tagId: tagId,
        title: title,
      });
    },
    onSuccess: () => {
      toast.success("Đã chỉnh sữa thành công");
      setNewTags("");
      editTagsData(null);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  const handlerEditTags = (tagId, tagTitle) => {
    setEditTagsData({ tagId, tagTitle });
    setNewTags(tagTitle);
  };
  console.log(editTagsData, "edit");
  console.log(newTags, "setnewwwwwww");
  return (
    <div className="max-w-full lg:flex lg:gap-x-3 block h-[100vh]">
      <div className="py-8 lg:h-12 lg:w-1/3 w-full">
        <input
          type="text"
          placeholder="Nhập tên Tags"
          defaultValue={editTagsData ? editTagsData.tagTitle : ""}
          onChange={(e) => setNewTags(e.target.value)}
          className="border-violet px-2 py-3 w-full rounded-lg mb-5"
        />
        {editTagsData !==null? (
          <button
            className="w-full px-3 py-3 border-violet bg-violet text-white border-4 font-bold rounded-lg duration-200"
            onClick={() =>
              mutateEditTags({
                tagId: editTagsData.tagId,
                title: newTags,
              })
            }
            disabled={isLoadingEditTags}
          >
            Chỉnh Sữa
          </button>
        ) : (
          <button
            className="w-full px-3 py-3 border-violet bg-violet text-white border-4 font-bold rounded-lg duration-200"
            onClick={() => mutateCreateTags({ title: newTags })}
            disabled={isLoadingCreateTags}
          >
            Tạo
          </button>
        )}
      </div>

      <DataTableTags
        data={tagsData}
        refetch={refetch}
        onEditTags={handlerEditTags}
      />
    </div>
  );
};
