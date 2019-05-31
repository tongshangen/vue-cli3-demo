//去console插件
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
//gzip压缩插件
const CompressionWebpackPlugin = require("compression-webpack-plugin");
//打包分析
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
let path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  // 输出文件目录
  outputDir: "dist",
  assetsDir: "",
  filenameHashing: true,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: process.env.NODE_ENV !== "production",
  //是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true, // 生产环境下css 分离文件
  //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建
  parallel: require("os").cpus().length > 1,
  chainWebpack: config => {
    //设置别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@api", resolve("src/api/api")) //接口地址
      .set("@common", resolve("src/common"));
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV == "production") {
      // 为生产环境修改配置...
      config.plugins.push(
        //添加代码压缩工具，及设置生产环境自动删除console
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              // warnings: false,
              drop_debugger: true,
              drop_console: true
            }
          },
          sourceMap: false,
          parallel: true
        }),
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8
        }),
        new BundleAnalyzerPlugin()
      );
    } else {
      // 为开发环境修改配置...
    }
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: process.env.NODE_ENV === "production",
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      },
      //定义scss全局变量
      sass: {
        data: `@import "@/style/global.scss";`
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    // overlay: {
    //   warnings: true,
    //   errors: true
    // },
    proxy: {
      //配置跨域
      "/api": {
        // target: process.env.VUE_APP_BASE_API, //
        target: "http://localhost:7001/",
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          "^/api": "" //请求的时候使用这个api就可以
        }
      }
    }
  }
};
