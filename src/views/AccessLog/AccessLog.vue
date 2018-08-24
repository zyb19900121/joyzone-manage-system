<template>
	<el-container class="sub-page access-log">
		<el-header>
			<SubHeader :pageTitle="pageTitle"></SubHeader>
		</el-header>
		<el-scrollbar style="height:100%">
			<el-main>
				<el-table v-loading="loading" ref="multipleTable" :data="logList" border stripe tooltip-effect="dark" style="width: 100%">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="phone_brand" label="手机品牌">
					</el-table-column>
					<el-table-column prop="phone_model" label="手机型号">
					</el-table-column>
					<el-table-column prop="phone_system" label="手机系统">
					</el-table-column>
					<el-table-column label="访问时间" show-overflow-tooltip>
						<template slot-scope="scope">{{ scope.row.visit_date | formatDate }}</template>
					</el-table-column>
				</el-table>
			</el-main>
		</el-scrollbar>
		<el-footer>Footer</el-footer>
	</el-container>
</template>

<script type='es6'>
import userService from "http/userService";
import SubHeader from "components/SubHeader";
export default {
  name: "",
  data() {
    return {
      loading: false,
      pageTitle: "访问日志",
      logList: [],
      multipleSelection: []
    };
  },
  created() {
    this.getLogList();
  },
  methods: {
    getLogList() {
      this.loading = true;
      userService
        .getRequest("getLogList")
        .then(response => {
          console.log("response: ", response);
          this.logList = response.data;
          this.loading = false;
        })
        .catch(error => {
					console.log('error: ', error);
				});
    }
  },
  components: {
    SubHeader
  }
};
</script>

<style lang='stylus' scoped>
@import '~src/assets/stylus/variable.styl';

.access-log {
	.content {
		padding: 30px;
	}
}
</style>
