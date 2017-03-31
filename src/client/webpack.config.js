var webpack = require("webpack");
var path = require("path");
var package = require(path.join(__dirname, "../../package.json"));

module.exports = {
    entry: [
        "webpack/hot/dev-server",
        "webpack-hot-middleware/client",
        "babel-polyfill",
        path.join(__dirname, "Index.tsx"),
    ],

    output: {
        filename: "dist.js",
        hotUpdateChunkFilename: "[id].[hash].hot-update.js",
        hotUpdateMainFilename: "[hash].hot-update.json",
        path: __dirname + "/assets/scripts/",
        publicPath: "/assets/scripts/",
    },

    // Enable sourcemaps for debugging webpack"s output.
    devtool: "source-map",
    resolve: [
        path.join(__dirname, "client"),
        path.join(__dirname, "../shared"),
        "node_modules"
    ],
    resolve: {
        // Add ".ts" and ".tsx" as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        modulesDirectories: ["node_modules"]
    },
    module: {
        loaders: [
            // All files with a ".ts" or ".tsx" extension will be handled by "ts-loader".

            // Note that babel-loader is configured to run after ts-loader
            { test: /\.ts(x?)$/, loader: "babel-loader!ts-loader", exclude: /__tests__/ },
            { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: "file?name=assets/fonts/[name].[ext]" },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            { test: /\.(png|jpg|svg)/, loader: "file?name=assets/images/[name].[ext]" },
            { test: /\.css$/, loaders: ["style", "css"] },
            { test: /\.scss$/, loaders: ["style", "css", "sass"] },
            { test: /\.json$/, loader: "json-loader" },
        ],

        preLoaders: [
            // All output ".js" files will have any sourcemaps re-processed by "source-map-loader".
            { test: /\.js$/, loader: "source-map-loader" },
            { test: /\.ts$/, loader: "tslint" },
        ]
    },

    // Here you can reference externally loaded stuff
    // externals: {}

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(), // recommended by webpack
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // new webpack.optimize.UglifyJsPlugin(), --> error: not a good suport for ES6
        // new webpack.optimize.DedupePlugin(), --> error: No template for dependency: TemplateArgumentDependency
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        // Define the environment variables
        new webpack.DefinePlugin({
            "Config": {
                "environment": JSON.stringify(process.env.NODE_ENV || "DEV"),
                "version": JSON.stringify(package.version),
            },
        }),
    ],

    tslint: {
        configuration: require("../../tslint.json"),
    },
};
