import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/index/posts";
import { useNavigate } from "react-router-dom";

const usePostsQuery = (searchValue) => {
  return useQuery({
    queryFn: () => getAllPosts(searchValue),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
};

const InputSearch = () => {
  const nagavite = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const { data: postsData, refetch } = usePostsQuery(searchValue);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      nagavite(`/articles?search=${searchValue}`);
      refetch();
    }
  };

  return (
    <div className="lg:w-80 w-9/12 mt-10 lg:mt-auto">
      <div className="relative w-full h-10">
        <input
          type="text"
          className="border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập để tìm kiếm"
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default InputSearch;
