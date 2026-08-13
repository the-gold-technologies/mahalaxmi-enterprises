/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.hplubricants.in',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/how-to-choose-the-right-diesel-engine-oil-for-your-vehicle',
        destination: '/blogs/how-to-choose-the-right-diesel-engine-oil-for-your-vehicle',
      },
      {
        source: '/how-often-should-you-change-your-automotive-engine-oil',
        destination: '/blogs/how-often-should-you-change-your-automotive-engine-oil',
      },
      {
        source: '/15w-40-oil-and-types',
        destination: '/blogs/15w-40-oil-and-types',
      },
      {
        source: '/transformer-oil-types-properties-and-uses',
        destination: '/blogs/transformer-oil-types-properties-and-uses',
      },
      {
        source: '/bike-engine-oil',
        destination: '/blogs/bike-engine-oil',
      },
      {
        source: '/synthetic-engine-oil-types-properties-and-uses',
        destination: '/blogs/synthetic-engine-oil-types-properties-and-uses',
      },
      {
        source: '/the-best-engine-oil-for-your-bike',
        destination: '/blogs/the-best-engine-oil-for-your-bike',
      },
    ];
  },
};

export default nextConfig;
