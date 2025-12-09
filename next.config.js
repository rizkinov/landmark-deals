/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  // Exclude pptxgenjs from being bundled - it will be loaded at runtime
  serverExternalPackages: ['pptxgenjs'],
  webpack: (config, { isServer }) => {
    // Handle pptxgenjs which uses node: protocol internally
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        stream: false,
        https: false,
        http: false,
        zlib: false,
      }
      // Completely ignore pptxgenjs in browser bundle - we'll load it via script
      config.externals = config.externals || []
      if (Array.isArray(config.externals)) {
        config.externals.push('pptxgenjs')
      }
    }
    return config
  }
};

export default nextConfig; 