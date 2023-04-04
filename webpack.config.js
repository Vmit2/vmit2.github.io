const WebpackPwaManifest = require("webpack-pwa-manifest");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = {
  // ...
  plugins: [
    // ...
    new WebpackPwaManifest({
      name: "GPS Tracker",
      short_name: "GPS Tracker",
      description: "GPS Tracker App",
      background_color: "#ffffff",
      theme_color: "#000000",
      icons: [
        {
          src: path.resolve("src/assets/icon.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          purpose: "maskable",
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
