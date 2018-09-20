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
	
更新（2018-09-09）：
  
	1.修改游戏库页面ui（添加hover效果，能展示更多的游戏信息）
	2.实现游戏库的分页查询（有一点需要注意一下：因为添加游戏/更新游戏是以路由跳转的方式实现的，所以跳转的时候需带上分页的参数，
	否则在保存游戏/取消保存游戏的时候无法记录分页信息，会跳到第一页）

阶段总结与下一步计划（2018-09-09）：
   后台管理这部分，到今天写了有20天了，从登录到用户评论、访问日志再到游戏库页面大体也都完成了，其中或多或少会有些不完善的地方，但不管怎样也都算坚持下来了，从中既巩固了以往用到过的知识也学到了很多从未尝试过的东西。接下来呢，首先计划用5天时间（0910-0914）继续优化下游戏库，添加个平台字段，为今后管理ps4 xbox平台游戏做准备；在筛选栏中添加相应的筛选（是否发售、发售时间、游戏平台、游戏类型、游戏名称搜索）；对游戏列表进行排序（可根据游戏评分、发售时间等）；用vuex保存登录用户的信息为后期权限管理做准备。
   等这些完成了，准备先把后台管理放一放，继续前台小程序的开发。

更新（2018-09-10）：
  
	1.利用vuex保存登录用户的信息（为今后的权限管理做准备），具体实现过程是用户成功登录后将后端返回的用户信息保存到vuex与localstorage中，
	如果用户处于登录状态中，则将localstorage中的用户信息保存到vuex中。

重要更新（2018-09-11）：
  
	1.实现用户的权限功能，现在只是根据用户信息中的isAdmin字段做的整体限制，后期在细化到具体功能的权限。
		具体实现是利用vue的自定义指令，创建了v-permission指令，这个指令的内容就是根据存在localstorage中的
		用户信息来判断用户是否有管理权限，如果没有和话则添加is-disabled的class与disable的attr。使用时把指令加在相应button上就可以了。
	仔细想了想，这种方法感觉不是很好，后期打算改成如果本地有token的话，会调一个判断登录状态的接口，这样就不用把用户信息存到本地了。
	2.实现游戏库关键词搜索的功能

更新（2018-09-12）：
  
	1.实现游戏列表的排序功能。
	2.修改了在添加游戏页面点击保存/取消按钮后跳转到游戏里列表分页和筛选没有回显的问题（感觉把筛选项都提出来放在一个组件中，写着忒费劲，回头得改一下）。
	3.修正在用户登录状态下（本地存有token）不应该能跳转到login页面的问题。


更新（2018-09-13）：
  
	1.修改筛选值丢失的问题
	2.添加游戏平台字段，在游戏列表筛选中添加游戏平台、游戏类型、是否发售的选项。

更新（2018-09-14）：
  
	1.优化首页白屏时间（将依赖从cdn引用）
	2.利用Jenkins完成自动编译部署。

更新（2018-09-18）：
  
	1.修改图片展示的bug
	2.添加游戏语言字段

更新（2018-09-19）：
  
	1.添加游戏类型管理、游戏厂商管理页面（为了更好维护这几个字段）
	2.修改分页bug

更新（2018-09-20）：
  
	1.初步完成游戏公司管理页面
	2.实现游戏公司列表的展示，删除功能



  
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
