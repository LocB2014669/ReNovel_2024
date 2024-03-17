import React from "react";
import { images } from "../../../constants";
import { IoIosSearch } from "react-icons/io";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ArticlesCard from "../../../components/ArticlesCard";
import { ImgBanner } from "./ImgBanner";
// import { images } from "../../../constants";

const Banner = () => {
  const options = {
    autoplay: true,
    responsiveClass: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  return (
    <section className="relative top-0 container px-5 py-5 m-auto flex z-[10]">
      {/* <div className='w-full h-[60vh] shadow-xl'>
                <img className='w-full h-full object-cover' src={images.Landing} alt="banner" />
            </div> */}
      {/* <div className='lg:w-1/2'>
                <h1 className='font-opensans text-dark-soft font-bold text-3xl md:text-5xl text-center lg:text-left'>Read the most interesting articles</h1>
                <p className='text-dark-light mt-4 text-center lg:text-left md:text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing edit, sed do
                    eiusmod tempor incidiunt ut labore et dolore magna aliqua
                </p>
                <div className='flex flex-col gap-y-2.5 mt-10 relative'>
                    <div className='relative'>
                        <IoIosSearch className='absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 text-slate-950' />
                        <input className='placeholder:font-bold font-semibold text-dark-soft rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]' placeholder='Tìm kiếm tại đây' type="text" />
                    </div>

                    <button className='lg:absolute lg:right-4 lg:top-1  lg:w-fit w-full bg-violet text-white font-semibold rounded-lg px-5 py-3 lg:py-2'>Search</button>
                </div>
                <div className='flex flex-col lg:flex-row lg:flex-nowrap lg:gap-x-4 lg:mt-7'>
                    <span className='text-dark-light font-semibold italic'>Popular Tags: </span>
                    <ul className='flex flex-wrap gap-x-2.5 gap-y-2 mt-3 list-none'>
                        <li className='rounded-lg bg-violet bg-opacity-10 px-3 py-2 text-violet font-semibold'>Thiết Kế</li>
                        <li className='rounded-lg bg-violet bg-opacity-10 px-3 py-2 text-violet font-semibold'>Tài Khoản Nổi Bật</li>
                        <li className='rounded-lg bg-violet bg-opacity-10 px-3 py-2 text-violet font-semibold'>Giao Diện Tài Khoản</li>
                    </ul>
                </div>
            </div>
            <div className='w-1/2 hidden lg:block'>s
                <img className='w-full h-full object-cover rounded-lg' src={images.Landing} alt="banner" />
            </div> */}
      <div className="w-full">
        <OwlCarousel
          {...options}
          className="owl-theme mx-auto"
          loop
          margin={15}
          items={4}
        >
          <ImgBanner titleImg={images.banner1} />

          <ImgBanner titleImg={images.banner2} />

          <ImgBanner titleImg={images.banner3} />
        </OwlCarousel>
      </div>
    </section>
  );
};

export default Banner;
