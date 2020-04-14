// **** If you make changes to webpack, you need to kill the process on the terminal and run npm start again! ****

// test for it we are in development mode (package.json scripts tell whether to run in dev or test mode. Heroku would npm start and probably be in production mode)
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', //enables async-await
    './client/index.js', // where webpack will start bundling files from (highest level of client side)
  ],
  output: {
    // where webpack will put bundle.js when it finished
    path: __dirname,
    filename: './public/bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map', // displays original js when debugging (I think sometimes we call this bundle.map.js),
  module: {
    rules: [
      // rules/processing pipelines during bundling process
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader', // 'converts code written in modern flavors and supersets of JS into plain old JS code' - like JSX
      },
      {
        // use the style-loader/css-loader combos for anything matching the .css extension. This basically allows us to use multiple css files and webpack will combine it into one css file
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
