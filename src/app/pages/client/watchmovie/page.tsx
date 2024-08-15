"use client"
import {
    FaBars,
    FaNotesMedical,
    FaTv,
} from "react-icons/fa";
import Link from "next/link";
import Notification from "../../../components/notification";
import TagTitle from "../../../components/TagTitle";
import { ModeToggle } from "../../../components/theme";
import Commentmv from '../detailProduct/comment' ;
import "../detailProduct/detailProduct.scss";
import { useSearchParams } from 'next/navigation'
import YouTubeVideo from '../../../components/Video' ;
import {useState} from 'react'
import useSWR from "swr";
import axios from "axios";
import ProgressDemo from '../../../components/progress' ;
import { redirect } from 'next/navigation'

import { useRouter } from 'next/navigation'
import Image from "next/image";

function WatchMovie() {
   const router = useRouter()



    const searchParams = useSearchParams()
    let tap = searchParams.get('tap')   
    const [activeIndex, setActiveIndex] = useState(tap); 
    
    
    const handleItemClick = (index : any  , e : any) => {
        setActiveIndex(index);
        console.log(index ,'index');
        console.log(e , 'item');
        
        
    };
    
    const handlernextMovie = () =>{
        
        let nextTap : any = Number(tap) + 1
        console.log('tap tiep theo',nextTap);
        
        setActiveIndex(nextTap);
        // router.push(`/pages/client/watchmovie?video=${e.link}&tap=${e.name_practice}&id=${idproduct}`, { scroll: false })

    }
    const video = searchParams.get('video')
    const idproduct = searchParams.get('id')
    
    const fetcher = (url: string) => axios.get(url).then((res) => res.data);
    const { data, error, isLoading } = useSWR(
        `https://phimlau-509fd-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${idproduct}.json`,
        fetcher,
        {
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    );
    if (error) return "An error has occurred.";
    if (isLoading) return <ProgressDemo/>;

    return (
        <>
            <Notification title="Hãy luôn truy cập tên miền AnimeHay.Tv để được chuyển hướng tới tên miền mới nhất kể cả khi bị chặn" />
            {/* thông tin film  */}
            <div className="p-[10px] my-[10px] bg-[#000] rounded-[6px]">
                <div className="text-[#ffb970] font-semibold flex items-center border-b-2 border-[#2f2f2f] pb-[10px] mb-[10px]">
                    <FaTv className="mr-2" />
                    {data && data.name}
                </div>
                <div className="flex text-gray-300 font-medium justify-between">
                    <div>Đang xem Tập {tap}</div>
                    <div>Đăng 9 giờ trước</div>
                </div>
            </div>
            {/* thông báo */}
            <div className="p-[10px] bg-[#b73a3a] rounded-md text-gray-300">
                Nếu bị mất âm thanh/hình ảnh hãy chuyển sang server khác
            </div>
            <TagTitle title={`Tập ${tap}`} />
            {/* Chuyển Sever  */}
            <div className="switchServer m-[10px] flex justify-center">
                <div className="p-[10px] bg-[#6b6a6a] rounded-[6px] hover:opacity-70 cursor-pointer text-gray-300 mr-2">
                    PHO
                </div>
                <div className="p-[10px] bg-[#6b6a6a] rounded-[6px] hover:opacity-70 cursor-pointer text-gray-300 active:bg-[#369e69] mr-2">
                    VIB
                </div>
            </div>
            {/* video */}
            <div>             
                <YouTubeVideo videoId={video} />
            </div>
            {/* action film */}
            <div className="flex justify-center m-[10px] ">
                <div className="p-[10px] bg-[#25867d] rounded-[8px] cursor-pointer mr-2 leading-[44px]">
                    <FaBars />
                </div>
                <div className="p-[10px] bg-[#b73a3a] rounded-[8px] cursor-pointer mr-2">
                    Cấm Ads
                </div>
                <div onClick={handlernextMovie} className="p-[10px] bg-[#6b6a6a] rounded-[8px] cursor-pointer mr-2">
                    Tiếp Theo
                </div>
            </div>
            {/* ghi chú */}
            <div className="p-[10px] my-[10px] bg-[#404040] rounded-[6px]">
                <div className="text-red-400 font-semibold flex items-center border-b-2 border-[#2f2f2f] pb-[10px] mb-[10px]">
                    <FaNotesMedical className="mr-2" />
                    Ghi Chú
                </div>
                <div className="flex text-[#ffb970] font-medium justify-between">
                    <div>
                        {" "}
                        PHIM ĐƯỢC CẬP NHẬT 1 TẬP MỖI TRƯA THỨ 2 HÀNG TUẦN
                    </div>
                    {/* <div>Đăng 9 giờ trước</div> */}
                </div>
            </div>
            {/* list tập phim*/}
            <div className="p-[10px] my-[10px] bg-[#404040] rounded-[6px]">
                <div className="text-gray-300 font-semibold flex items-center border-b-2 border-[#2f2f2f] pb-[10px] mb-[10px]">
                    Danh Sách Tập
                </div>
                <div className="flex justify-center items-center">
                {data && data?.practice.map((e : any ,index : any)=>{
                            return (    
                                <Link href={`/pages/client/watchmovie?video=${e.link}&tap=${e.name_practice}&id=${idproduct}`} key={index}>
                                <div onClick={(e) => handleItemClick(index + 1 , e)} className={`bg-[${activeIndex == index + 1 ? '#bb6464' : '#333232'}] px-[12px] py-[10px] bg-[#333232] mr-2 hover:bg-[#bb6464]`}>
                                    {" "}
                                    {e.name_practice}
                                </div>
                            </Link>
                            )
                        })}
                            
                        {/* <Link href={"./"}>
                        <div className="px-[10px] py-[10px] bg-black mr-2">
                            {" "}
                            31
                        </div>
                    </Link>
                    <Link href={"./"}>
                        <div className="px-[10px] py-[10px] bg-[#333232] mr-2">
                            {" "}
                            32
                        </div>
                    </Link>
                    <Link href={"./"}>
                        <div className="px-[10px] py-[10px] bg-black  hover:bg-[#bb6464] mr-2">
                            {" "}
                            33
                        </div>
                    </Link>
                    <Link href={"./"}>
                        <div className="px-[10px] py-[10px] bg-[#bb6464]  hover:bg-[#bb6464] mr-2">
                            {" "}
                            34
                        </div>
                    </Link> */}
                </div>
            </div>

            {/*  quảng cáo sp */}
            <div className="flex justify-center mb-3">
                <Image width='720' height='200' className="w-[720px] h-[200px] "  src="https://caodang.fpt.edu.vn/wp-content/uploads/2024/03/WEB-1900x750-1.png" alt="" />
            </div>
            {/* comment */}
            <Commentmv />
        </>
    );
}

export default WatchMovie;
