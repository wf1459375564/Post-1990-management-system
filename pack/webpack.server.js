const {merge} = require('webpack-merge'),
    config = require('./webpack.config'),
    path = require('path');

module.exports = merge(config, {
    mode: "development",
    devtool:"eval-cheap-module-source-map",
    devServer: {
        port: 8888,
        compress: true,//是否压缩
        hot: true,//是否热加载
        proxy: {//配置本地代理
            "/api" :{
                target : "http://localhost:3030",//配置的是这个地址,
                pathRewrite: {
                    "/api" : '',//往后台发送的时候去掉api
                }
            }
        }
    },

});


