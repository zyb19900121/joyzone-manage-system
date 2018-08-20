<template>
	<div class="login">
		<div class="login-info">
			<el-form :model="loginFrom">
				<el-form-item>
					<el-input v-model="loginFrom.username" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="loginFrom.password" placeholder="密码"></el-input>
				</el-form-item>
			</el-form>
			<el-button type="primary" @click="login">登陆</el-button>
		</div>
	</div>
</template>

<script type='es6'>
import userService from "http/userService";
export default {
  name: "",
  data() {
    return {
      loginFrom: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      userService
        .postRequest("login", this.loginFrom)
        .then(response => {
          console.log("response: ", response);
        })
        .catch(error => {});
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '~src/assets/stylus/variable.styl';

.login {
	width: 100%;
	height: 100%;
	background: $color-border-p;
	display: flex;
	flex-flow: row;
	justify-content: center;
	align-items: center;

	.login-info {
		display: flex;
		flex-flow: column;
		padding: 40px;
		border: 1px solid $color-border-p;
		justify-content: center;
		align-items: center;
	}
}
</style>
