<template>
	<el-container class="sub-page add-news">
		<el-header>
			<SubHeader :pageTitle="pageTitle"></SubHeader>
		</el-header>
		<el-scrollbar style="height:100%;">
			<el-main>
				<el-form :model="newsForm" :rules="newsFormRule" ref="newsForm" label-width="150px">
					<el-form-item label="资讯标题" prop="newsTitle">
						<el-input size="small" v-model="newsForm.newsTitle" clearable></el-input>
					</el-form-item>

					<el-form-item label="资讯简介" prop="gameDesc">
						<el-input size="small" type="textarea" v-model="newsForm.newsContent" resize="none" rows="5"></el-input>
					</el-form-item>

					<el-form-item label="资讯平台" prop="platform">
						<el-select size="small" v-model="newsForm.platform" clearable placeholder="请选择游戏平台">
							<el-option v-for="(item,index) in platformList" :key="index" :label="item" :value="item">
							</el-option>
						</el-select>
					</el-form-item>

					<!-- <el-form-item label="游戏封面" prop="gameCover">
						<el-upload class="avatar-uploader" :http-request="httpRequest" :action="''" :show-file-list="false" :before-upload="beforeUpload">
							<img v-if="gameForm.gameCover" :src="baseUrl+gameForm.gameCover" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item> -->

				</el-form>
			</el-main>
		</el-scrollbar>
		<el-footer>
			<SubFooter showSave showCancel ref="subFooter" @handleSave="handleSave" @handleCancel="handleCancel"></SubFooter>
		</el-footer>
	</el-container>
</template>

<script type='es6'>
import { baseUrl } from "utils/env";
import userService from "http/userService";
import SubHeader from "components/SubHeader";
import SubFooter from "components/SubFooter";
import { platformList, languageList } from "utils/gameConfig";
export default {
  name: "",
  data() {
    return {
      baseUrl,
      pageTitle: "添加咨询",
      loading: false,
      newsId: this.$route.params.id,
      gameList: [],
      platformList,
      fileType: "news_thumbnail", //上传图片的类型，为了存在不同的目录,
      newsForm: {
        newsTitle: "",
        newsContent: "",
        newsThumbnail: "",
        platform: "",
        gameId: ""
      },
      newsFormRule: {
        newsTitle: [
          { required: true, message: "请输入游戏名称", trigger: "blur" },
          { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "blur" }
        ]
      },

      accept: "image/jpg, image/jpeg, image/png, image/bmp, image/gif"
    };
  },
  created() {
    // this.gameId && this.getGameById(this.gameId);
  },
  methods: {
    // getGameById(id) {
    //   userService
    //     .getRestfulRequest("getGameById", id)
    //     .then(response => {
    //       this.gameForm.gameName = response.data.game_name;
    //       this.gameForm.gameNameEn = response.data.game_name_en;
    //       this.gameForm.gameScore = response.data.game_score;
    //       this.gameForm.gameType = response.data.game_type
    //         ? response.data.game_type.split(",")
    //         : [];
    //       this.gameForm.gameLanguage = response.data.game_language
    //         ? response.data.game_language.split(",")
    //         : [];
    //       this.gameForm.isSold = response.data.is_sold;
    //       this.gameForm.gameCover = response.data.game_cover;
    //       this.gameForm.gameDevelopers = response.data.game_developers;
    //       this.gameForm.gamePublisher = response.data.game_publisher;
    //       this.gameForm.platform = response.data.platform;
    //       this.gameForm.saleDate = response.data.sale_date;
    //       this.gameForm.gameDesc = response.data.game_desc;
    //     })
    //     .catch(error => {});
    // },
    beforeUpload(file) {
      this.file = file;
      let types = ["image/jpeg", "image/png"];
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
          this.gameForm.gameCover = response.data.url;
        })
        .catch(error => {});
    },
    handleSave() {
      this.newsId ? this.updateNews() : this.addNews();
    },
    addNews() {
      this.$refs.newsForm.validate(valid => {
        if (valid) {
          userService
            .postRequest("addNews", this.newsForm)
            .then(response => {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.$router.push({
                name: "gameNewsList",
                params: {
                  searchParams: this.$route.params.searchParams
                }
              });
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
    },
    updateNews() {
      this.$refs.gameForm.validate(valid => {
        if (valid) {
          userService
            .putRequest("updateGame", this.gameId, this.gameForm)
            .then(response => {
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.$router.push({
                name: "gameNewsList",
                params: {
                  searchParams: this.$route.params.searchParams
                }
              });
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
    },
    handleCancel() {
      this.$refs.newsForm.resetFields();
      this.$router.push({
        name: "gameNewsList",
        params: {
          searchParams: this.$route.params.searchParams
        }
      });
    }
  },
  components: {
    SubHeader,
    SubFooter
  }
};
</script>

<style lang='stylus' scoped>
@import '~src/assets/stylus/variable.styl';

.el-input, .el-textarea {
	width: 450px;
}

.el-form-item__label {
	color: $color-text-s;
}

.el-header {
	height: 60px !important;
}
</style>
