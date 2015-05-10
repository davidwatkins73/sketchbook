var path = require('path');
var webpack = require('webpack');

var nodeModulesDir = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(nodeModulesDir, 'react/dist/react.min.js');



module.exports = {
    entry: "./app/entry.js",
    resolve: {
        alias: {
            'react': pathToReact
        }
    },
    output: {
        path: __dirname+"/dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.jsx?$/, loader: 'babel', exclude : [nodeModulesDir] },
            { test : /\.scss$/, loader: 'style!css!sass' }
        ],
        noParse: [pathToReact]
    }

};
