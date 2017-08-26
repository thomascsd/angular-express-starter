module.exports = {
    staticFileGlobs: [
      './server/dist/**.html',
      './server/dist/**.js',
      './server/dist/**.css',
      './server/dist/assets/images/*',
      './server/dist/assets/icons/*'
    ],
    root: './server/dist',
    stripPrefix: './server/dist/',
    navigateFallback: '/index.html'
  };
  