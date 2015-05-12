var path = require('path');
var webpack = require('webpack');

var nodeModulesDir = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(nodeModulesDir, 'react/dist/react.min.js');

module.exports = {
    entry: "./app/entry.js",
    //resolve: {
    //    alias: {
    //        'react': pathToReact
    //    }
    //},
    output: {
        path: __dirname+"/dist",
        publicPath: "/dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
            { test : /\.scss$/, loader: 'style!css!sass' },
            { test: /\.css$/, loader: "style!css" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff2" }
        ],
        noParse: [pathToReact]
    }

};
