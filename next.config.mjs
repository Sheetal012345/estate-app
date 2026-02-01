/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "gzenznyfpxhircppnfgl.supabase.co", // 👈 ADD THIS
      "oxmjhfazlafqrhawl.supabase.co",
      "img.clerk.com",
    ],
  },
};

export default nextConfig;
