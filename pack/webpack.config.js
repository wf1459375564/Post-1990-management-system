const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),//生成打包后新的html文件
    {CleanWebpackPlugin} = require('clean-webpack-plugin'),//清除上一次的打包文件
        MiniCssExtractPlugin = require('mini-css-extract-plugin'),//分离打包后新的css
    {VueLoaderPlugin} = require("vue-loader");
module.exports = {

    entry: path.resolve(__dirname, '../src/index.js'),//这是入口
    output: {//这是出口
        path: path.resolve(__dirname, '../dist/'),
        filename: 'main.js',
        publicPath: "/"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            filename: path.resolve(__dirname, '../dist/index.html'),
            minify: {removeAttributeQuotes: true},
            favicon :  path.resolve(__dirname, '../src/favicon.ico'),
        }),
        new MiniCssExtractPlugin({filename:'css/min.css'}),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: ["@babel/plugin-transform-runtime"],
                        }
                    }
                ],
                exclude: /node_modules/,//排除不打包的路径
                include: path.join(__dirname, '../src'),//要打包哪个文件的路径
            },
            //css
            {
                //*test 正则表达式的匹配
                test:/\.css$/,
                //*use 用什么loader加载
                use:[ {
                    loader: MiniCssExtractPlugin.loader
                },
                    'css-loader',
                    {
                        loader: "postcss-loader", options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                    ]
                                ],
                            }
                        }
                    }]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'less-loader',
                    {
                        loader: "postcss-loader", options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                    ]
                                ],
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: 'images/[name][hash].[ext]',
                        esModule: false
                    },

                },

            },
            {
                test: /\.vue$/,
                use: {
                    loader: "vue-loader",
                    options: {
                        transformAssetUrls: {
                            video: ['src', 'poster'],
                            source: 'src',
                            img: 'src',
                            image: ['xlink:href', 'href'],
                            use: ['xlink:href', 'href']
                        },//vue的src属性
                        compiler: require("vue-template-compiler"),//这是在单页面中的template使用
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        //通过别名进行映射
        alias: {
            '@vue' :'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src')
        }
    }


};