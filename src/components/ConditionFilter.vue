<template>
	<div class="condition-filter">
		<el-date-picker v-if="showDatePicker" v-model="dateRange" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
		</el-date-picker>
	</div>
</template>

<script type='es6'>
export default {
  name: "",
  props: {
    showDatePicker: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dateRange: "",
      startDate: "",
      endDate: ""
    };
  },
  watch: {
    dateRange(newVal) {
      console.log("newVal: ", newVal);
      if (newVal) {
        this.startDate = newVal[0];
        this.endDate = newVal[1];
      } else {
        this.startDate = "";
        this.endDate = "";
      }
      let searchParams = {
        startDate: this.startDate,
        endDate: this.endDate,
        currentPage: 1,
        pageSize: 15
			};
			let isConditionSearch = true;
      this.$emit("refreshData", searchParams,isConditionSearch);
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '~src/assets/stylus/variable.styl';

.condition-filter {
	padding: 20px 20px;
	display: flex;
	flex-flow: row;
	justify-content: flex-end;
}
</style>
