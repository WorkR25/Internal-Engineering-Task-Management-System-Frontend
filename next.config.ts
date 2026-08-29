const nextConfig = {
  allowedDevOrigins: ["192.168.0.103"],

  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: "http://localhost:2000/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;