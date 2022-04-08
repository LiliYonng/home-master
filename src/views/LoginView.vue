<template>
  <div class="login-container">
    <el-form ref="formRef" class="login-form" :rules="rules" :model="form">
      <div class="login-title">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item prop="UserName">
        <el-icon :size="20" class="svg-container">
          <user />
        </el-icon>
        <el-input v-model="form.UserName" />
      </el-form-item>
      <el-form-item prop="Password">
        <el-icon :size="20" class="svg-container">
          <edit />
        </el-icon>
        <el-input type="password" v-model="form.Password" />
      </el-form-item>
      <el-form-item
        ><el-button type="primary" class="login-button" @click="submitForm"
          >登陆</el-button
        ></el-form-item
      >
    </el-form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Edit, User } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getPermission } from "../../api/data";
const form = ref({ UserName: "", Password: "" });
const rules = ref({
  UserName: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  Password: [
    { required: true, message: "Please input Activity password", trigger: "blur" },
  ],
});
const formRef = ref(null);

const router = useRouter();
const store = useStore();
const submitForm = () => {
  getPermission(form.value).then((res) => {
    if (res.data.code === 200) {
      console.log(res);
      //store.commit("setToken", token);
      //router.push({ name: "home" });
    }
  });
  let arr = [1, 2, 3];
  store.commit("setMenu", arr);
  arr.push(4);
  let a = store.commit("getMenu");
  console.log(a);
  //用mock模拟后端返回登陆权限
  // const token = Mock.Random.guid()
  // store.commit('setToken',token)
  // router.push({name:'home'})
};
</script>

<style lang="less" scoped>
.login-container {
  width: 350px;
  margin: 200px auto;
  padding: 10px 10px 5px 10px;
  border: 1px solid #fff;
  box-shadow: 0 0 25px #cac6c6;
  .el-input {
    width: 80%;
  }
}
.login-title {
  text-align: center;
}
.login-button {
  margin: 5px auto 0 auto;
}
.svg-container {
  vertical-align: right;
  padding: 6px 5px 6px 15px;
  display: inline-block;
  margin: 10px 0;
}
</style>
