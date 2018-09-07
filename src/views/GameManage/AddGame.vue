<template>
	<el-container class="sub-page add-game">
		<el-header>
			<SubHeader :pageTitle="pageTitle"></SubHeader>
		</el-header>
		<el-scrollbar style="height:100%;">
			<el-main>
				<el-form :model="gameForm" :rules="gameFormRule" ref="gameForm" label-width="150px">
					<el-form-item label="游戏名称" prop="gameName">
						<el-input v-model="gameForm.gameName" clearable></el-input>
					</el-form-item>
					<el-form-item label="游戏名称（英文）" prop="gameNameEn">
						<el-input v-model="gameForm.gameNameEn" clearable></el-input>
					</el-form-item>

					<el-form-item label="游戏类型" prop="gameType">
						<el-select v-model="gameForm.gameType" multiple placeholder="请选择游戏类型">
							<el-option v-for="(type,index) in gameTypeList" :key="index" :label="type" :value="type">
							</el-option>
						</el-select>
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
						<el-date-picker v-model="gameForm.saleDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
						</el-date-picker>
					</el-form-item>

					<el-form-item label="游戏简介" prop="gameDesc">
						<el-input type="textarea" v-model="gameForm.gameDesc" resize="none" rows="5"></el-input>
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
export default {
  name: "",
  data() {
    return {
      baseUrl,
      pageTitle: "添加游戏",
      loading: false,
      gameId: this.$route.params.id,
      gameList: [],
      gameTypeList: ["动作", "竞速", "角色扮演", "体育", "射击"],
      fileType: "game_cover", //上传图片的类型，为了存在不同的目录,
      isSoldSwitch: true,
      gameForm: {
        gameName: "",
        gameNameEn: "",
        gameType: "",
        gameCover: "",
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
		console.log("gameId: ", this.gameId);
		this.gameId && this.getGameById(this.gameId)
  },
  methods: {
    handleSoldSwitch() {
      this.gameForm.isSold = this.isSoldSwitch ? "1" : "0";
    },
    getGameById(id) {
      userService
        .getRestfulRequest("getGameById", id, 1)
        .then(response => {
					console.log('response: ', response);
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
      this.$refs.gameForm.validate(valid => {
        if (valid) {
          userService
            .postRequest("getGameList", this.gameForm)
            .then(response => {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.$emit("refreshData");
              this.$router.push({ name: "gameList" });
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
		},
		handleCancel(){
			this.$refs.gameForm.resetFields();
			this.$router.push({ name: "gameList" });
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
