<template>
 	<el-container class="index">
		<el-header>Header</el-header>
		<el-container>
			<el-aside width="200px">Aside</el-aside>
			<el-main>
				<router-view/>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import userService from "http/userService";
export default {
  name: "home",
  created() {
		console.log(process.env.NODE_ENV);
		this.getGameList();
  },
  methods: {
    getGameList() {
      userService
        .getRequest("getGameList", {isSold:1})
        .then(response => {
          console.log("response: ", response);
        })
        .catch(error => {});
    }
  },
  components: {}
};
</script>
