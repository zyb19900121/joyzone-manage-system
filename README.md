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

重要更新（2018-09-02）：
  
	1.给这一套项目起了个名字（很早就有这个打算，无奈一直没有什么灵感，正好今天是跟媳妇在一起520天，就结合我俩名字首字母起个吧）。
	2.媳妇帮忙给做了个logo，先凑合用吧，哈哈，反正就我自己看。
	3.优化路由、增加添加游戏路由（本计划这个周末写完的，谁料这改改那修修的时间就这么过去了，争取下周一到周五抽时间给完成的）。

重要更新（2018-09-03）：
  
	1.实现了文件上传功能，在UserService中写了个单独的POST请求-uploadRequest，与普通post请求的区别是，
	Content-Type是"multipart/form-data"类型的传参的时候是	
		let param = new FormData(); //创建form对象
    	param.append("file", data.file); //通过append向form对象添加数据

小更新（2018-09-05）这几天太忙了 实在没时间写啊：

	1.优化添加游戏中上传封面的功能，新增了一个参数（type）目的是让后台根据这个参数来确定图片保存的目录。如不传这个参数会将图片传到默认文件夹下
	发现个问题，上传图片是已formdata类型传输数据的，文件的param必须是在其他参数之后，后端还能获取的到
		egg官方文档的说明
			只支持上传一个文件。
			上传文件必须在所有其他的 fields 后面，否则在拿到文件流时可能还获取不到 fields。

更新（2018-09-06）：
  
	1.实现了游戏添加与删除功能（感觉物理删除不是很好，后期打算添加个是否删除字段）
	2.添加游戏中，时间控件不知道为什么传时间戳后端会报错（不是一个有效的datetime）所以传的是字符串。（以后再看有没有优化的必要）

更新（2018-09-07）：
  
	1.针对restful api（没在query中传参数，例如这样url/id的形式） 修改了http请求的文件，
	2.优化添加游戏功能
	3.实现了修改游戏功能（userService.putRequest）
	


  
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
