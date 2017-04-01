var webpack = require("webpack");
var path = require("path");
var package = require(path.join(__dirname, "../../package.json"));
var tslintconfig = require(path.join(__dirname, "../../tslint.json"));

module.exports = {
    entry: {
        vendor: [
            "webpack/hot/dev-server",
            "webpack-hot-middleware/client",
            "babel-polyfill",
            "moment"
        ],
        app: [
            path.join(__dirname, "Index.tsx"),
        ],
    },

    output: {
        filename: "[name].js",
        hotUpdateChunkFilename: "[id].[hash].hot-update.js",
        hotUpdateMainFilename: "[hash].hot-update.json",
        path: __dirname + "/assets/scripts/",
        publicPath: "/assets/scripts/",
    },

    // Enable sourcemaps for debugging webpack"s output.
    devtool: "source-map",
    resolve: {
        modules: [
            path.join(__dirname),
            path.join(__dirname, "../shared"),
            "node_modules"
        ],
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            // Ex pre-loaders section
            {
                test: /\.ts(x?)$/,
                loader: "tslint-loader",
                exclude: /(node_modules)/,
                enforce: "pre",
                options: { tslintconfig, }
            },
            { test: /\.js$/, loader: "source-map-loader", enforce: "pre" },

            // Note that babel-loader is configured to run after ts-loader
            { test: /\.ts(x?)$/, loader: "babel-loader!ts-loader", exclude: /__tests__/ },
            { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: "file?name=assets/fonts/[name].[ext]" },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            { test: /\.(png|jpg|svg)/, loader: "file?name=assets/images/[name].[ext]" },
            { test: /\.css$/, loaders: ["style-loader", "css-loader"] },
            { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"] },
            { test: /\.json$/, loader: "json-loader" },

        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        // Define the environment variables
        new webpack.DefinePlugin({
            "Config": {
                "environment": JSON.stringify(process.env.NODE_ENV || "DEV"),
                "version": JSON.stringify(package.version),
            },
        }),

        // Implicitely splitting off all vendor libraries
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        })
    ],
};
