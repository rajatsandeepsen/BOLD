# Notion-Clone

1. `npm install webpack --save-dev`

2. `npm install webpack-cli --save-dev`

3. add build script webpack in package.json file

4. `"build": "webpack"` And save

5. create `webpack.config.js`

6. add this to webpack.config.js

```const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
```

7. `npm run build`
