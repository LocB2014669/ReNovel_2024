import React from "react";
import MainLayout from "../../components/MainLayout";
// import Banner from "./container/banner";
import Articles from "./container/Articles";
import Banner from "./container/Banner";


const HomePage = () => {
  return (
    <MainLayout>
      <Banner />
      <Articles />
    </MainLayout>
  );
};

export default HomePage;
