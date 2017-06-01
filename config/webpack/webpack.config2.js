var webpack= require('webpack');


module.exports = {
    //插件项
    //plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        //avalon: './src/avalon', //我们开发时的入口文件
        //'avalon.modern': './src/avalon.modern',
        //'avalon.test': './src/avalon.test',
        //'avalon.next': './src/avalon.next',
        'ab': './app/static/Ab'
    },
    //入口文件输出配置
    output: {
        path: __dirname +'/dist',
        filename: '[name].js'
    },
    module: {
            loaders: [
                /*如果你需要 使用es6
                {   test: /\.js$/,
                    exclude: /node_modules/, //排除文件夹
                    loader: 'babel', //解析 es6
                    query:{
                        presets:['es2015']
                    }
                },*/
//              {
//                  test: /\.css$/,
//                  loader: ExtractTextPlugin.extract('style', 'css')
//              },{
//                  test:/\.scss$/,
//                  // loaders: ['style', 'css', 'sass']
//                  loader: ExtractTextPlugin.extract("css!sass")
//              },
				{
                    test: /\.html$/,
                    loader: "html-loader?-minimize" //避免压缩html,https://github.com/webpack/html-loader/issues/50
                },{
                    test: /\.(woff|woff2|ttf|eot|svg)(\?t=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader?name=_fonts/[name].[ext]' //这里前缀路径 publicPath 参数为基础
                },{
                    test: /\.(png|jpe?g|gif)$/,
                    loader: 'url-loader?limit=8192&name=_images/[name]-[hash].[ext]' //这里前缀路路径 publicPath 参数为基础
                }
            ]
        },
    
};


