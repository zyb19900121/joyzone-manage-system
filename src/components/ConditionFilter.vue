<template>
	<div class="condition-filter">
		<div class="condition-part">
			<div class="add-btn" v-if="showAddBtn">
				<el-button size="small" round type="primary" @click="handleAddBtn" v-permission>{{addBtnName}}</el-button>
			</div>

			<slot></slot>

			<div class="select" v-if="showSelect">
				<span class="select-label">{{selectName}}</span>
				<el-select size="small" v-model="selectValue" placeholder="请选择" @change="handleSelectValue" clearable>
					<el-option v-for="(item,index) in selectionOptions" :key="index" :label="item[optionLabel]" :value="item[optionValue]">
					</el-option>
				</el-select>
			</div>
		</div>

		<el-date-picker size="small" v-if="showDatePicker" v-model="dateRange" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
		</el-date-picker>

		<div class="keyword-search" v-if="showKeywordSearch">
			<el-input size="small" placeholder="请输入游戏名称" clearable @clear="handleKeywordSearch" v-model="keyword" @keyup.enter.native="handleKeywordSearch">
				<el-button slot="append" icon="el-icon-search" @click="handleKeywordSearch"></el-button>
			</el-input>
		</div>

	</div>
</template>

<script type='es6'>
export default {
  name: "condition-filter",
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
    optionLabel: {
      type: String,
      default: ""
    },
    optionValue: {
      type: String,
      default: ""
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
    }
  },
  methods: {
    handleAddBtn() {
      this.$emit("addGame");
    },
    handleSelectValue(val) {
      let searchParams = {
        selectValue: val,
        currentPage: 1,
        pageSize: 18
      };
      let isConditionSearch = true;
      this.$emit("refreshData", searchParams, isConditionSearch);
    },
    handleKeywordSearch() {
      let searchParams = {
        keyword: this.keyword,
        currentPage: 1,
        pageSize: 18
      };
      let isConditionSearch = true;
      this.$emit("refreshData", searchParams, isConditionSearch);
    },
    setSearchParams(searchParams) {
      searchParams.keyword && (this.keyword = searchParams.keyword);
      searchParams.orderBy && (this.selectValue = searchParams.orderBy);
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '~src/assets/stylus/variable.styl';

.condition-filter {
	padding: 0px 20px 15px 20px;
	display: flex;
	flex-flow: row;
	justify-content: space-between;

	.condition-part {
		display: flex;
		flex-flow: row;
		flex-wrap: wrap;
	}

	.add-btn {
		margin-top: 15px;
		margin-right: 20px;
	}

	.select {
		margin-right: 20px;
		margin-top: 15px;

		.select-label {
			color: $color-text-t;
			font-size: $font-size-small;
		}
	}

	.keyword-search {
		margin-top: 15px;
	}

	.el-date-editor {
		margin-top: 15px;
	}

	.el-checkbox {
		margin-right: 20px;
		margin-top: 22px;

		.el-checkbox__label {
			font-size: 13px;
		}
	}
}
</style>
