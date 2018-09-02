<template>
	<el-container class="sub-page add-game">
		<el-header>
			<SubHeader :pageTitle="pageTitle"></SubHeader>
		</el-header>
		<el-scrollbar style="height:100%;">
			<el-main>

			</el-main>
		</el-scrollbar>
		<el-footer>
			<SubFooter showSave showCancel ref="subFooter"></SubFooter>
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
      pageTitle: "添加游戏",
      loading: false,
      gameList: []
    };
  },
  created() {},
  methods: {},
  components: {
    SubHeader,
    SubFooter,
    ConditionFilter
  }
};
</script>

<style lang='stylus' scoped>
@import '~src/assets/stylus/variable.styl';

.el-header {
	height: 60px !important;
}
</style>
