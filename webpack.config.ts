import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

const { AureliaPlugin } = require('aurelia-webpack-plugin');

let srcDir = path.resolve(__dirname, 'src');
let distDir = path.resolve(__dirname, 'dist');
let exampleDir = path.resolve(__dirname, 'example');

function configure(env: any, args: any): webpack.Configuration {
    let config: webpack.Configuration = {
        entry: {
            example: 'aurelia-bootstrapper'
        },

        output: {
            path: path.resolve(distDir, 'example'),
            filename: '[name]-[hash].js',
            chunkFilename: '[name]-[chunkhash].js'
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader'
                },
                {
                    test: /\.html$/,
                    use: 'html-loader'
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader?sourceMap',
                            'sass-loader?sourceMap'
                        ]
                    })
                }
            ]
        },

        resolve: {
            extensions: [
                '.js',
                '.ts'
            ],
            modules: [
                'node_modules',
                exampleDir
            ],
            alias: {
                'aurelia-split-pane': srcDir,
                'aurelia-split-pane$': path.resolve(srcDir, 'index.ts')
            }
        },

        plugins: [
            new AureliaPlugin(),
            new ExtractTextPlugin('[name]-[contenthash].css'),
            new HtmlWebpackPlugin({
                template: path.resolve(exampleDir, 'index.html')
            })
        ],

        devServer: {
            stats: 'errors-only'
        }
    };

    if (args.mode === 'development') {
        config.devtool = 'inline-source-map';
    }

    return config;
}

export default configure;
