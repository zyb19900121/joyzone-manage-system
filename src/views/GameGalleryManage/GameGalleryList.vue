<template>
	<el-container class="sub-page">
		<el-header>
			<SubHeader :pageTitle="pageTitle"></SubHeader>
			<ConditionFilter>
				<div class="add-btn">
					<el-button size="small" round type="primary" @click="uploadImage" v-permission>上传图片</el-button>
				</div>
				<div class="select">
					<span class="select-label">游戏名称：</span>
					<el-select size="small" v-model="searchParams.gameId" placeholder="请选择" @change="handleGameSelect" clearable filterable>
						<el-option v-for="(item,index) in gameList" :key="index" :label="item.game_name" :value="item.id">
						</el-option>
					</el-select>
				</div>
			</ConditionFilter>
		</el-header>
		<el-scrollbar style="height:100%;">
			<el-main>

			</el-main>
		</el-scrollbar>
		<el-footer>
			<!-- <SubFooter ref="subFooter" showDelete :showPagination="Boolean(typeTotal)" :total="typeTotal" @refreshData="refreshData" @handleDelete="handleDelete"></SubFooter> -->
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
      pageTitle: "游戏图集",
      gameList: [],
      searchParams: {
        gameId: ""
      }
    };
  },
  methods: {
    handleGameSelect() {}
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
