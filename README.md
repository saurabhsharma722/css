# Let's Learn Webpack 2

1 ) npm init -y (this will create package.json)
2 ) yarn add -D webpack (this will add node_modules)
  2.1) create file webpack.config.js
  2.2) create two folder dist and src.
  2.3) under dist creat index.html and under src create index.js
  2.4) add <script src="bundle.js"> in index.html
  2.5) add `
      const path = require('path');

      module.exports = {
        entry: './src/index.js',
        output: {
          filename: 'bundle.js',
          path: path.resolve(__dirname, 'dist')
        }
      };
      `
  2.6) in package.json replace
      "test": "echo \"Error: no test specified\" && exit 1" with
      "build": "webpack"
  2.7) yarn run build
3 ) yarn add -D style-loader css-loader
  3.1) update webpack.config.js file by adding 'module'
      module.exports = {
        entry: './src/index.js',
        output: {
          filename: 'bundle.js',
          path: path.resolve(__dirname, 'dist')
        },
        module: {
          rules: [
            {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader'
              ]
            }
          ]
        }
      };
  3.2) create style file under `src/css`
    import './css/style.css'; inside src/index.js
    
4 ) yarn add -D sass-loader node-sass
  4.1) update webpack.config.js file by adding 'module' rule add 
    {
      test: /\.scss$/,
      use: [
        {loader: 'style-loader'},
        {loader: 'css-loader'},
        {loader: 'sass-loader'}
      ]
    }

5 ) yarn add -D babel-loader babel-core
  5.1 ) yarn add -D babel-preset-env
  5.2) update webpack.config.js file by adding 'module' rule add 
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }
6 ) In case you can to add watch
    6.1 ) update scripts inside package.json by adding
      "watch": "webpack --watch"
    6.2 ) webpack --watch
7 ) yarn add -D postcss-loader
  7.1 ) yarn add -D rucksack-css lost autoprefixer cssnano
  7.2 ) create file postcss.config.js
  7.3 ) Add `
      module.exports = {
        plugins: {
          'rucksack-css': {},
          'lost': {},
          'autoprefixer': {},
          'cssnano': {}
        }
      };
   `
  7.4 ) update webpack.config.js 
      `
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      ` 
      and
      `
      use: [
        {loader: 'style-loader'},
        {loader: 'css-loader'},
        {loader: 'postcss-loader'},
        {loader: 'sass-loader'}
      ]`
8 ) yarn add -D extract-text-webpack-plugin
  8.1 ) under webpack.config.js add 
    `const extractWebpackPlugin = require('extract-text-webpack-plugin');`
  8.2 ) repalce css and sass rules
      `{
        test: /\.css$/,
        use: extractWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        use: extractWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },`
  8.3 add plugins after module
      plugins: [
        new extractWebpackPlugin('bundle.css')
      ]
  8.4 add link to add css file
    `<link rel="stylesheet" href="bundle.css">`
