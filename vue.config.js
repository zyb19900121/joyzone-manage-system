// vue.config.js
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 选项...

  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html"
    }
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/subpage/main.js'
  },

  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("src", resolve("src"))
      .set("http", resolve("src/http"))
      .set("views", resolve("src/views"))
			.set("components", resolve("src/components"))
			.set("utils", resolve("src/utils"));
  },

  devServer: {
    open: process.platform === "darwin",

    host: "localhost",

    port: 9000,

    https: false,

    hotOnly: false,

    proxy: null, // 设置代理

    before: app => {}
  },

  // 第三方插件配置

  pluginOptions: {
    // ...
  }
};
