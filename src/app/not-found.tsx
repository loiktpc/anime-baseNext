import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h1>không tìm thấy nội dung</h1>
      <p>Không thể tìm thấy tài nguyên được yêu cầu</p>
      <Link href="/">trở về nhà</Link>
    </div>
  )
}