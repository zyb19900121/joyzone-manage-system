<template>
	<div class="aside">
		<el-menu :default-active="$route.matched[1].path" router class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-submenu index="1">
				<template slot="title">
					<i class="iconfont icon-game"></i>
					<span v-if="!isCollapse">游戏管理</span>
				</template>
				<el-menu-item index="/gameManage">游戏库</el-menu-item>
				<el-menu-item index="/gameNewsManage">游戏资讯</el-menu-item>
				<el-menu-item index="/gameGalleryManage">游戏图集</el-menu-item>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title">
					<i class="iconfont icon-settings"></i>
					<span v-if="!isCollapse">配置管理</span>
				</template>
				<el-menu-item index="/gameTypeManage">游戏类型管理</el-menu-item>
				<el-menu-item index="/gameCompanyManage">游戏公司管理</el-menu-item>
			</el-submenu>
			<el-menu-item index="/commentManage">
				<i class="iconfont icon-comment"></i>
				<span slot="title">评论管理</span>
			</el-menu-item>
			<el-menu-item index="/accessLog">
				<i class="iconfont icon-footprint"></i>
				<span slot="title">访问日志</span>
			</el-menu-item>
			<el-menu-item index="/aboutUs">
				<i class="iconfont icon-group"></i>
				<span slot="title">关于我们</span>
			</el-menu-item>
		</el-menu>
		<div class="menu-collapse">
			<el-button type="text" @click="menuCollapse">
				<i class="iconfont icon-round_menu_fill"></i>
			</el-button>
		</div>
	</div>
</template>

<script type='es6'>
export default {
  name: "",
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    menuCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang='stylus' scoped>
</style>
