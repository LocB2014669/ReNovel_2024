import React from "react";
import { Header } from "./components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/index/users";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AdminLayout = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
    onSuccess: (data) => {
      if (!data?.admin) {
        navigate("/");
        toast.error("Bạn không có quyền vào Page admin");
      }
    },
    OnError: (err) => {
      console.log(err);
      navigate("/");
      toast.error("Bạn không có quyền vào Page admin");
    },
  });

  if (profileIsLoading) {
    return (
      <div className="flex items-center justify-center">
        <h3 className="text-xl text-violet">Dang tai...............</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <Header />  
      <main className="bg-gray-100  flex-1 p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
