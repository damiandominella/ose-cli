const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",

    entry: {
        // "com_ose_typescript": path.join(__dirname, "./src/com_ose_typescript/program.ts")
    },

    devtool: "source-map"

});