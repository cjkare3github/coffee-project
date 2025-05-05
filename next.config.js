const nextConfig = {
  output: 'export',
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com']
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;