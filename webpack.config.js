const path = require('path');

module.exports = {
  entry: process.env.NODE_ENV === 'production' ?  './src/client/index.tsx' : './src/index.tsx',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: process.env.NODE_ENV === 'production' ? path.resolve(__dirname, 'src', 'client', 'dist') : path.resolve(__dirname, 'dist'),
    publicPath: '/assets/'
  },
  devServer: {
    port: 3001,
    allowedHosts: 'all',
  }
};
