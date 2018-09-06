<template>
	<el-container class="sub-page game-manage">
		<el-header>
			<SubHeader :pageTitle="pageTitle"></SubHeader>
			<ConditionFilter showAddBtn addBtnName="添加游戏" @refreshData="refreshData" @addGame="addGame"></ConditionFilter>
		</el-header>
		<el-scrollbar style="height:100%;">
			<el-main>
				<div class="game-list">
					<el-card v-for="(game,index) in gameList" :key="index" :body-style="{ padding: '0px' }">
						<img :src="`${baseUrl}${game.game_cover}`" class="image">
						<div style="padding: 14px;">
							<span class="game-name">{{game.game_name}}</span>
							<div class="bottom clearfix">
								<el-button type="text" class="button" @click="handleDelete(game.id)">删除</el-button>
								<el-button type="text" class="button" @click="handleClick(game.id)">编辑</el-button>
							</div>
						</div>
					</el-card>
				</div>
			</el-main>
		</el-scrollbar>
		<el-footer>
			<!-- <SubFooter ref="subFooter" showDelete showPagination :total="commentTotal*1" @refreshData="refreshData" @handleDelete="handleDelete"></SubFooter> -->
		</el-footer>
	</el-container>
</template>

<script type='es6'>
import { baseUrl } from "utils/env";
import userService from "http/userService";
import SubHeader from "components/SubHeader";
import SubFooter from "components/SubFooter";
import ConditionFilter from "components/ConditionFilter";
export default {
  name: "",
  data() {
    return {
      baseUrl,
      pageTitle: "游戏库",
      loading: false,
      gameList: []
    };
  },
  created() {
    this.getGameList();
  },
  methods: {
    addGame() {
      console.log("addGame");
      this.$router.push({ name: "addGame" });
    },
    getGameList() {
      this.loading = true;
      userService
        .getRequest("getGameList", {})
        .then(response => {
          this.loading = false;
          this.gameList = response.data;
        })
        .catch(error => {});
    },
    refreshData() {
      this.gameList();
    },
    handleClick(id) {
      console.log("id: ", id);
    },
    handleDelete(id) {
      this.$confirm("您确定是否要删除此游戏?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userService
            .deleteRequest("deleteGame", id)
            .then(response => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              // if (
              //   idsLength === this.commentList.length &&
              //   this.searchParams.currentPage > 1
              // ) {
              //   this.searchParams.currentPage =
              //     this.searchParams.currentPage - 1;
              // }
              this.getGameList();
            })
            .catch(error => {});
        })
        .catch(() => {});
    },
    handleSelectionChange() {}
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

.game-list {
	display: flex;
	flex-flow: row;
	flex-wrap: wrap;

	.el-card {
		width: 183px;
		height: 366px;
		margin: 10px 15px;

		.game-name {
			color: $color-text-s;
			font-size: $font-size-normal;
			text-shadow: 1px 1px 10px $color-text-t;
		}

		.bottom {
			margin-top: 13px;
			line-height: 12px;
		}

		.button {
			padding: 0;
			float: right;
			margin-left: 5px;
		}

		.image {
			width: 100%;
			display: block;
		}
	}
}
</style>
