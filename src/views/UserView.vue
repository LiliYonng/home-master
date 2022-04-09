<template>
  <div class="form_dialog">
    <el-dialog
      width="30%"
      :title="operation === 'add' ? '新增用户' : '更新用户'"
      v-model="showForm"
      draggable
    >
      <common-form
        :formData="operate_form"
        :formLabel="operate_formLable"
        :isInline="true"
        :rules="rules"
        @cancleForm="cancle"
        @submit="submit"
      >
      </common-form>
    </el-dialog>
  </div>
  <div class="user_header">
    <el-button type="primary" @click="addData">新增+</el-button>
    <div class="search">
      <el-input v-model="searchKey" placeholder="请输入关键词" inline="true"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
  </div>
  <div class="table">
    <common-table
      :tableData="userData"
      :tableLable="userLable"
      @del="deleteData"
      @edit="editData"
      ref="myTable"
    >
    </common-table>
  </div>
  <div class="pagination">
    <el-pagination
      layout="prev,pager,next, jumper"
      :page-count="totalPage"
      v-model:currentPage="currentPage"
    />
  </div>
</template>
<script setup>
import CommonForm from "@/components/CommonForm";
import CommonTable from "@/components/CommonTable";
import axios from "axios";
import { getUserData } from "../../api/data";
import { ref, watch, onMounted } from "vue";

const myTable = ref(null);
//form表单数据
const searchKey = ref("");
const operate_form = ref({});
const operate_formLable = ref([
  {
    name: "name",
    label: "姓名",
    type: "input",
  },
  {
    name: "age",
    label: "年龄",
    type: "input",
    requiredType: "num",
  },
  {
    name: "sex",
    label: "性别",
    type: "select",
    options: [
      {
        label: "男",
        value: 1,
      },
      {
        label: "女",
        value: 0,
      },
    ],
  },
  {
    name: "birth",
    label: "出生日期",
    type: "date",
  },
  {
    name: "addr",
    label: "地址",
    type: "input",
  },
]);

const rules = ref({
  name: [
    { required: true, message: "请输入您的名字", trigger: "blur" },
    { min: 2, max: 5, message: "请输入有效名字，不超过5个字符", trigger: "blur" },
  ],
  age: [
    { required: true, message: "请输入您的年龄" },
    { type: "number", message: "请输入有效数字" },
  ],
  sex: [{ required: true, message: "请选择您的性别" }],
});
//table列表数据
const userData = ref([]);
const userLable = ref(["1"]);
const operation = ref(null);
const totalPage = ref(null);
const showForm = ref(false);
const currentPage = ref(1);
const getData = (name = "", page) => {
  getUserData({ name, page })
    .then((res) => {
      if (res.status === 200) {
        userData.value = res.data.userData.map((item) => {
          item.sex = item.sex === 0 ? "女" : "男";
          return item;
        });
        userLable.value = res.data.userLable;
        totalPage.value = res.data.total;
        // myTable.value.scrollTarget();
      }
    })
    .catch((err) => console.log(err.message));
};

const search = () => {
  getData(searchKey.value);
};
const addData = () => {
  showForm.value = true;
  operation.value = "add";
  operate_form.value = { name: "", age: "", sex: "", birth: "", addr: "" };
};
const editData = (row) => {
  showForm.value = true;
  operation.value = "delete";
  operate_form.value = { ...row };
};
const deleteData = (row) => {
  ElMessageBox.confirm("数据将永久删除，确认继续？", "Warning", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      const id = row.id;
      axios
        .post("user/delete", id)
        .then((res) => {
          if (res.status === 200) {
            getData();
            ElMessage({
              type: "success",
              message: "删除成功",
            });
          } else {
            throw new HttpError(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
const submit = () => {
  if (operation.value === "add") {
    axios
      .post("user/add", operate_form.value)
      .then((res) => {
        if (res.status === 200) return res;
        else throw new HttpError(res);
      })
      .catch(alert);
  } else {
    axios
      .post("user/edit", operate_form.value)
      .then((res) => {
        if (res.status === 200) return res;
        else throw new HttpError(res);
      })
      .catch(alert);
  }
  showForm.value = false;
  ElMessage({
    message: "操作成功",
    type: "success",
  });
  getData();
};
const cancle = () => {
  showForm.value = false;
};
watch(currentPage, () => {
  //当前页改变时刷新页面

  getData(null, currentPage.value);
});

onMounted(() => {
  getData();
});
</script>

<style lang="less">
.user_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search {
  .el-input {
    width: 180px;
  }
}
.pagination {
  float: right;
}
</style>
