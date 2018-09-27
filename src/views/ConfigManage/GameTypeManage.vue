<template>
	<el-container class="sub-page">
		<el-header>
			<SubHeader :pageTitle="pageTitle"></SubHeader>
			<ConditionFilter>
				<div class="add-btn">
					<el-button size="small" round type="primary" @click="handleAddType" v-permission>添加类型</el-button>
				</div>
			</ConditionFilter>
		</el-header>
		<el-scrollbar style="height:100%;">
			<el-main>
				<el-table v-loading="loading" ref="multipleTable" :data="typeList" @selection-change="handleSelectionChange" border stripe tooltip-effect="light" style="width: 100%">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="type_name_cn" label="类型名称">
					</el-table-column>
					<el-table-column prop="type_name_en" label="类型名称(英文)">
					</el-table-column>
					<el-table-column prop="type_desc" show-overflow-tooltip label="类型简介">
					</el-table-column>
					<el-table-column prop="order" label="排序" width="120">
					</el-table-column>
					<el-table-column label="操作" width="145">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="handleAddType(scope.row)" v-permission>编辑</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.row)" v-permission>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-main>
		</el-scrollbar>
		<el-footer>
			<SubFooter ref="subFooter" showDelete :showPagination="Boolean(typeTotal)" :total="typeTotal" @refreshData="refreshData" @handleDelete="handleDelete"></SubFooter>
		</el-footer>
		<el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
			<el-form :model="typeForm" :rules="typeFormRule" ref="typeForm">
				<el-form-item label="类型名称（中文）" prop="typeNameCn" label-width="100">
					<el-input size="small" v-model="typeForm.typeNameCn"></el-input>
				</el-form-item>
				<el-form-item label="类型名称（英文）" prop="typeNameEn" label-width="100">
					<el-input size="small" v-model="typeForm.typeNameEn"></el-input>
				</el-form-item>
				<el-form-item label="类型简介" prop="typeDesc" label-width="100">
					<el-input size="small" type="textarea" v-model="typeForm.typeDesc" resize="none" rows="5"></el-input>
				</el-form-item>
				<el-form-item label="类型排序" label-width="100" prop="typeOrder">
					<el-input-number size="small" v-model="typeForm.typeOrder" :min="1" :max="100"></el-input-number>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click="handleCancel">取 消</el-button>
				<el-button size="small" type="primary" @click="saveType">确 定</el-button>
			</div>
		</el-dialog>
	</el-container>
</template>

<script type='es6'>
import userService from "http/userService";
import SubHeader from "components/SubHeader";
import SubFooter from "components/SubFooter";
import ConditionFilter from "components/ConditionFilter";
export default {
  name: "",
  data() {
    return {
      pageTitle: "游戏类型管理",
      dialogTitle: "添加类型",
      dialogFormVisible: false,
      searchParams: {
        pageSize: 16,
        currentPage: 1
      },
      multipleSelection: [],
      typeList: [],
      typeTotal: "",
      typeId: "",
      typeForm: {
        typeNameCn: "",
        typeNameEn: "",
        typeDesc: "",
        typeOrder: 1
      },
      typeFormRule: {
        typeNameCn: [
          { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "blur" }
        ],
        typeNameEn: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 1, max: 64, message: "长度在 1 到 64 个字符", trigger: "blur" }
        ],
        typeDesc: [
          {
            min: 1,
            max: 255,
            message: "长度在 1 到 255 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getGameTypeList(this.searchParams);
  },
  methods: {
    getGameTypeList(searchParams) {
      this.loading = true;
      userService
        .getRequest("getGameTypeList", searchParams)
        .then(response => {
          this.typeList = response.data.list;
          this.typeTotal = response.data.total;
          this.loading = false;
        })
        .catch(error => {});
    },
    refreshData(searchParams, isConditionSearch) {
      //如果是根据条件查询触发的此方法 应调用subFoot组件中的ininPageConfig方法来初始化分页参数
      Object.assign(this.searchParams, searchParams);
      this.getGameTypeList(this.searchParams);
      isConditionSearch && this.$refs.subFooter.ininPageConfig();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAddType(gameType) {
      gameType.id && this.getGameTypeById(gameType.id);
      this.dialogFormVisible = true;
    },
    handleCancel() {
      this.dialogFormVisible = false;
      this.$refs.typeForm.resetFields();
    },
    saveType() {
      this.$refs.typeForm.validate(valid => {
        if (valid) {
          if (this.typeId) {
            userService
              .putRequest("updateGameType", this.typeId, this.typeForm)
              .then(response => {
                this.$message({
                  type: "success",
                  message: "修改成功!"
                });
                this.dialogFormVisible = false;
                this.$refs.typeForm.resetFields();
                this.getGameTypeList(this.searchParams);
                this.typeId = "";
              })
              .catch(error => {});
          } else {
            userService
              .postRequest("addGameType", this.typeForm)
              .then(response => {
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
                this.dialogFormVisible = false;
                this.$refs.typeForm.resetFields();
                this.getGameTypeList(this.searchParams);
              })
              .catch(error => {});
          }
        } else {
          return false;
        }
      });
    },
    getGameTypeById(id) {
      userService
        .getRestfulRequest("getGameTypeById", id)
        .then(response => {
          
          this.typeForm.typeNameCn = response.data.type_name_cn;
          this.typeForm.typeNameEn = response.data.type_name_en;
          this.typeForm.typeDesc = response.data.type_desc;
          this.typeForm.typeOrder = response.data.order;
          this.typeId = response.data.id;
        })
        .catch(error => {});
    },
    handleDelete(type) {
      let ids = [];
      if (!type) {
        this.multipleSelection.length &&
          this.multipleSelection.map(item => {
            ids.push(item.id);
          });
      }
      let idsLength = ids.length;
      ids = ids.length ? ids.join(",") : type.id;

      this.$confirm("您确定是否要删除此记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userService
            .deleteRequest("deleteGameType", ids)

            .then(response => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              if (
                idsLength === this.typeList.length &&
                this.searchParams.currentPage > 1
              ) {
                this.searchParams.currentPage =
                  this.searchParams.currentPage - 1;
              }
              this.getGameTypeList(this.searchParams);
            })
            .catch(error => {});
        })
        .catch(() => {});
    }
  },
  components: {
    SubHeader,
    SubFooter,
    ConditionFilter
  }
};
</script>

<style lang='stylus' scoped>
</style>
