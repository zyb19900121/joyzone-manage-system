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

					<el-form-item label="资讯所属平台" prop="platform">
						<el-select size="small" v-model="newsForm.platform" clearable placeholder="请选择游戏平台">
							<el-option v-for="(item,index) in platformList" :key="index" :label="item" :value="item">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="资讯所属游戏" prop="platform">
						<el-select size="small" v-model="newsForm.gameId" clearable placeholder="请选择游戏">
							<el-option v-for="(item,index) in gameList" :key="index" :label="item.game_name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="资讯缩略图" prop="gameCover">
						<el-upload class="avatar-uploader" :http-request="httpRequest" :action="''" :show-file-list="false" :before-upload="beforeUpload">
							<img v-if="newsForm.newsThumbnail" :src="baseUrl+newsForm.newsThumbnail" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item class="rich-text" label="资讯内容" prop="gameDesc">
						<!-- <el-input size="small" type="textarea" v-model="newsForm.newsContent" resize="none" rows="5"></el-input> -->
						<quill-editor v-model="newsForm.newsContent" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
						</quill-editor>
					</el-form-item>

					<el-form-item label="Banner新闻" prop="isBanner">
						<el-switch v-model="isBanner" @change="handleBannerSwitch"></el-switch>
					</el-form-item>

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
import VueQuillEditor, { Quill } from "vue-quill-editor";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

export default {
  name: "",
  data() {
    return {
      baseUrl,
      pageTitle: "添加咨询",
      loading: false,
      newsId: this.$route.params.id,
      gameList: [],
      platformList: ["全部", ...platformList],
      fileType: "news_thumbnail", //上传图片的类型，为了存在不同的目录,
      isBanner: false,
      newsForm: {
        newsTitle: "",
        newsContent: "",
        newsThumbnail: "",
        platform: "",
        isBanner: "0",
        gameId: null
      },
      newsFormRule: {
        newsTitle: [
          { required: true, message: "请输入游戏名称", trigger: "blur" },
          { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "blur" }
        ]
      },
      accept: "image/jpg, image/jpeg, image/png, image/bmp, image/gif",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"]
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: ["Resize", "DisplaySize", "Toolbar"]
          }
        }
      }
    };
  },
  watch: {
    "newsForm.isBanner"(newVal) {
      this.isBanner = newVal == "1" ? true : false;
    }
  },
  created() {
    this.getGameList();
    this.newsId && this.getNewsById(this.newsId);
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
    getNewsById(id) {
      userService
        .getRestfulRequest("getNewsById", id)
        .then(response => {
          this.newsForm.newsTitle = response.data.news_title;
          this.newsForm.newsContent = response.data.news_content;
          this.newsForm.newsThumbnail = response.data.news_thumbnail;
          this.newsForm.platform = response.data.platform;
          this.newsForm.gameId = response.data.game_id;
          this.newsForm.isBanner = response.data.is_banner;
        })
        .catch(error => {});
    },
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
          this.newsForm.newsThumbnail = response.data.url;
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
      this.$refs.newsForm.validate(valid => {
        if (valid) {
          userService
            .putRequest("updateNews", this.newsId, this.newsForm)
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
    },
    handleBannerSwitch() {
      this.newsForm.isBanner = this.isBanner ? "1" : "0";
    },
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorReady() {}
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
