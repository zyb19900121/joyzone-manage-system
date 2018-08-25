<template>
	<div class="sub-footer">
		<div></div>
		<!-- layout="total, sizes, prev, pager, next" 全部元素 -->
		<el-pagination v-if="showPagination" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="searchParams.currentPage" :page-sizes="[15, 30, 60, 120]" :page-size="searchParams.pageSize" layout="prev, pager, next" :total="total">
		</el-pagination>
	</div>
</template>

<script type='es6'>
export default {
  name: "",
  props: {
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
			searchParams:{
				currentPage: 1,
				pageSize: 15
			}
    };
  },
  methods: {
    handleSizeChange(val) {
			this.searchParams.pageSize = val;
			this.$emit('refreshData',this.searchParams)
    },
    handleCurrentChange(val) {
      this.searchParams.currentPage = val;
      this.$emit('refreshData',this.searchParams)
    }
  }
};
</script>

<style lang='stylus' scoped>
</style>
