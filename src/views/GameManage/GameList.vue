<template>
	<el-container class="sub-page game-manage">
		<el-header>
			<SubHeader :pageTitle="pageTitle"></SubHeader>
			<ConditionFilter ref="conditionFilter" showAddBtn showSelect showKeywordSearch addBtnName="添加游戏" selectName="排序：" :selectionOptions="orderByOptions" optionLabel="label" optionValue="value" @addGame="addGame" @refreshData="refreshData">
				<el-checkbox v-model="searchParams.isSold" @change="handleIsSoldSelect">已发售</el-checkbox>

				<div class="select">
					<span class="select-label">游戏平台：</span>
					<el-select size="small" v-model="searchParams.platform" placeholder="请选择" @change="handlePlatformSelect" clearable>
						<el-option v-for="(item,index) in platformList" :key="index" :label="item" :value="item">
						</el-option>
					</el-select>
				</div>

				<div class="select">
					<span class="select-label">游戏类型：</span>
					<el-select size="small" v-model="searchParams.gameType" placeholder="请选择" @change="handleGameTypeSelect" clearable>
						<el-option v-for="(item,index) in gameTypeList" :key="index" :label="item" :value="item">
						</el-option>
					</el-select>
				</div>

			</ConditionFilter>
		</el-header>
		<el-scrollbar style="height:100%;">
			<el-main>
				<!-- <button @click="detailShow = true"></button> -->
				<div class="game-list">
					<el-card v-for="(game,index) in gameList" :key="index" :body-style="{ padding: '0px' }">
						<div @mouseover="detailShowIndex = index" @mouseout="detailShowIndex=''">

							<transition name="el-zoom-in-center">
								<div class="game-detail" v-show="detailShowIndex === index">
									<div class="detail-info">
										<div class="info-part">
											<p class="game-name">
												{{game.game_name}}
											</p>
											<p class="game-name-en">
												{{game.game_name_en}}
											</p>
										</div>

										<div class="info-part">
											<p class="game-score">
												{{Number(game.game_score).toFixed(1) }}
											</p>
										</div>

										<div class="info-part">
											<p class="game-type">
												类型：{{game.game_type}}
											</p>
											<p class="sale-date">
												发售日期：{{game.sale_date}}
											</p>
										</div>

									</div>
									<div class="operation-area">
										<el-button type="text" class="button" @click="addGame(game.id)" v-permission>
											<i class="iconfont icon-edit"></i>
										</el-button>
										<el-button type="text" class="delete-btn" @click="handleDelete(game.id)" v-permission>
											<i class="iconfont icon-delete"></i>
										</el-button>
									</div>

								</div>
							</transition>

							<img :src="`${baseUrl}${game.game_cover}?t=${Math.random()}`" class="image">
							<!-- <div style="padding: 10px;">
								<span class="game-name">{{game.game_name}}</span>
								<div class="bottom clearfix">
									<el-button type="text" class="button delete-btn" @click="handleDelete(game.id)">删除</el-button>
									<el-button type="text" class="button" @click="addGame(game.id)">编辑</el-button>
								</div>
							</div> -->
						</div>
					</el-card>
				</div>
			</el-main>
		</el-scrollbar>
		<el-footer>
			<SubFooter ref="subFooter" :showPagination="Boolean(gameTotal)" :total="gameTotal" @refreshData="refreshData"></SubFooter>
		</el-footer>
	</el-container>
</template>

<script type='es6'>
import { baseUrl } from "utils/env";
import userService from "http/userService";
import SubHeader from "components/SubHeader";
import SubFooter from "components/SubFooter";
import ConditionFilter from "components/ConditionFilter";
import { platformList, gameTypeList } from "utils/gameConfig";
export default {
  name: "",
  data() {
    return {
      baseUrl,
      pageTitle: "游戏库",
      loading: false,
      platformList,
      gameTypeList,
      searchParams: {
        pageSize: 18,
        currentPage: 1,
        platform: "",
        gameType: "",
        isSold: true
      },
      gameList: [],
      gameTotal: 0,
      detailShowIndex: "",
      orderByOptions: [
        {
          label: "游戏评分(高到低)",
          value: "game_score DESC"
        },
        {
          label: "游戏评分(低到高)",
          value: "game_score"
        },
        {
          label: "发售时间(近到远)",
          value: "sale_date DESC"
        },
        {
          label: "发售时间(远到近)",
          value: "sale_date"
        }
      ]
    };
  },
  mounted() {
    if (this.$route.params.searchParams) {
      this.searchParams = this.$route.params.searchParams;
      this.$refs.subFooter.setSearchParams(this.searchParams);
      this.$refs.conditionFilter.setSearchParams(this.searchParams);
    }
    this.getGameList(this.searchParams);
  },
  methods: {
    addGame(id) {
      id = id || "";
      this.$router.push({
        name: "addGame",
        params: { id: id, searchParams: this.searchParams }
      });
    },
    getGameList(searchParams) {
      this.loading = true;
      userService
        .getRequest("getGameList", searchParams)
        .then(response => {
          this.loading = false;
          this.gameList = response.data.list;
          this.gameTotal = response.data.total;
        })
        .catch(error => {});
    },
    handleIsSoldSelect(val) {
      this.searchParams.currentPage = 1;
      this.$refs.subFooter.ininPageConfig();
      this.getGameList(this.searchParams);
    },
    handlePlatformSelect(val) {
      this.searchParams.currentPage = 1;
      this.$refs.subFooter.ininPageConfig();
      this.getGameList(this.searchParams);
    },
    handleGameTypeSelect(val) {
      this.searchParams.currentPage = 1;
      this.$refs.subFooter.ininPageConfig();
      this.getGameList(this.searchParams);
    },
    refreshData(searchParams, isConditionSearch) {
      if (searchParams.selectValue === "") {
        this.searchParams.orderBy && (this.searchParams.orderBy = "");
      }
      if (searchParams.selectValue) {
        searchParams.orderBy = searchParams.selectValue;
        delete searchParams.selectValue;
      }
      Object.assign(this.searchParams, searchParams);
      this.getGameList(this.searchParams);

      isConditionSearch && this.$refs.subFooter.ininPageConfig();
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
              if (
                this.gameList.length === 1 &&
                this.searchParams.currentPage > 1
              ) {
                this.searchParams.currentPage =
                  this.searchParams.currentPage - 1;
              }
              this.getGameList(this.searchParams);
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
		width: 160px;
		height: 258px;
		margin: 25px;
		position: relative;

		.game-detail {
			transition: all ease 0.5s;
			position: absolute;
			width: 100%;
			height: 100%;
			padding: 10px;
			box-sizing: border-box;
			background-color: rgba(0, 0, 0, 0.7);
			display: flex;
			flex-flow: column;

			.detail-info {
				height: 100%;
				text-align: center;
				font-size: $font-size-small-x;
				display: flex;
				justify-content: space-between;
				flex-flow: column;

				.game-name {
					line-height: 1.5;
				}

				.game-name-en {
					margin-top: 10px;
				}

				.game-score {
					font-size: 36px;
					color: $color-danger;
				}

				.game-type {
					margin-top: 10px;
					line-height: 1.5;
				}

				.sale-date {
					margin-top: 10px;
				}
			}

			.operation-area {
				height: 40px;
				text-align: center;

				i {
					margin: 0 20px;
					color: #fff;
				}

				.icon-edit {
					&:hover {
						color: $color-primary;
					}
				}

				.icon-delete {
					&:hover {
						color: $color-danger;
					}
				}
			}

			p {
				color: #fff;
			}
		}

		.game-name {
			color: $color-text-s;
			font-size: $font-size-small;
			text-shadow: 1px 1px 10px $color-text-t;
		}

		.image {
			width: 100%;
			display: block;
		}
	}
}
</style>
