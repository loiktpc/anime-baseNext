"use client";
import "./detailProduct.scss";
import ItemInfoMovie from "./itemInfomv";
import ActionBtn from "./actionmv";
import ItemTap from "./Itemtapmv";
import Commentmv from "./comment";
import LinkMovie from "./linkmv";
import Notification from "../../../components/notification";
import useSWR from "swr";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import ProgressDemo from '../../../components/progress' ;
import Image from "next/image";

function DetaiProduct() {
    const searchParams = useSearchParams();
    const idmv = searchParams.get("id");

    // const data = await getData(idmv)

    const fetcher = (url: string) => axios.get(url).then((res) => res.data);
    const { data, error, isLoading } = useSWR(
        `https://phimlau-509fd-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${idmv}.json`,
        fetcher,
        {
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    );
    console.log("check ", idmv);

    if (error) return "An error has occurred.";
    if (isLoading) return <ProgressDemo />;
    return (
        <>
            <div>
                <Notification title="Hãy luôn truy cập tên miền AnimeHay.Tv để được chuyển hướng tới tên miền mới nhất kể cả khi bị chặn" />
                <h3 className="p-3 text-center heading_movie">
                    {data && data?.name}
                </h3>
                <div className="ContentAnime_wapper ">
                    <div className="first">
                        <Image
                                width="188"
                                height="245"
                            className="imgAnime"
                            src={data && data?.img}
                            alt=""
                        />
                    </div>
                    <div className="ml-2 cuoi">
                        {data?.category.map((e: any, index: number) => {
                            return <ItemInfoMovie key={index} data={e} />;
                        })}
                    </div>
                </div>
            </div>
            {/* Action btn */}
            <ActionBtn />
            {/* phần tiếp theo  */}
            {data?.next_part && <LinkMovie data={data?.next_part} />}
            {/* <LinkMovie  data={data?.next_part} /> */}
            {/*  list tập Và content movie  */}
            <div className="body mb-3">
                <div className="listTap">
                    <div className="mb-3">
                        <h4>Danh Sách Tập</h4>
                    </div>
                    <div className="listItem">
                        {data &&
                            data?.practice.map((e: any, index: number) => {
                                return (
                                    <ItemTap key={index} data={e} idmv={idmv} />
                                );
                            })}
                    </div>
                </div>
                <div className="contentmv">
                    <div>
                        <h4 className="NoiDung">Nội Dung</h4>
                    </div>
                    <div>
                        <div>
                            <strong className="SetLich">
                                PHIM ĐƯỢC CẬP NHẬT 1 TẬP MỖI TRƯA THỨ 2 HÀNG
                                TUẦN
                            </strong>
                        </div>
                        {/* renderbai viet  */}
                        <div className="noidungmv">{data && data?.content}</div>
                    </div>
                </div>
            </div>
            {/* comment */}
            <Commentmv />
        </>
    );
}

export default DetaiProduct;
