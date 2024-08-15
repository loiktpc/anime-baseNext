"use client";
import { FaMoneyBill, FaPassport, FaStore, FaUserEdit } from "react-icons/fa";
import Notification from "../../../components/notification";
import "./profile/profile.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Setting({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    console.log('pathname',pathname);
    
    const sidebar = [
        {
            title: "Hồ Sơ",
            icon: <FaUserEdit />,
            path: "/pages/client/setting/profile",
        },
        {
            title: "Đổi Mật Khẩu",
            icon: <FaPassport />,
            path: "/pages/client/setting/changepass",
        },
        {
            title: "Nạp xu",
            icon: <FaMoneyBill />,
            path: "/setting/profile",
        },
        {
            title: "Cửa Hàng",
            icon: <FaStore />,
            path: "/setting/profile",
        },
    ];
    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <Notification title="Hãy luôn truy cập tên miền AnimeHay.Tv để được chuyển hướng tới tên miền mới nhất kể cả khi bị chặn" />
            <div className="p-2  heading_movie flex justify-between items-center mb-3">
                <div className="text-[#f98d8d]">Kim Thanh Loi</div>
                <div>
                    {" "}
                    0 <FaMoneyBill className="inline-block" />{" "}
                </div>
            </div>
            <div className="flex">
                <div className="sidebar flex-1   text-[#cac9c9] ">
                
                
                    {sidebar.map((item, index) => {
                        return (
                            <Link
                                href={item.path}
                                key={index}
                            >
                                <div
                                    className={`w-full bg-[#1c1c1c]
                                                h-14 border-b-[0.5px] hover:bg-[#55918c] cursor-pointer border-[#cac9c9]
                                                flex items-center justify-center
                                                ${pathname  == `${item.path}` ? "bg-[#55918c]" : ""} `}
                                >
                                    <span className="mr-2">{item.icon}</span>{" "}
                                    {item.title}{" "}
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className="flex-[4] bg-[#404040] p-[10px]">{children}</div>
            </div>
        </section>
    );
}
