const path = require('path');

module.exports = {
  
  mode: 'development',
  entry: {
    index: './view/index.js',
    another: 'firebase/auth',
  },
   output: {
    filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },

};