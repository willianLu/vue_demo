<template>
  <div class="login">
    <h3>登陆页面</h3>
    <div style="margin-top: 10px;">我的权限：默认首页</div>
    <el-checkbox-group
      style="margin: 10px 0;"
      v-model="permission"
    >
      <el-checkbox label="p_user">用户列表</el-checkbox>
      <el-checkbox label="p_about">关于我们</el-checkbox>
    </el-checkbox-group>
    <el-button
      type="primary"
      size="mini"
      @click="execLogin"
    >点击登录</el-button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "Vuex";
import { USER_CHANGE, USER_INFO } from "@/const";
import { loginAsync } from "@/api/login";
export default {
  name: "login",
  data() {
    return {
      permission: []
    };
  },
  computed: {
    ...mapGetters([USER_INFO])
  },
  mounted() {
    if (this[USER_INFO] && this[USER_INFO].id) {
      this.$router.push({ path: "/home" });
    }
  },
  methods: {
    ...mapMutations([USER_CHANGE]),
    async execLogin() {
      let res = await loginAsync("/login", {
        account: "lu",
        password: "123456",
        permission: this.permission
      });
      if (res.errno === 0) {
        this[USER_CHANGE](res.data);
        this.$router.push({ path: "/home" });
      }
    }
  }
};
</script>

<style>
.login {
  padding: 20px;
}
</style>
