const path = require('path');

module.exports = {
  
  mode: 'development',
  entry: {
    index: './view/index.js',
    doc: './view/doc.js',
    firestore: 'firebase/firestore',
    auth: 'firebase/auth'
  },
   output: {
    filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },

};