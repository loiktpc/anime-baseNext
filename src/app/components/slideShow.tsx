import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../sass/slideshow.scss'
import useSWR from "swr";
import { useEffect, useState } from "react";
import axios from 'axios'
import Image from "next/image";
function Slideshow() {

  const fetcher = (url:string) => axios.get(url).then(res => res.data)
  const { data, error, isLoading } = useSWR(
    "https://phimlau-509fd-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
    fetcher,{
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true
      }
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  

  const settings = {
   
    customPaging: function(i : any) {
      return (
        <a>
         
          <div> </div>
        </a>
      );
    },
    initialSlide: 3,
    arrows: false ,
    dots: true,
    autoplay: true,
    dotsClass: "button__bar",
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1 ,
    autoplaySpeed: 1000,
    cssEase: "linear", 
  };
  return (
    <div className="slider-container">
      <Slider {...settings} className="">
        {data.map((e : any, index : any)=>{
          return (
           
              <div className="" key={index}>
          <div className="relative">
            <div className="absolute right-2 top-2 bg-red-600 px-1 py-2 practice">{e.total_tap}</div>
          <Image height='270' width='100' className="imgslide w-full" src={e.img} alt="" />
          </div>
        </div>
            
          )
        })}
      
      </Slider>
    </div>
  );
}

export default Slideshow;
