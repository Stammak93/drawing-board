let projMode = "development"
let projDevTool = "source-map"

if(process.env.NODE_ENV === "production") {
    mode = "production"
    projDevTool = undefined
}

const path = require("path")

module.exports = {
    mode: projMode,
    devtool: projDevTool,
    entry: './src/drawing.js',
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: 'bundle.js'
    },

    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        }
    }
}