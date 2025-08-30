let path = require('path')
let withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
let { i18n } = require('./next-i18next.config')

module.exports = withBundleAnalyzer({
  // output: 'export',
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  eslint: {
    dirs: ['components', 'constant', 'layouts', 'libs', 'pages', 'scripts', 'utils'],
    ignoreDuringBuilds: true,
  },
  webp: {
    preset: 'default',
    quality: 100,
  },
  images: {
    domains: [
      'i.scdn.co',
      'images.unsplash.com',
      'thangchiba-storage.s3.ap-northeast-1.amazonaws.com',
    ],
  },
  typescript: { 
    tsconfigPath: './tsconfig.json',
    ignoreBuildErrors: true,
  },
  i18n,
  trailingSlash: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    config.module.rules.push({
      test: /\.json$/,
      use: [options.defaultLoaders.babel],
      include: path.resolve(__dirname, 'public/locales'),
    })

    return config
  },
})
