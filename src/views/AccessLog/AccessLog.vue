<template>
	<el-container class="sub-page access-log">
		<el-header>
			<SubHeader :pageTitle="pageTitle"></SubHeader>
			<ConditionFilter showDatePicker @refreshData="refreshData"></ConditionFilter>
		</el-header>
		<el-scrollbar style="height:100%;">
			<el-main>
				<el-table v-loading="loading" ref="multipleTable" :data="logList" @selection-change="handleSelectionChange" border stripe tooltip-effect="light" style="width: 100%">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="phone_brand" label="手机品牌">
					</el-table-column>
					<el-table-column prop="phone_model" label="手机型号">
					</el-table-column>
					<el-table-column prop="phone_system" label="手机系统">
					</el-table-column>
					<el-table-column label="访问时间" show-overflow-tooltip width="200">
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
			<SubFooter ref="subFooter" showDelete showPagination :total="logTotal*1" @refreshData="refreshData" @handleDelete="handleDelete"></SubFooter>
		</el-footer>
	</el-container>
</template>

<script type='es6'>
import userService from "http/userService";
import SubHeader from "components/SubHeader";
import SubFooter from "components/SubFooter";
import ConditionFilter from "components/ConditionFilter";
export default {
  name: "",
  data() {
    return {
      loading: false,
      pageTitle: "访问日志",
      searchParams: {
        pageSize: 18,
        currentPage: 1,
        startDate: "",
        endDate: ""
      },
      logList: [],
      logTotal: "",
      multipleSelection: []
    };
  },
  created() {
    this.getLogList(this.searchParams);
  },
  methods: {
    getLogList(searchParams) {
      this.loading = true;
      userService
        .getRequest("getLogList", searchParams)
        .then(response => {
          this.logList = response.data.list;
          this.logTotal = response.data.total;
          this.loading = false;
        })
        .catch(error => {});
    },
    refreshData(searchParams, isConditionSearch) {
			//如果是根据条件查询触发的此方法 应调用subFoot组件中的ininPageConfig方法来初始化分页参数
      Object.assign(this.searchParams, searchParams);
      this.getLogList(this.searchParams);
      isConditionSearch && this.$refs.subFooter.ininPageConfig();
    },
    handleDelete(log) {
      let ids = [];
      if (!log) {
        this.multipleSelection.length &&
          this.multipleSelection.map(item => {
            ids.push(item.id);
          });
      }
      let idsLength = ids.length;
      ids = ids.length ? ids.join(",") : log.id;

      this.$confirm("您确定是否要删除此记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userService
            .deleteRequest("deleteLogs", ids)

            .then(response => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              if (
                idsLength === this.logList.length &&
                this.searchParams.currentPage > 1
              ) {
                this.searchParams.currentPage =
                  this.searchParams.currentPage - 1;
              }
              this.getLogList(this.searchParams);
            })
            .catch(error => {});
        })
        .catch(() => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  components: {
    SubHeader,
    SubFooter,
    ConditionFilter
  }
};
</script>

<style lang='stylus' scoped>
@import '~src/assets/stylus/variable.styl';
</style>
