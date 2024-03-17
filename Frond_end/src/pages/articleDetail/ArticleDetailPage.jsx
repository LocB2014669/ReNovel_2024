import React, { useEffect, useState } from "react";

import { generateHTML } from "@tiptap/html";
import Bold from "@tiptap/extension-bold";
// Option 2: Browser-only (lightweight)
// import { generateHTML } from '@tiptap/core'
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import parse from "html-react-parser";

import MainLayout from "../../components/MainLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import { images, stable } from "../../constants";
import { Link, useParams } from "react-router-dom";
import SuggestPost from "./container/SuggestPost";
import CommentsContainer from "../../components/comments/CommentsContainer";
import ShareButton from "../../components/ShareButton";

import { getDetailsPost, getAllPosts } from "../../services/index/posts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoadingDetails } from "./container/LoadingDetails";
import ErroMessage from "../../components/ErroMessage";
import { useSelector } from "react-redux";
import parseJson from "../../utils/parseJSON";
import Editor from "../../components/editor/Editor";
import { categoryOption } from "../../utils/selectMultiTag";
import RatingForm from "./container/RatingForm";
import { SlBookOpen } from "react-icons/sl";
import { FaHeart } from "react-icons/fa6";
import { createFavorite } from "../../services/index/favorite";
import { FavoriteDetails } from "./container/FavoriteDetails";

const tagsData = ["Comedy", "Romance", "School Life", "Web Novel"];

const ArticleDetailPage = () => {
  const userState = useSelector((state) => state.user);
  // console.log(userState, "userState");
  const [body, setBody] = useState(null);
  const [breadCrumbsData, setBreadCrumbsData] = useState([]);
  const { slug } = useParams();

  const {
    data,
    isLoading,
    isError,
    refetch: ref,
  } = useQuery({
    queryFn: () => getDetailsPost({ slug }),
    queryKey: ["article", slug],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (data) {
      setBody(parseJson(data?.body));

      setBreadCrumbsData([
        {
          name: "Trang Chủ",
          link: "/",
        },
        {
          name: "Bài Viết",
          link: "/articles",
        },
        {
          name: `${data.title}`,
          link: `/blog/${data.slug}`,
        },
      ]);
    }
  }, [data, ref]);
  return (
    <MainLayout>
      {isLoading ? (
        <LoadingDetails />
      ) : isError ? (
        <ErroMessage message="Không tìm thấy dữ liệu" />
      ) : (
        <section className="container mx-auto max-w-7xl flex-col px-5 py-5 lg:flex lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <BreadCrumbs data={breadCrumbsData} classname={"lg:text-white"} />
            {data && (
              <>
                <div className="absolute left-0 top-0 h-[100%] w-full overflow-hidden hidden lg:block ">
                  <img
                    className="rounded-xl object-cover object-center lg:h-[200%] lg:w-[200%] h-auto w-auto blur-2xl m-7"
                    src={
                      data.photo
                        ? stable.UPLOAD_FOLDER_BASE_URL + data.photo
                        : images.Yae
                    }
                    alt={data.title}
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-[#000] opacity-[.5]"></div>
                </div>
                <div className="lg:flex md:block gap-x-5">
                  <img
                    className="rounded-xl object-cover object-center lg:w-[400px] lg:h-[550px] w-full h-full z-10"
                    src={
                      data.photo
                        ? stable.UPLOAD_FOLDER_BASE_URL + data.photo
                        : images.Yae
                    }
                    alt={data.title}
                  />
                  <div className="flex flex-col justify-end gap-y-3 flex-grow lg:w-2/4 z-10">
                    <h1 className="text-3xl font-montserrat lg:text-white font-semibold mt-2 lg:mt-0">
                      {data.title}
                    </h1>
                    <p className="font-bold text-sm w-full ">
                      Người đăng:{" "}
                      <span className="font-normal text-lg text-nowrap lg:text-white">
                        {data?.user?.name}
                      </span>{" "}
                    </p>
                    <div className=" z-10">
                      <RatingForm
                        postId={data?._id}
                        averageRating={data?.averageRating}
                        ref={ref}
                      />
                    </div>
                    <div className="flex lg:text-white gap-y-2 gap-x-2 flex-wrap">
                      <div className="flex flex-col border-r lg:pr-5 px-5 py-3 gap-y-2 w-[48%] lg:w-auto">
                        <p>Chapter</p>
                        <div className="flex gap-x-2 items-center">
                          <SlBookOpen />
                          <span>1433</span>
                        </div>
                      </div>
                      <div className="flex flex-col border-r px-5 py-3 gap-y-2 w-[48%] lg:w-auto">
                        <p>Lượt truy cập</p>
                        <div className="flex gap-x-2 items-center">
                          <SlBookOpen />
                          <span>{data?.view}</span>
                        </div>
                      </div>

                      <div className="flex flex-col border-r px-5 py-3 gap-y-2 w-[48%] lg:w-auto">
                        <p>Trang Thái</p>
                        <div className="flex gap-x-2 items-center text-sm">
                          <span>{data.status}</span>
                        </div>
                      </div>
                      <FavoriteDetails
                        userState={userState}
                        postId={data?._id}
                      />
                    </div>
                    <div className="flex gap-x-2 gap-y-3 flex-wrap justify-start lg:justify-normal mt-3">
                      {data?.category.map((category) => (
                        <div
                          key={category._id}
                          className="border-violet bg-opacity-20 text-violet bg-violet px-3.5 py-2 rounded-xl "
                        >
                          <span className="text-sm font-montserrat font-semibold">
                            {category.title}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="text-gray-900 text-nowrap font-bold text-sm w-full">
                      Thời Điểm:
                      <span className="text-nowrap font-normal ml-2">
                        {" "}
                        {new Date(data.createdAt).toLocaleDateString("vi-VN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                  </div>
                </div>

                {/* <div className="mt-4 text-dark-soft max-w-prose text-xl leading-8">
                  {body}
                </div> */}
                <hr className="w-60 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
                <h4 className="italic font-montserrat font-normal text-2xl">
                  Đánh Giá
                </h4>
                <div className="w-full lg:flex lg:flex-row gap-x-5">
                  <div className="lg:w-3/4 w-full">
                    {!isLoading && !isError && (
                      <Editor content={data.body} editable={false} />
                    )}
                  </div>
                  <div className="lg:w-1/4 w-full">
                    <SuggestPost
                      className="mt-8 lg:max-w-full"
                      header="Bài viết gần đây"
                      posts={postsData?.data}
                      tags={tagsData}
                    />
                    <div className="mt-7">
                      <h2 className="font-montserrat lg:text-md text-dark-hard mb-4 text-xl">
                        Share on:
                      </h2>
                      <ShareButton
                        url={encodeURI(window.location.href)}
                        title={encodeURIComponent(data?.title)}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <hr className="w-60 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
            <h4 className="italic font-montserrat font-normal text-2xl mb-3">
              Bình Luận
            </h4>
            <CommentsContainer
              className="lg:mx-10"
              comments={data.comments}
              slugPost={slug}
              logginedUserId={userState?.userInfo?._id}
              refetch={ref}
            />
          </article>
        </section>
      )}
    </MainLayout>
  );
};

export default ArticleDetailPage;
