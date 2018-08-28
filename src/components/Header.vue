<template>
	<el-menu :default-active="$router.path" class="el-menu-demo" mode="horizontal" router background-color="#409EFF" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
		<el-submenu index="1">
			<template slot="title">游戏管理</template>
			<el-menu-item index="2-1">选项1</el-menu-item>
			<el-menu-item index="2-2">选项2</el-menu-item>
			<el-menu-item index="2-3">选项3</el-menu-item>
		</el-submenu>
		<el-menu-item index="/commentManage">评论管理</el-menu-item>
		<el-menu-item index="/accessLog">访问日志</el-menu-item>
		<el-menu-item index="/aboutUs">关于我们</el-menu-item>
		<el-submenu class="last-menu" index="5">
			<template slot="title">设置</template>
			<el-menu-item index="5-1">修改密码</el-menu-item>
			<el-menu-item index="5-2">退出</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script type='es6'>
export default {
  name: "",
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key == "5-2") {
        localStorage.removeItem("MY_GAME_TOKEN");
        this.$router.push({ name: "login" });
      }
    }
  }
};
</script>

<style lang='stylus' scoped>
.last-menu {
	float: right;
}
</style>
