const path = require('path');

module.exports = {

  mode: 'development',
  entry: {
    index: './view/index.js',
    doc: './view/doc.js',
    dynamicExport: './view/dynamicExport.js',
    main: './view/main.js',
    firestore: 'firebase/firestore',
    auth: 'firebase/auth'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '',
  },

};