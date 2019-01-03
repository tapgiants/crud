const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  // Use for debug
  // optimization: {
  //   namedModules: true
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'react-apollo': path.resolve(__dirname, './node_modules/react-apollo'),
      'apollo-boost': path.resolve(__dirname, './node_modules/apollo-boost'),
      'graphql': path.resolve(__dirname, './node_modules/graphql'),
      '@tapgiants/form': path.resolve(__dirname, './node_modules/@tapgiants/form'),
      'recompose': path.resolve(__dirname, './node_modules/recompose')
    }
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    },
    'react-apollo': {
      commonjs: 'react-apollo',
      commonjs2: 'react-apollo',
      amd: 'react-apollo'
    },
    'apollo-boost': {
      commonjs: 'apollo-boost',
      commonjs2: 'apollo-boost',
      amd: 'apollo-boost'
    },
    'apollo-cache-inmemory': {
      commonjs: 'apollo-cache-inmemory',
      commonjs2: 'apollo-cache-inmemory',
      amd: 'apollo-cache-inmemory'
    },
    recompose: {
      commonjs: 'recompose',
      commonjs2: 'recompose',
      amd: 'recompose'
    },
    'graphql': {
      commonjs: 'graphql',
      commonjs2: 'graphql',
      amd: 'graphql'
    },
    '@tapgiants/form': {
      commonjs: '@tapgiants/form',
      commonjs2: '@tapgiants/form',
      amd: '@tapgiants/form'
    },
    '@tapgiants/graphql': {
      commonjs: '@tapgiants/graphql',
      commonjs2: '@tapgiants/graphql',
      amd: '@tapgiants/graphql'
    }
  }
};
