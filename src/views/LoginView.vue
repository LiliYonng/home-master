<template>
  <div class="login">
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
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Edit, User } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { getPermission } from "../../api/data";
const form = ref({ UserName: "", Password: "" });
const rules = ref({
  UserName: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, message: "用户名长度不少于3", trigger: "blur" },
  ],
  Password: [{ required: true, message: "请输入正确的密码", trigger: "blur" }],
});
const formRef = ref(null);
const router = useRouter();
const store = useStore();
const submitForm = () => {
  getPermission(form.value)
    .then((res) => {
      if (res.data.code === 200) {
        store.commit("setToken", res.data.token);
        store.commit("setMenu", res.data.menu);
        store.commit("setUserInfo", res.data.userInfo);
        store.commit("addMenu", router);
        router.push({ name: "home" });
      } else if (res.data.code === 600) ElMessage.error("密码错误，请重试");
      else if (res.data.code === 601) ElMessage.error("用户不存在，请注册账号");
      else return;
    })
    .catch((res) => {
      console.log(res);
    });
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  width: 100%;
  background-image: url(~@/assets/loginBackground.png);
  background-size: 100% 100%;
  position: fixed;
}
.login-container {
  width: 350px;
  margin: 200px auto;
  padding: 10px 10px 5px 10px;
  border: 1px solid #fff;
  color: rgb(136, 152, 189);
  box-shadow: 0 0 25px rgb(203, 203, 203);
  // background-color: rgba(180, 198, 240, 0.7);
  background-color: rgba(255, 255, 255, 0.7);
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
  display: inline-block;
  margin: 10px 0;
}
</style>
