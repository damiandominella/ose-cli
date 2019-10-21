const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    mode: "production",

    entry: {
        // "com_ose_typescript": path.join(__dirname, "./src/com_ose_typescript/program.ts")
    },

    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                include: /\.js$/,  // /\.min\.js$/,
                exclude: /node_modules/,
            })
        ]
    },

});