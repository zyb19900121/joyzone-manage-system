<template>
	<div class="sub-footer">
		<div class="operation-area">
			<el-button v-if=showDelete type="text" @click="handleDelete" v-permission>删除</el-button>
			<el-button v-if=showSave size="small" round type="primary" @click="handleSave" v-permission>保存</el-button>
			<el-button v-if=showCancel size="small" round @click="handleCancel">取消</el-button>
		</div>
		<!-- layout="total, sizes, prev, pager, next" 全部元素 -->
		<el-pagination v-if="showPagination" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchParams.currentPage" :page-sizes="[16, 32, 64, 128]" :page-size="searchParams.pageSize" layout="prev, pager, next" :total="total">
		</el-pagination>
	</div>
</template>

<script type='es6'>
export default {
  name: "sub-footer",
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
      type: Number
    }
  },
  data() {
    return {
      searchParams: {
        currentPage: 1,
        pageSize: 16
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
      this.$emit("handleSave");
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    ininPageConfig() {
      this.searchParams = {
        currentPage: 1,
        pageSize: 16
      };
    },
    setSearchParams(searchParams) {
      this.searchParams.currentPage = searchParams.currentPage;
    }
  }
};
</script>

<style lang='stylus' scoped>
</style>
