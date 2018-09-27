<template>
	<el-container class="index">
		<el-header>
			<Header></Header>
		</el-header>
		<el-container style="height:100%">
			<el-aside>
				<Aside></Aside>
			</el-aside>
			<el-main>
				<router-view />
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import userService from "http/userService";
import Header from "components/Header";
import Aside from "components/Aside";
export default {
  name: "home",
  created() {
    // this.getGameList();
  },
  methods: {
    getGameList() {
      userService
        .getRequest("getGameList", { isSold: 1, isFilter: 1 })
        .then(response => {})
        .catch(error => {});
    }
  },
  components: { Header, Aside }
};
</script>
