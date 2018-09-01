# my-game-system
本项目是微信小程序myGame的后台管理系统，主要用于对小程序中的数据进行增删改查

框架：vue（利用vue-cli 3.0搭建）
UI：[element-ui][element-ui]

路由拦截的实现是利用全局的路由守卫根据localstorage中的token（用户登陆从后端获取，具体可以看本人的node项目）是否存在进行拦截

http拦截的实现是将localstorage中的token放到请求的header中，在后端对token进行校验，如果token无效返回401


更新（2018-08-25）：
  
	1.将子页面中的el-footer进行了封装并包含了分页功能，大量减少了重复的代码 具体可参考src/compnents/Subfooter
	2.对公司vue项目中UI部分进行了反思（当时写的较差），进而优化了本项目UI的整体布局
	3.优化了登录页面的样式（利用vue-particles插件），后期还需再继续完善
  
小更新（2018-08-26）：
  
	1.实现了对log列表的单条删除和多条删除（封装在了Subfooter组件中），因接口是RESTful风格，
	  所以稍微修改了下参数的传输方式 axios.delete(`${url}/${params}`, config) 
	  整个实现流程需要注意的有一个地方，当列表全选且不是列表的第一页执行多条记录的删除时，得将查询参数中的currentPage - 1。
	
更新（2018-08-30）：
  
	1.实现评论列表 （筛选、列表项待完善）
	2.封装列表条件查询组件（conditionFilter）
	3.实现评论和访问日志的的时间段筛选（如根据条件查询 应调用subFoot组件中的ininPageConfig方法来重置分页参数）

更新（2018-09-01）：
  
	1.实现根据游戏对评论列表进行筛选（conditionFilter）
	2.优化侧边栏样式及路由

  
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
