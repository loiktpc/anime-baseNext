import { FaComment, FaRoute } from "react-icons/fa";
import ItemCommnetmv from './Itemcommnet'
function Commentmv() {
    return ( <>
         <div className="containercommnet mb-3 rounded-xl p-3">
                <div className="flex justify-between">
                    <div className="flex items-center font-semibold"> <FaComment className="mr-2 " /> Bình Luận (1231)</div>
                    <div className="w-6 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path fill="#a7a7a7" d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
                        </svg>
                    </div>
                </div>
                <div className="text-center" >
                    <button className="btnLogin p-2 rounded-sm">

                    Đăng Nhập Để Bình Luận
                    </button>
                </div>
                <div className="listcomment mt-3">

                <ItemCommnetmv />   
                <ItemCommnetmv />   
                <ItemCommnetmv />   
                <ItemCommnetmv />   
                </div>
               <div className="flex justify-center"> <button className="p-2 bg-sky-800 w-full text-gray-400 font-semibold">

               Tải Thêm Bình Luận</button></div>
            </div>
    </> );
}

export default Commentmv;