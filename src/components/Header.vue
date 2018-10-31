<template>
	<el-menu :default-active="$route.matched[1].path" class="el-menu-demo" mode="horizontal" router background-color="#409EFF" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
		<img class="logo" src="../assets/img/logo_top.png" alt="" srcset="">
		<el-submenu index="1">
			<template slot="title">游戏管理</template>
			<el-menu-item index="/gameManage">游戏库</el-menu-item>
			<el-menu-item index="/gameNewsManage">游戏资讯</el-menu-item>
			<el-menu-item index="/gameGalleryManage">游戏图集</el-menu-item>
		</el-submenu>
		<el-submenu index="2">
			<template slot="title">配置管理</template>
			<el-menu-item index="/gameTypeManage">游戏类型管理</el-menu-item>
			<el-menu-item index="/gameCompanyManage">游戏公司管理</el-menu-item>
			<!-- <el-menu-item index="2-3">选项3</el-menu-item> -->
		</el-submenu>
		<el-menu-item index="/commentManage">评论管理</el-menu-item>
		<el-menu-item index="/accessLog">访问日志</el-menu-item>
		<el-menu-item index="/aboutUs">关于我们</el-menu-item>

		<el-submenu class="last-menu" index="5">
			<template slot="title">设置</template>
			<el-menu-item index="5-1">修改密码</el-menu-item>
			<el-menu-item index="5-2">退出</el-menu-item>
		</el-submenu>

		<span class="userinfo">
			欢迎您，{{user.userInfo.name}}
		</span>
	</el-menu>
</template>

<script type='es6'>
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$route.path;
      console.log("this.$route.path: ", this.$route);
      console.log(key, keyPath);
      if (key == "5-2") {
        localStorage.removeItem("MY_GAME_TOKEN");
        localStorage.removeItem("USER_INFO");
        this.$router.push({ name: "login" });
      }
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '~src/assets/stylus/variable.styl';

.last-menu, .userinfo {
	float: right;
}

.userinfo {
	margin-right: 20px;
	font-size: $font-size-normal !important;
	color: #fff;
	line-height: 60px;
}

.logo {
	height: 60px;
	width: auto;
	position: absolute;
	left: 10px;
}
</style>
