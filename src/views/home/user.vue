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
  beforeCreate() {
    console.log('parent--------------beforeCreate')
  },
  created() {
    this.data = this.createData();
    console.log('parent--------------created')
  },
  beforeMount() {
    console.log('parent--------------beforeMount')
  },
  mounted() {
    console.log('parent--------------mounted')
  },
  beforeUpdate() {
    console.log('parent--------------beforeUpdate')
  },
  updated() {
    console.log('parent--------------updated')
  },
  beforeDestroy() {
    console.log('parent--------------beforeDestroy')
  },
  destroyed() {
    console.log('parent--------------destroyed')
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
