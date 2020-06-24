<template>
  <div class="home">
    <h1>我是user</h1>
    <VirtualScroll
      :data="data"
      :height="500"
    >
      <div slot-scope="{data}">{{data}}</div>
    </VirtualScroll>
  </div>
</template>

<script>
import VirtualScroll from "@/components/virtual-scroll";
export default {
  name: "user",
  components: {
    VirtualScroll
  },
  data() {
    return {
      data: []
    };
  },
  created() {
    this.data = this.createData();
  },
  methods: {
    createData(num = 100000) {
      let arr = [];
      while (arr.length < num) {
        arr.push(arr.length + 1);
      }
      return arr;
    }
  }
};
</script>

<style>
</style>
