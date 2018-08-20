<template>
	<el-container id="app" v-if="!this.$route.path.includes('login')">
		<el-header>Header</el-header>
		<el-container>
			<el-aside width="200px">Aside</el-aside>
			<el-main>
				<router-view/>
			</el-main>
		</el-container>
	</el-container>
	<el-container id="app" v-else>
		<router-view/>
	</el-container>
	
</template>
<style lang="stylus" scoped>
#app {
	height: 100%;
}
</style>
