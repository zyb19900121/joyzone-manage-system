<template>
	<el-container class="sub-page game-news-list">
		<el-header>
			<SubHeader :pageTitle="pageTitle"></SubHeader>
			<ConditionFilter ref="conditionFilter" showAddBtn addBtnName="添加攻略" @addGame="addStrategy" @refreshData="refreshData">
				<div class="select">
					<span class="select-label">游戏平台：</span>
					<el-select size="small" v-model="searchParams.platform" placeholder="请选择" @change="handlePlatformSelect" clearable>
						<el-option v-for="(item,index) in platformList" :key="index" :label="item" :value="item">
						</el-option>
					</el-select>
				</div>
			</ConditionFilter>
		</el-header>
		<el-scrollbar style="height:100%;">
			<el-main>
				<el-table v-loading="loading" ref="multipleTable" :data="strategyList" @selection-change="handleSelectionChange" border stripe tooltip-effect="light" style="width: 100%">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="strategy_title" label="攻略标题">
					</el-table-column>

					<el-table-column label="攻略缩略图" width="100">
						<template slot-scope="scope">
							<img :src="`${baseUrl}${scope.row.strategy_thumbnail}`" alt="" width="30" height="30">
						</template>
					</el-table-column>
					<el-table-column prop="platform" label="所属平台" width="150">
					</el-table-column>
					<el-table-column prop="game_name" show-overflow-tooltip label="所属游戏" width="200">
					</el-table-column>
					<el-table-column label="添加时间" show-overflow-tooltip width="200">
						<template slot-scope="scope">{{ scope.row.create_date | formatDate }}</template>
					</el-table-column>
					<el-table-column label="操作" width="145">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="addStrategy(scope.row.id)" v-permission>编辑</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.row)" v-permission>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-main>
		</el-scrollbar>
		<el-footer>
			<SubFooter ref="subFooter" showDelete :showPagination="Boolean(strategyTotal)" :total="strategyTotal" @refreshData="refreshData" @handleDelete="handleDelete"></SubFooter>
		</el-footer>
	</el-container>
</template>

<script type='es6'>
import { baseUrl } from "utils/env";
import userService from "http/userService";
import SubHeader from "components/SubHeader";
import SubFooter from "components/SubFooter";
import ConditionFilter from "components/ConditionFilter";
import { platformList } from "utils/gameConfig";
export default {
  name: "",
  data() {
    return {
      baseUrl,
      pageTitle: "游戏攻略",
      loading: false,
      platformList,
      multipleSelection: [],
      searchParams: {
        pageSize: 16,
        currentPage: 1,
        platform: ""
      },
      strategyList: [],
      strategyTotal: 0
    };
  },
  created() {
    this.getGameStrategyList(this.searchParams);
  },
  mounted() {
    // if (this.$route.params.searchParams) {
    //   this.searchParams = this.$route.params.searchParams;
    //   this.$refs.subFooter.setSearchParams(this.searchParams);
    //   this.$refs.conditionFilter.setSearchParams(this.searchParams);
    // }
    // this.getNewsList(this.searchParams);
  },
  methods: {
    addStrategy(id) {
      id = id || "";
      this.$router.push({
        name: "addNews",
        params: { id: id, searchParams: this.searchParams }
      });
    },
    getGameStrategyList(searchParams) {
      this.loading = true;
      this.newsList = [];
      userService
        .getRequest("getGameStrategyList", searchParams)
        .then(response => {
          this.loading = false;
          this.strategyList = response.data.list;
          this.strategyTotal = response.data.total;
        })
        .catch(error => {});
    },
    handlePlatformSelect(val) {
      this.searchParams.currentPage = 1;
      this.$refs.subFooter.ininPageConfig();
      this.getGameStrategyList(this.searchParams);
    },
    refreshData(searchParams, isConditionSearch) {
      Object.assign(this.searchParams, searchParams);
      this.getGameStrategyList(this.searchParams);
      // isConditionSearch && this.$refs.subFooter.ininPageConfig();
    },
    handleDelete(strategy) {
      let ids = [];
      if (!strategy) {
        this.multipleSelection.length &&
          this.multipleSelection.map(item => {
            ids.push(item.id);
          });
      }
      let idsLength = ids.length;
      ids = ids.length ? ids.join(",") : strategy.id;

      this.$confirm("您确定是否要删除此攻略?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userService
            .deleteRequest("deleteGameStrategy", ids)

            .then(response => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              if (
                idsLength === this.strategyList.length &&
                this.searchParams.currentPage > 1
              ) {
                this.searchParams.currentPage =
                  this.searchParams.currentPage - 1;
              }
              this.getGameStrategyList(this.searchParams);
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
