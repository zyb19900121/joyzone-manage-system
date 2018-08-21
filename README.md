# my-game-system
本项目是微信小程序myGame的后台管理系统，主要用于对小程序中的数据进行增删改查

框架：vue（利用vue-cli 3.0搭建）
UI：[element-ui][element-ui]

路由拦截的实现是利用全局的路由守卫根据localstorage中的token（用户登陆从后端获取，具体可以看本人的node项目）是否存在进行拦截

http拦截的实现是将localstorage中的token放到请求的header中，在后端对token进行校验，如果token无效返回401

未完待续。。。



## 项目依赖安装
```
npm install
```

### 项目运行
```
npm run serve
```

### 项目打包
```
npm run build
```

[element-ui]: http://element-cn.eleme.io/2.4/#/zh-CN/component/installation 
