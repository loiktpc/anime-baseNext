/** @type {import('next').NextConfig} */
const nextConfig = {
  output : 'export',
  compress: true,
    images: {
        domains: ['firebasestorage.googleapis.com','caodang.fpt.edu.vn'],
        unoptimized: true 
      },
     
};

export default nextConfig;
