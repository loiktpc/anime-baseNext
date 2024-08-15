import Image from 'next/image'
import ImgUser from '../../../../../public/img/hoa.jpg' ;
function ItemCommnetmv() {
    return ( <>
        <div className="ItemComment flex items-center">
            <div>
                <Image  className="w-14 " src={ImgUser} alt="" />
            </div>
            <div className="pl-3 flex-1">
                <p className="namecmt">Kim Thanh Loi</p>
                <p>
                Sáng 8.4, Sở KH-ĐT tỉnh Quảng Ngãi cho biết, từ năm 2020 đến nay, tỉnh Quảng Ngãi đã thu hồi hàng loạt dự án đầu tư ngoài ngân sách không đúng tiến độ như cam kết theo chủ trương đầu tư.
                </p>
                <p className="timecomment">
                    60 phút trước
                </p>
            </div>
        </div>
    </>  );
}

export default ItemCommnetmv;