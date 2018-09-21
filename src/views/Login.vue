<template>
	<div class="login-container">
		<vue-particles color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4" linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
		</vue-particles>
		<div class="login">
			<div class="login-info">
				<div class="title">
					<img class="logo" src="../assets/img/logo_login.png" alt="">
				</div>
				<div class="login-form">
					<el-form ref="loginForm" :model="loginForm" :rules="rules">
						<el-form-item prop="username">
							<el-input v-model="loginForm.username" clearable placeholder="用户名"></el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input v-model="loginForm.password" type="password" clearable placeholder="密码" @keyup.enter.native="login"></el-input>
						</el-form-item>
						<el-button type="primary" @click="login">登 录</el-button>
					</el-form>
				</div>
			</div>
		</div>
	</div>

</template>

<script type='es6'>
import userService from "http/userService";
import { mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          userService
            .postRequest("login", this.loginForm)
            .then(response => {
              localStorage.setItem("MY_GAME_TOKEN", response.data.token);
              localStorage.setItem(
                "USER_INFO",
                JSON.stringify(response.data.userInfo)
              );
              this.setUserInfo(response.data.userInfo);
              this.$router.push({ path: "/gameManage" });
            })
            .catch(error => {});
        } else {
          return false;
        }
      });
    },
    ...mapMutations({
      setUserInfo: "setUserInfo"
    })
  }
};
</script>

<style lang='stylus' scoped>
@import '~src/assets/stylus/variable.styl';

.login-container {
	width: 100%;
	height: 100%;

	.login {
		width: 100%;
		height: 100%;
		background: $color-border-p;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;

		.login-info {
			z-index: 9;
			display: flex;
			flex-flow: column;
			// justify-content: center;
			align-items: center;
			width: 50%;
			max-width: 475px;
			height: 380px;
			background: rgba(255, 255, 255, 0.2);
			border-radius: 20px;

			.title {
				flex: 1;
				width: 100%;
				display: flex;
				flex-flow: row;
				justify-content: center;
				align-items: center;

				.logo {
					height: 175px;
					width: auto;
				}
			}

			.login-form {
				flex: 1;
				width: 58%;

				.el-button {
					width: 100%;
				}
			}
		}
	}
}
</style>
