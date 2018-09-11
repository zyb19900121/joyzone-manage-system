<template>
	<div class="condition-filter">
		<div class="add-btn" v-if="showAddBtn">
			<el-button size="small" round type="primary" @click="handleAddBtn" v-permission>{{addBtnName}}</el-button>
		</div>

		<div class="select" v-if="showSelect">
			<span class="select-label">{{selectName}}</span>
			<el-select v-model="selectValue" placeholder="请选择" clearable>
				<el-option v-for="(item,index) in selectionOptions" :key="index" :label="item.game_name" :value="item.id">
				</el-option>
			</el-select>
		</div>

		<el-date-picker v-if="showDatePicker" v-model="dateRange" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
		</el-date-picker>

		<div class="keyword-search" v-if="showKeywordSearch">
			<el-input placeholder="请输入游戏名称" clearable @clear="handleKeywordSearch" v-model="keyword">
				<el-button slot="append" icon="el-icon-search" @click="handleKeywordSearch"></el-button>
			</el-input>
		</div>

	</div>
</template>

<script type='es6'>
export default {
  name: "",
  props: {
    showAddBtn: {
      type: Boolean,
      default: false
    },
    addBtnName: {
      type: String,
      default: ""
    },
    showDatePicker: {
      type: Boolean,
      default: false
    },
    showSelect: {
      type: Boolean,
      default: false
    },
    selectName: {
      type: String,
      default: ""
    },
    selectionOptions: {
      type: Array,
      default: () => []
    },
    showKeywordSearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectValue: "",
      dateRange: "",
      startDate: "",
      endDate: "",
      keyword: ""
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
        pageSize: 18
      };
      let isConditionSearch = true;
      this.$emit("refreshData", searchParams, isConditionSearch);
    },
    selectValue(newVal) {
      console.log("newVal: ", newVal);
      if (newVal) {
        this.startDate = newVal[0];
      } else {
        this.startDate = "";
        this.endDate = "";
      }
      let searchParams = {
        gameId: this.selectValue,
        currentPage: 1,
        pageSize: 18
      };
      let isConditionSearch = true;
      this.$emit("refreshData", searchParams, isConditionSearch);
    }
  },
  methods: {
    handleAddBtn() {
      this.$emit("addGame");
    },

    handleKeywordSearch() {
      let searchParams = {
        keyword: this.keyword
      };
      let isConditionSearch = true;
      this.$emit("refreshData", searchParams, isConditionSearch);
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
	justify-content: space-between;

	.select {
		.select-label {
			color: $color-text-t;
			font-size: $font-size-small;
		}
	}
}
</style>
