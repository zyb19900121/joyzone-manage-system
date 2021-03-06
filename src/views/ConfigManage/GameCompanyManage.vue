<template>
	<el-container class="sub-page access-log">
		<el-header>
			<SubHeader :pageTitle="pageTitle"></SubHeader>
			<ConditionFilter>
				<div class="add-btn">
					<el-button size="small" round type="primary" @click="handleAddCompany" v-permission>添加公司</el-button>
				</div>
			</ConditionFilter>
		</el-header>
		<el-scrollbar style="height:100%;">
			<el-main>
				<el-table v-loading="loading" ref="multipleTable" :data="companyList" @selection-change="handleSelectionChange" border stripe tooltip-effect="light" style="width: 100%">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column prop="company_name_cn" label="公司名称">
					</el-table-column>
					<el-table-column prop="company_name_en" label="公司名称(英文)">
					</el-table-column>
					<el-table-column prop="company_desc" show-overflow-tooltip label="公司简介">
					</el-table-column>
					<el-table-column prop="order" label="排序" width="120">
					</el-table-column>
					<el-table-column label="操作" width="145">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="handleAddCompany(scope.row)" v-permission>编辑</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.row)" v-permission>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-main>
		</el-scrollbar>
		<el-footer>
			<SubFooter ref="subFooter" showDelete :showPagination="Boolean(companyTotal)" :total="companyTotal" @refreshData="refreshData" @handleDelete="handleDelete"></SubFooter>
		</el-footer>
		<el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
			<el-form :model="companyForm" :rules="companyFormRule" ref="companyForm">
				<el-form-item label="公司名称（中文）" prop="companyNameCn" label-width="100">
					<el-input size="small" v-model="companyForm.companyNameCn"></el-input>
				</el-form-item>
				<el-form-item label="公司名称（英文）" prop="companyNameEn" label-width="100">
					<el-input size="small" v-model="companyForm.companyNameEn"></el-input>
				</el-form-item>
				<el-form-item label="公司简介" prop="companyDesc" label-width="100">
					<el-input size="small" type="textarea" v-model="companyForm.companyDesc" resize="none" rows="5"></el-input>
				</el-form-item>
				<el-form-item label="公司排序" label-width="100" prop="companyOrder">
					<el-input-number size="small" v-model="companyForm.companyOrder" :min="1" :max="100"></el-input-number>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click="handleCancel">取 消</el-button>
				<el-button size="small" type="primary" @click="saveCompany">确 定</el-button>
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
      pageTitle: "游戏厂商管理",
      dialogTitle: "添加公司",
      dialogFormVisible: false,
      searchParams: {
        pageSize: 16,
        currentPage: 1
      },
      multipleSelection: [],
      companyList: [],
      companyTotal: "",
      companyId: "",
      companyForm: {
        companyNameCn: "",
        companyNameEn: "",
        companyDesc: "",
        companyOrder: 1
      },
      companyFormRule: {
        companyNameCn: [
          { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "blur" }
        ],
        companyNameEn: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 1, max: 64, message: "长度在 1 到 64 个字符", trigger: "blur" }
        ],
        companyDesc: [
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
    this.getGameCompanyList(this.searchParams);
  },
  methods: {
    getGameCompanyList(searchParams) {
      this.loading = true;
      userService
        .getRequest("getGameCompanyList", searchParams)
        .then(response => {
          this.companyList = response.data.list;
          this.companyTotal = response.data.total;
          this.loading = false;
        })
        .catch(error => {});
    },
    refreshData(searchParams, isConditionSearch) {
      //如果是根据条件查询触发的此方法 应调用subFoot组件中的ininPageConfig方法来初始化分页参数
      Object.assign(this.searchParams, searchParams);
      this.getGameCompanyList(this.searchParams);
      isConditionSearch && this.$refs.subFooter.ininPageConfig();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAddCompany(gameCompany) {
      gameCompany.id && this.getGameCompanyById(gameCompany.id);
      this.dialogFormVisible = true;
    },
    handleCancel() {
      this.dialogFormVisible = false;
      this.$refs.companyForm.resetFields();
    },
    saveCompany() {
      this.$refs.companyForm.validate(valid => {
        if (valid) {
          if (this.companyId) {
            userService
              .putRequest("updateGameCompany", this.companyId, this.companyForm)
              .then(response => {
                this.$message({
                  type: "success",
                  message: "修改成功!"
                });
                this.dialogFormVisible = false;
                this.$refs.companyForm.resetFields();
                this.getGameCompanyList(this.searchParams);
                this.companyId = "";
              })
              .catch(error => {});
          } else {
            userService
              .postRequest("addGameCompany", this.companyForm)
              .then(response => {
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
                this.dialogFormVisible = false;
                this.$refs.companyForm.resetFields();
                this.getGameCompanyList(this.searchParams);
              })
              .catch(error => {});
          }
        } else {
          return false;
        }
      });
    },
    getGameCompanyById(id) {
      userService
        .getRestfulRequest("getGameCompanyById", id)
        .then(response => {
          this.companyForm.companyNameCn = response.data.company_name_cn;
          this.companyForm.companyNameEn = response.data.company_name_en;
          this.companyForm.companyDesc = response.data.company_desc;
          this.companyForm.companyOrder = response.data.order;
          this.companyId = response.data.id;
        })
        .catch(error => {});
    },
    handleDelete(log) {
      let ids = [];
      if (!log) {
        this.multipleSelection.length &&
          this.multipleSelection.map(item => {
            ids.push(item.id);
          });
      }
      let idsLength = ids.length;
      ids = ids.length ? ids.join(",") : log.id;

      this.$confirm("您确定是否要删除此记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userService
            .deleteRequest("deleteGameCompany", ids)

            .then(response => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              if (
                idsLength === this.companyList.length &&
                this.searchParams.currentPage > 1
              ) {
                this.searchParams.currentPage =
                  this.searchParams.currentPage - 1;
              }
              this.getGameCompanyList(this.searchParams);
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
