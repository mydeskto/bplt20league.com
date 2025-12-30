/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static export, but we manually optimize images
  },
  trailingSlash: true, // This helps with static hosting
  // Disable Turbopack for production builds to avoid chunk loading issues
  // Use regular webpack for more stable static exports
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'react-icons',],
    optimizeCss: true,
  },
  // Additional performance optimizations
  // Note: swcMinify is enabled by default in Next.js 15, no need to specify
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? true : false, // Keep console logs in development for debugging
  },
  // Optimize production builds
  productionBrowserSourceMaps: false, // Disable source maps in production for smaller bundles
  poweredByHeader: false,
  compress: true,
  // Note: Cache headers are handled via .htaccess for static export
  // Headers function is not supported with output: 'export'
  
  // Turbopack configuration for faster builds
  turbopack: {
    // Resolve aliases (if needed)
    resolveAlias: {},
    root: __dirname,
    // Resolve extensions
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },
  
  // Webpack optimizations for better code splitting (fallback for non-Turbopack builds)
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Framer Motion chunk
          framerMotion: {
            name: 'framer-motion',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            priority: 40,
          },
          // React Icons chunk
          reactIcons: {
            name: 'react-icons',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]react-icons[\\/]/,
            priority: 30,
          },
          // Lucide React chunk
          lucideReact: {
            name: 'lucide-react',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            priority: 30,
          },
          // Radix UI chunk
          radixUI: {
            name: 'radix-ui',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            priority: 25,
          },
          // Common vendor libraries
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
          },
        },
      };
    }
    return config;
  },
}

module.exports = nextConfig