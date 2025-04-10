module.exports = {
  experimental: {
      turbo: false,
  },
  webpack: (config: any, isServer: any) => {
      config.experiments = {
          ...config.experiments,
          asyncWebAssembly: true, // Enable WebAssembly in Webpack
          topLevelAwait: true,
      };

      // For Web Workers, ensure proper file handling
      if (!isServer) {
          config.module.rules.push({
              test: /\.wasm$/,
              type: "asset/resource", // Adds WebAssembly files to the static assets
          });
      }

      return config;
  }
}