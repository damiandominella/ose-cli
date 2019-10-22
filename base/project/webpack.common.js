const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

let moduleName = process.argv[5];

let entry = {};
entry[moduleName] = path.join(__dirname, './src/' + moduleName + '/' + moduleName + '.ts');

let copyOptions = [{
    from: 'src/' + moduleName + '/package.json',
    to: moduleName + '/package.json'
}];

console.log('Compiling ' + moduleName + '...');

module.exports = {
    entry: entry,
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: '[name]/program/index.js'
    },
    plugins: [
        new CopyPlugin(copyOptions),
    ],
    module: {
        rules: [
            {
                exclude: /node_modules/,
                // test: /\.tsx?$/,
                use: 'ts-loader'
            },
            {
                exclude: /node_modules/,
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader' // Creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader' // Translates CSS into CommonJS
                    },
                    {
                        loader: 'sass-loader' // Compiles Sass to CSS
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};