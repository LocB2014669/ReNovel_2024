import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { AiOutlineCamera } from "react-icons/ai";
import { getAllCategory } from "../../../services/index/postCategory";
import { categoryOption, filterCategory } from "../../../utils/selectMultiTag";
import { getDetailsPost, updatePost } from "../../../services/index/posts";
import ErroMessage from "../../../components/ErroMessage";
import { LoadingDetails } from "../../articleDetail/container/LoadingDetails";
import { SelectMultiple } from "../../admin/components/selectmuti/SelectMultiple";
import Editor from "../../../components/editor/Editor";
import { stable } from "../../../constants";
import MainLayout from "../../../components/MainLayout";
import { getAllTags } from "../../../services/index/tags";

const promiseOptions = async (inputValue) => {
  const { data: categoryData } = await getAllCategory();
  // console.log(categoryData, "categoryData");
  return filterCategory(inputValue, categoryData);
};

const dataPostStatus = [
  {
    title: "Toàn Bộ",
    id: "statusFull",
  },
  {
    title: "Đang Ra Mắt",
    id: "statusLoading",
  },
  {
    title: "Đã Hoàn Thành",
    id: "statusComplete",
  },
  {
    title: "Chưa Ra Mắt",
    id: "statusComing",
  },
];
const dataCountry = [
  {
    title: "Nhật Bản",
    id: "NB",
  },
  {
    title: "Trung Quốc",
    id: "TQ",
  },
  {
    title: "Hàn Quốc",
    id: "HQ",
  },
  {
    title: "Việt Nam",
    id: "VN",
  },
];

export const EditPostUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [body, setBody] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [statusPhoto, setStatusPhoto] = useState(null);

  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");
  const [tags, setTags] = useState("");

  console.log(title, "title");

  const { slug } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getDetailsPost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      setStatusPhoto(data?.photo);
      setCategory(data?.category.map((item) => item.value));
      setTitle(data.title);
      setCaption(data.caption);
      setCountry(data.country);
      setStatus(data.status);
      setValueTags(data.tags);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  const { data: dataTags } = useQuery({
    queryFn: () => getAllTags(),
    queryKey: ["tags"],
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  console.log("dataTags", dataTags);

  const {
    mutate: mutateUpdatePostDetail,
    isLoading: isLoadingUpdatePostDetail,
  } = useMutation({
    mutationFn: ({ updateData, slug, token }) => {
      return updatePost({
        updateData,
        slug,
        token,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["blog", slug]);
      toast.success("POst da duoc update");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      setStatusPhoto(data?.photo);
      setCategory(data?.category.map((item) => item.value));
      setTitle(data.title);
      setCaption(data.caption);
      setCountry(data?.country);
      setStatus(data?.status);
    }
  }, [data, isError, isLoading]);

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handlerUpdatePost = async () => {
    if (
      !status ||
      category.length === 0 ||
      !title ||
      !caption ||
      !country ||
      !tags
    ) {
      // Hiển thị thông báo lỗi
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    let updateData = new FormData();

    if (!statusPhoto && photo) {
      updateData.append("postImg", photo);
    } else if (statusPhoto && !photo) {
      const urlObject = async (url) => {
        let response = await fetch(url);
        let blob = await response.blob();
        const file = new File([blob], statusPhoto, { type: blob.type });
        return file;
      };

      const photoImg = await urlObject(
        stable.UPLOAD_FOLDER_BASE_URL + data?.photo
      );
      updateData.append("postImg", photoImg);
    }
    updateData.append(
      "document",
      JSON.stringify({ body, category, title, caption, country, status, tags })
    );

    mutateUpdatePostDetail({
      updateData,
      slug,
      token: userState.userInfo.token,
    });
    setTimeout(() => {
      const currentPath = window.location.pathname;
      if (currentPath.includes("admin")) {
        navigate("/admin/posts/manage");
      } else {
        navigate("/");
      }
    }, 1000);
  };

  const handlerDeletePhoto = () => {
    if (window.confirm("Ban co muon xoa anh nay khong")) {
      setStatusPhoto(null);
      setPhoto(null);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto h-auto">
        {isLoading ? (
          <LoadingDetails />
        ) : isError ? (
          <ErroMessage message="Không tìm thấy dữ liệu" />
        ) : (
          <>
            <h1 className="font-semibold text-xl text-violet my-2">
              Tạo Và Chỉnh Sửa Bài Đánh Giá
            </h1>
            <section className=" flex-col px-5 py-5 lg:flex lg:flex-row lg:gap-x-5 lg:items-start border border-primary rounded-lg ">
              <article className="flex-1">
                <div className="w-full flex items-start gap-x-4 ">
                  <div
                    className={`relative rounded-lg outline-offset-2 outline-1 outline-primary overflow-hidden ${
                      photo || statusPhoto ? "h-96 w-96" : "h-40 w-40 "
                    }`}
                  >
                    <label
                      htmlFor="postInputPhoto"
                      className=" cursor-pointer absolute inset-0 rounded-full bg-transparent"
                    >
                      {photo ? (
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={data?.title}
                          className="w-full object-cover "
                        />
                      ) : statusPhoto ? (
                        <img
                          src={`${stable.UPLOAD_FOLDER_BASE_URL}${data?.photo}`}
                          alt={data?.title}
                          className="w-full object-cover"
                        />
                      ) : (
                        <div className="w-full rounded-xl min-h-16 bg-blue-50/50 flex justify-start items-center ">
                          <AiOutlineCamera className="w-40 h-auto text-primary" />
                        </div>
                      )}
                    </label>
                    <input
                      type="file"
                      className="sr-only"
                      id="postInputPhoto"
                      onChange={changeFileHandler}
                    />
                  </div>
                  {photo || statusPhoto ? (
                    <button
                      onClick={handlerDeletePhoto}
                      className="border border-red-500 rounded-lg py-2 text-xl px-4 text-red-500 "
                    >
                      Xóa Ảnh
                    </button>
                  ) : (
                    <div className="border border-violet px-4 py-2 rounded-lg">
                      <p className="font-semibold text-primary">
                        Chọn Ảnh Cho Bài Đánh Giá
                      </p>
                    </div>
                  )}
                </div>
                {data && (
                  <>
                    <div className="form-control flex-row items-center w-full mt-4 gap-x-3">
                      <label
                        htmlFor="postTitleInput"
                        className="font-semibold text-lg"
                      >
                        Tên Tiêu Đề:{" "}
                      </label>
                      <input
                        id="postTitleInput"
                        placeholder={data.title}
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="px-4 py-2 rounded-lg w-1/2 border border-slate-300 focus:border-violet outline-none text-xl font-montserrat  text-dark-hard font-bold"
                      />
                    </div>

                    <div className="form-control flex-row items-center w-full mt-4 gap-x-3">
                      <label
                        htmlFor="idPostCaption"
                        className="font-semibold text-lg"
                      >
                        Giới Thiệu Tác Phẩm:{" "}
                      </label>
                      <textarea
                        required
                        cols="30"
                        rows="10"
                        id="idPostCaption"
                        placeholder={data.caption}
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="px-4 py-2 rounded-lg w-1/2 border border-slate-300 focus:border-violet outline-none text-xl font-montserrat  text-dark-hard font-bold"
                      ></textarea>
                    </div>

                    <div className="mt-10 flex flex-row items-center w-full">
                      {!isLoading && !isError && (
                        <>
                          <label
                            htmlFor="postTitleInput"
                            className="font-semibold text-lg"
                          >
                            Chọn thể loại:{" "}
                          </label>
                          <SelectMultiple
                            required
                            loadOptions={promiseOptions}
                            defaultValue={data?.category.map(categoryOption)}
                            onchange={(newValue) =>
                              setCategory(newValue.map((item) => item.value))
                            }
                          />
                        </>
                      )}
                    </div>
                    <div className="mt-10 flex flex-row items-center w-full">
                      <label
                        htmlFor="countrySelect"
                        className="font-semibold text-lg"
                      >
                        Quốc gia:{" "}
                      </label>
                      <select
                        id="countrySelect"
                        value={country}
                        onChange={(event) => setCountry(event.target.value)}
                        className="px-4 py-2 rounded-lg border border-slate-300 focus:border-violet outline-none text-xl font-montserrat text-dark-hard font-bold"
                      >
                        <option value="">Chọn quốc gia</option>
                        {dataCountry.map((item) => (
                          <option key={item.id} value={item.title}>
                            {item.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-10 flex flex-row items-center w-full">
                      <label
                        htmlFor="tagsSelect"
                        className="font-semibold text-lg"
                      >
                        Tags:{" "}
                      </label>
                      <select
                        id="tagsSelect"
                        value={tags}
                        onChange={(event) => setTags(event.target.value)}
                        className="px-4 py-2 rounded-lg border border-slate-300 focus:border-violet outline-none text-xl font-montserrat text-dark-hard font-bold"
                      >
                        <option value="">Chọn Tags</option>
                        {dataTags.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-10 flex flex-row items-center w-full">
                      <label
                        htmlFor="statusSelect"
                        className="font-semibold text-lg"
                      >
                        Trạng thái:{" "}
                      </label>
                      <select
                        id="statusSelect"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-slate-300 focus:border-violet outline-none text-xl font-montserrat text-dark-hard font-bold"
                      >
                        <option value="">Chọn trạng thái</option>
                        {dataPostStatus.map((item) => (
                          <option key={item.id} value={item.title}>
                            {item.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full mt-10">
                      {!isLoading && !isError && (
                        <Editor
                          content={data?.body}
                          editable={true}
                          onDataChange={(data) => {
                            setBody(data);
                          }}
                        />
                      )}
                    </div>

                    <button
                      disabled={isLoadingUpdatePostDetail}
                      type="button"
                      className="w-full bg-green-500 text-white font-semibold rounded-lg py-2 px-4 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={handlerUpdatePost}
                    >
                      UpDate
                    </button>
                  </>
                )}
              </article>
            </section>
          </>
        )}
      </div>
    </MainLayout>
  );
};
