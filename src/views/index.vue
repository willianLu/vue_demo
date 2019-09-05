<template>
  <el-container style="min-height:100%;">
    <el-aside
      width="200px"
      style="background-color:#304156"
    >
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-header style="line-height: 60px;text-align: right;font-size: 12px;border-bottom: solid 1px #e6e6e6;">
        <el-dropdown>
          <i
            class="el-icon-setting"
            style="margin-right: 15px"
          ></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleLogout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { mapMutations } from "vuex";
import { LOGOUT } from "@/const";
import Menu from "@/components/layout/menu";
export default {
  name: "index",
  components: {
    Menu
  },
  methods: {
    ...mapMutations([LOGOUT]),
    handleLogout() {
      this[LOGOUT]();
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style>
</style>
