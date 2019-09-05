<template>
  <el-menu
    background-color="transparent"
    text-color="#fff"
    style="border-right:none;"
  >
    <router-link
      v-for="(item) in menu"
      :key="item.path"
      :to="item.path"
      style="text-decoration:none;"
    >
      <el-menu-item>
        {{item.title}}
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
import { USER_MENU } from "@/const";

export default {
  name: "Menu",
  computed: {
    ...mapState({
      menu: USER_MENU
    })
  },
  mounted() {
    // console.log(this.menu);
  }
};
</script>

<style>
</style>
