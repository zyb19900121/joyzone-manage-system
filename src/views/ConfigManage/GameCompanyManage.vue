<template>
	<el-container class="sub-page access-log">
		<el-header>
			<SubHeader :pageTitle="pageTitle"></SubHeader>
			<ConditionFilter>
				<div class="add-btn">
					<el-button size="small" round type="primary" @click="handleAddCompany" v-permission>添加公司</el-button>
				</div>
			</ConditionFilter>
		</el-header>
		<el-scrollbar style="height:100%;">
			<el-main>
				<el-table v-loading="loading" ref="multipleTable" :data="companyList" @selection-change="handleSelectionChange" border stripe tooltip-effect="light" style="width: 100%">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="company_name_cn" label="公司名称">
					</el-table-column>
					<el-table-column prop="company_name_en" label="公司名称(英文)">
					</el-table-column>
					<el-table-column prop="company_desc" label="公司简介">
					</el-table-column>
					<el-table-column prop="order" label="排序" width="120">
					</el-table-column>
					<el-table-column label="操作" width="145">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="handleDelete(scope.row)" v-permission>编辑</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.row)" v-permission>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-main>
		</el-scrollbar>
		<el-footer>
			<SubFooter ref="subFooter" showDelete :showPagination="Boolean(companyTotal)" :total="companyTotal" @refreshData="refreshData" @handleDelete="handleDelete"></SubFooter>
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
      pageTitle: "游戏厂商管理",
      searchParams: {
        pageSize: 16,
        currentPage: 1
      },
      companyList: [],
      companyTotal: ""
    };
  },
  created() {
    this.getGameCompanyList(this.searchParams);
  },
  methods: {
    getGameCompanyList(searchParams) {
      this.loading = true;
      userService
        .getRequest("getGameCompanyList", searchParams)
        .then(response => {
          this.companyList = response.data.list;
          this.companyTotal = response.data.total;
          this.loading = false;
        })
        .catch(error => {});
    },
    refreshData() {},
    handleSelectionChange() {},
    handleAddCompany() {},
    handleDelete() {}
  },
  components: {
    SubHeader,
    SubFooter,
    ConditionFilter
  }
};
</script>

<style lang='stylus' scoped>
</style>
