# Notion-Clone (BOLD)

It just a Notion Alternative i made.

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

8. dynamic import (code splittings)

```
const path = require('path');

module.exports = {

  mode: 'development',
  entry: {
    index: './view/index.js',
    doc: './view/doc.js',
    // add a file each time necessory
    firestore: 'firebase/firestore',
    auth: 'firebase/auth'
  },
   output: {
    filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     publicPath: '',
   },

};
```

9. `npm run start` for devepolment temp build


10. webpack5-automatic-publicpath-is-not-supported-in-this-browser (solved)

```
output: {
  publicPath: '',
}
```

11. webpack production ready

`webpack --mode production`

```
"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"build": "webpack",
		"start": "webpack serve",
		"production" : "webpack --mode production"
	},
```