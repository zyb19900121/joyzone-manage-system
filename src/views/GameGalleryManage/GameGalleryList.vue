<template>
	<el-container class="sub-page">
		<el-header>
			<SubHeader :pageTitle="pageTitle"></SubHeader>
			<ConditionFilter>
				<div class="add-btn">
					<el-button size="small" round type="primary" @click="uploadDialogVisible = true" v-permission>上传图片</el-button>
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
				<div class="game-list">
					<el-card v-for="(item,index) in galleryList" :key="index" :body-style="{ padding: '0px' }">
						<div class="game-wrap" @mouseover="detailShowIndex = index" @mouseout="detailShowIndex=''">

							<transition name="el-zoom-in-center">
								<div class="game-detail" v-show="detailShowIndex === index">
									<div class="detail-info">
										<div class="info-part">
											<p class="game-name">
												{{item.game_name}}
											</p>
										</div>
									</div>
									<div class="operation-area">
										<el-button type="text" class="button" @click="handlePreview(item.image_src)" v-permission>
											<i class="iconfont el-icon-zoom-in"></i>
										</el-button>
										<el-button type="text" class="delete-btn" @click="handleDelete(item.id)" v-permission>
											<i class="iconfont icon-delete"></i>
										</el-button>
									</div>

								</div>
							</transition>

							<img v-lazy="`${baseUrl}${item.image_src}`" :key="item.image_src" class="image">
						</div>
					</el-card>
				</div>
			</el-main>
		</el-scrollbar>
		<el-footer>
			<SubFooter ref="subFooter" :pageSize=this.searchParams.pageSize :showPagination="Boolean(galleryTotal)" :total="galleryTotal" @refreshData="refreshData"></SubFooter>
		</el-footer>
		<el-dialog :visible.sync="previewDialogVisible">
			<img width="100%" :src="previewImageUrl" alt="">
		</el-dialog>
		<el-dialog title="上传游戏图片" :visible.sync="uploadDialogVisible">
			<el-form :model="galleryForm" :rules="galleryFormRule" ref="galleryForm">
				<el-form-item label="图片所属游戏" prop="gameId">
					<el-select size="small" v-model="galleryForm.gameId" clearable filterable placeholder="请选择游戏">
						<el-option v-for="(item,index) in gameList" :key="index" :label="item.game_name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-upload ref="upload" multiple :http-request="httpRequest" :file-list="galleryForm.imageList" :action="''" list-type="picture-card" :before-upload="beforeUpload" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
					<i class="el-icon-plus"></i>
				</el-upload>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click="handleCancel">取 消</el-button>
				<el-button size="small" type="primary" @click="saveGallery">确 定</el-button>
			</div>
		</el-dialog>
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
      pageTitle: "游戏图集",
      gameList: [],
      searchParams: {
        pageSize: 27,
        currentPage: 1,
        gameId: ""
      },
      galleryList: [],
      galleryTotal: "",

      previewImageUrl: "",
      previewDialogVisible: false,
      detailShowIndex: "",

      uploadDialogVisible: false,

      galleryFormRule: {
        gameId: [{ required: true, message: "请选择所属游戏", trigger: "blur" }]
      },

      file: "",
      fileType: "game_gallery",

      galleryForm: {
        gameId: "",
        imageList: []
      }
    };
  },
  created() {
    this.getGameList();
    this.getGameGalleryList(this.searchParams);
  },
  methods: {
    getGameList() {
      //获取所有游戏，isFilter用于根据游戏名进行筛选
      userService
        .getRequest("getGameList", { isFilter: 1 })
        .then(response => {
          this.gameList = response.data.list;
        })
        .catch(error => {});
    },
    handleGameSelect(val) {
      this.searchParams.gameId = val;
      this.getGameGalleryList(this.searchParams);
    },

    getGameGalleryList(searchParams) {
      userService
        .getRequest("getGameGalleryList", searchParams)
        .then(response => {
          this.galleryList = response.data.list;
          this.galleryTotal = response.data.total;
        })
        .catch(error => {});
    },
    refreshData(searchParams, isConditionSearch) {
      //如果是根据条件查询触发的此方法 应调用subFoot组件中的ininPageConfig方法来初始化分页参数
      Object.assign(this.searchParams, searchParams);
      this.getGameGalleryList(this.searchParams);
      isConditionSearch && this.$refs.subFooter.ininPageConfig();
    },

    handlePreview(src) {
      this.previewImageUrl = `${baseUrl}${src}`;
      this.previewDialogVisible = true;
    },

    handleDelete(id) {
      this.$confirm("您确定是否要删除此图片?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userService
            .deleteRequest("deleteGameGalleryImage", id)

            .then(response => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              if (
                this.galleryList.length === 1 &&
                this.searchParams.currentPage > 1
              ) {
                this.searchParams.currentPage =
                  this.searchParams.currentPage - 1;
              }
              this.getGameGalleryList(this.searchParams);
            })
            .catch(error => {});
        })
        .catch(() => {});
    },
    handleCancel() {
      this.uploadDialogVisible = false;
      this.$refs.galleryForm.resetFields();
      this.$refs.upload.clearFiles();
    },
    saveGallery() {
      this.$refs.galleryForm.validate(valid => {
        if (valid) {
          console.log("galleryForm: ", this.galleryForm);
        } else {
          console.log("invalid");
          return false;
        }
      });
    },
    beforeUpload(file) {
      this.file = file;
      let types = ["image/jpeg", "image/png", "image/gif"];
      const isType = types.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isType) {
        this.$message.error("上传游戏封面只能是JPG或PNG格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传游戏封大小不能超过2MB!");
      }
      return isType && isLt2M;
    },
    httpRequest() {
      userService
        .uploadRequest("fileUpload", { file: this.file, type: this.fileType })
        .then(response => {
          console.log("response: ", response);
          let tempObj = {};
          tempObj.uid = response.data.url;
          tempObj.name = response.data.url;
          tempObj.url = this.baseUrl + response.data.url;
          tempObj.realUrl = response.data.url;
          this.galleryForm.imageList.push(tempObj);
          // this.newsForm.newsThumbnail = response.data.url;
        })
        .catch(error => {});
    },
    handleRemove(file, fileList) {
      // this.galleryForm.imageList.splice(
      //   this.galleryForm.imageList.findIndex(item => item.uid === file.uid),
      //   1
      // );
      this.galleryForm.imageList = fileList;
    },
    handlePictureCardPreview(file) {
      this.previewImageUrl = file.url;
      this.previewDialogVisible = true;
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

.game-list {
	display: flex;
	flex-flow: row;
	flex-wrap: wrap;

	.game-wrap {
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		background-color: #dcdcdc;
	}

	.el-card {
		width: 160px;
		height: 160px;
		margin: 16px;
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

				.el-icon-zoom-in {
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
			height: auto;
			max-height: 100%;
			// display: block;
		}
	}
}
</style>
