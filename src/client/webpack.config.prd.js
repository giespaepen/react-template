var webpack = require("webpack");
var path = require("path");
var config = require("./webpack.config.js");

// Adapt the config for production purposes

// Change the entry points
config.entry.vendor = config.entry.vendor.filter(function (x) {
    return x.indexOf("webpack") == -1;
});

// Push a minification plugin
config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));

// Change the output file
config.output.filename = config.output.filename.replace(".js", ".min.js");

// Push a node env plugin to let react know it's minnified
config.plugins.push(
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }));

// Delete devtools and devserver if any
delete config.devtool;
delete config.devServer;

module.exports = config;