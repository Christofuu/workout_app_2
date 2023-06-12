const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "main.js",
        publicPath: "/"
    },


    target: "web",
    devServer: {
        port: "3000",
        static: ["./public"],
        open: true,
        hot: true,
        liveReload: true,
        historyApiFallback: true
    },

    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts"],
        alias: {
            core: path.join(__dirname, 'core'),
        },
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    }
                ],
                include: /\.module\.css$/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                exclude: /\.module\.css$/,
            }

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};