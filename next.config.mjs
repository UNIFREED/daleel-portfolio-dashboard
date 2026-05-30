/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
};

export default nextConfig;