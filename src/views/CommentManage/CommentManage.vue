<template>
	<el-container class="sub-page comment-manage">
		<el-header>
			<SubHeader :pageTitle="pageTitle"></SubHeader>
		</el-header>
		<el-scrollbar style="height:100%;">
			<el-main>
				<el-table v-loading="loading" ref="multipleTable" :data="logList" @selection-change="handleSelectionChange" border stripe tooltip-effect="light" style="width: 100%">
					<el-table-column type="selection" width="55">
					</el-table-column>

					<el-table-column label="访问时间" show-overflow-tooltip>
						<template slot-scope="scope">{{ scope.row.visit_date | formatDate }}</template>
					</el-table-column>
					<el-table-column label="操作" width="80">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-main>
		</el-scrollbar>
		<el-footer>
			<SubFooter showDelete showPagination :total="logTotal*1" @refreshData="refreshData" @handleDelete="handleDelete"></SubFooter>
		</el-footer>
	</el-container>
</template>

<script type='es6'>
import userService from "http/userService";
import SubHeader from "components/SubHeader";
import SubFooter from "components/SubFooter";
export default {
  name: "",
  data() {
    return {
      loading: false,
      pageTitle: "评论管理",
      searchParams: {
        pageSize: 15,
        currentPage: 1
      },
      logList: [],
      logTotal: "",
      multipleSelection: []
    };
  },
  created() {
		this.getGameCommentList()
	},
  methods: {
    getGameCommentList() {
      this.loading = true;
      userService
        .getRequest("getGameCommentList", this.searchParams)
        .then(response => {
          // this.logList = response.data.list;
          // this.logTotal = response.data.total;
          this.loading = false;
        })
        .catch(error => {});
    },
    refreshData() {},
    handleDelete() {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  components: {
    SubHeader,
    SubFooter
  }
};
</script>

<style lang='stylus' scoped>
</style>
