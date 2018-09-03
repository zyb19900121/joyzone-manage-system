<template>
	<div class="sub-footer">
		<div class="operation-area">
			<el-button v-if=showDelete type="text" @click="handleDelete">删除</el-button>
			<el-button v-if=showSave size="small" round type="primary" @click="handleSave">保存</el-button>
			<el-button v-if=showCancel size="small" round @click="handleCancel">取消</el-button>
		</div>
		<!-- layout="total, sizes, prev, pager, next" 全部元素 -->
		<el-pagination v-if="showPagination" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="searchParams.currentPage" :page-sizes="[15, 30, 60, 120]" :page-size="searchParams.pageSize" layout="prev, pager, next" :total="total">
		</el-pagination>
	</div>
</template>

<script type='es6'>
export default {
  name: "",
  props: {
    showDelete: {
      type: Boolean,
      default: false
    },
    showSave: {
      type: Boolean,
      default: false
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      searchParams: {
        currentPage: 1,
        pageSize: 15
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      this.searchParams.pageSize = val;
      this.$emit("refreshData", this.searchParams);
    },
    handleCurrentChange(val) {
      this.searchParams.currentPage = val;
      this.$emit("refreshData", this.searchParams);
    },
    handleDelete() {
      this.$emit("handleDelete");
    },
    handleSave() {
      console.log("save");
    },
    handleCancel() {
      console.log("cancel");
      this.$router.push({ name: "gameList" });
    },
    ininPageConfig() {
      this.searchParams = {
        currentPage: 1,
        pageSize: 15
      };
    }
  }
};
</script>

<style lang='stylus' scoped>
</style>
