<template>
	<el-container class="sub-page add-game">
		<el-header>
			<SubHeader :pageTitle="pageTitle"></SubHeader>
		</el-header>
		<el-scrollbar style="height:100%;">
			<el-main>
				<el-form :model="gameForm" :rules="gameFormRule" ref="gameForm" label-width="150px">
					<el-form-item label="游戏名称" prop="gameName">
						<el-input size="small" v-model="gameForm.gameName" clearable></el-input>
					</el-form-item>
					<el-form-item label="游戏名称（英文）" prop="gameNameEn">
						<el-input size="small" v-model="gameForm.gameNameEn" clearable></el-input>
					</el-form-item>

					<el-form-item label="游戏平台" prop="platform">
						<el-select size="small" v-model="gameForm.platform" placeholder="请选择游戏平台">
							<el-option v-for="(item,index) in platformList" :key="index" :label="item" :value="item">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="游戏类型" prop="gameType">
						<el-select size="small" v-model="gameForm.gameType" multiple placeholder="请选择游戏类型">
							<el-option v-for="(type,index) in gameTypeList" :key="index" :label="type" :value="type">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="游戏评分" prop="gameScore">
						<el-input-number size="small" v-model="gameForm.gameScore" :min="1" :max="10"></el-input-number>
					</el-form-item>

					<el-form-item label="游戏封面" prop="gameCover">
						<el-upload class="avatar-uploader" :http-request="httpRequest" :action="''" :show-file-list="false" :before-upload="beforeUpload">
							<img v-if="gameForm.gameCover" :src="baseUrl+gameForm.gameCover" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="已发售" prop="isSoldSwitch">
						<el-switch v-model="isSoldSwitch" @change="handleSoldSwitch"></el-switch>
					</el-form-item>

					<el-form-item label="发售时间" prop="saleDate">
						<el-date-picker size="small" v-model="gameForm.saleDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
						</el-date-picker>
					</el-form-item>

					<el-form-item label="游戏简介" prop="gameDesc">
						<el-input size="small" type="textarea" v-model="gameForm.gameDesc" resize="none" rows="5"></el-input>
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
import { platformList, gameTypeList } from "utils/gameConfig";
export default {
  name: "",
  data() {
    return {
      baseUrl,
      pageTitle: "添加游戏",
      loading: false,
      gameId: this.$route.params.id,
      gameList: [],
      gameTypeList,
      platformList,
      fileType: "game_cover", //上传图片的类型，为了存在不同的目录,
      isSoldSwitch: true,
      gameForm: {
        gameName: "",
        gameNameEn: "",
        gameType: "",
        gameScore: "",
        gameCover: "",
        platform: "",
        isSold: "1",
        saleDate: "",
        gameDesc: ""
      },
      gameFormRule: {
        gameName: [
          { required: true, message: "请输入游戏名称", trigger: "blur" },
          { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "blur" }
        ],
        gameNameEn: [
          { min: 1, max: 64, message: "长度在 1 到 64 个字符", trigger: "blur" }
        ],
        gameDesc: [
          {
            min: 1,
            max: 255,
            message: "长度在 1 到 255 个字符",
            trigger: "blur"
          }
        ]
      },

      accept: "image/jpg, image/jpeg, image/png, image/bmp, image/gif"
    };
  },
  created() {
    this.gameId && this.getGameById(this.gameId);
  },
  watch: {
    "gameForm.isSold"(newVal) {
      this.isSoldSwitch = newVal == "1" ? true : false;
    }
  },
  methods: {
    handleSoldSwitch() {
      this.gameForm.isSold = this.isSoldSwitch ? "1" : "0";
    },
    getGameById(id) {
      userService
        .getRestfulRequest("getGameById", id, 1)
        .then(response => {
          this.gameForm.gameName = response.data.game_name;
          this.gameForm.gameNameEn = response.data.game_name_en;
          this.gameForm.gameScore = response.data.game_score;
          this.gameForm.gameType = response.data.game_type
            ? response.data.game_type.split(",")
            : [];
          this.gameForm.isSold = response.data.is_sold;
					this.gameForm.gameCover = response.data.game_cover;
					this.gameForm.platform = response.data.platform;
          this.gameForm.saleDate = response.data.sale_date;
          this.gameForm.gameDesc = response.data.game_desc;
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
          this.gameForm.gameCover = response.data.url;
        })
        .catch(error => {});
    },
    handleSave() {
      this.gameId ? this.updateGame() : this.addGame();
    },
    addGame() {
      this.$refs.gameForm.validate(valid => {
        if (valid) {
          userService
            .postRequest("getGameList", this.gameForm)
            .then(response => {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.$router.push({
                name: "gameList",
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
    updateGame() {
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
                name: "gameList",
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
      this.$refs.gameForm.resetFields();
      this.$router.push({
        name: "gameList",
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
