/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Change from 'standalone' to 'export'
  images: {
    unoptimized: true,
    domains: [
      "i.pinimg.com",
      "www.excelsior.com.mx",
      "static.toiimg.com",
      "images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com",
      "hips.hearstapps.com",
      "palotoaamazontravel.com",
      "u4d2z7k9.rocketcdn.me",
      "scx2.b-cdn.net",
      "static.dw.com",
      "image.cnbcfm.com",
      "i.natgeofe.com",
      "www.butlernature.com",
      "arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com",
      "www.greenpeace.org",
      "www.travelandleisure.com",
      "storage.googleapis.com",
      "encrypted-tbn0.gstatic.com",
      "upload.wikimedia.org"
    ],
  },
  webpack(config, options) {
    // Adding rule for audio files (MP3, WAV, OGG)
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/sounds/",
          outputPath: "static/sounds/",
          name: "[name]-[hash].[ext]",
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
