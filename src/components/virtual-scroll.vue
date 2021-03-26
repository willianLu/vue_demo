<template>
  <div
    :style="containerStyle"
    @scroll="handleScroll"
    ref="vs"
  >
   <button style="position:absoult;top:0;right:0;" @click="$emit('update:height', height + 1)">测试{{height}}</button>
    <div :style="`height:${offsetTop}px`"></div>
    <div
      v-for="item in list"
      :key="item"
      style="height:50px;line-height:50px;"
    >
      <slot :data="item"></slot>
    </div>
    <div :style="`height:${offsetBottom}px`"></div>
  </div>
</template>

<script>
export default {
  name: "Virtual-scroll",
  data() {
    return {
      offsetTop: 0,
      offsetBottom: 0,
      list: [],
      totalHeight: 0
    };
  },
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    mode: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 0
    }
  },
  computed: {
    containerStyle() {
      if (this.height > 0) {
        return { height: this.height + "px", "overflow-y": "scroll" };
      }
      return { height: "auto" };
    }
  },
  beforeCreate() {
    console.log('child--------------beforeCreate')
  },
  created() {
    this.init();
    console.log('child--------------created')
  },
  beforeMount() {
    console.log('child--------------beforeMount')
  },
  mounted() {
    console.log('child--------------mounted')
  },
  beforeUpdate() {
    console.log('child--------------beforeUpdate')
  },
  updated() {
    console.log('child--------------updated')
  },
  beforeDestroy() {
    console.log('child--------------beforeDestroy')
  },
  destroyed() {
    console.log('child--------------destroyed')
  },
  methods: {
    handleScroll() {
      const sTop = this.$refs.vs.scrollTop;
      let start = Math.floor(sTop / 50);
      let count = 10 + Math.ceil(sTop / 50) - start;
      this.offsetTop = start * 50;
      this.offsetBottom = this.totalHeight - this.offsetTop - count * 50;
      this.renderList(start, start + count);
    },
    init() {
      let len = this.data.length;
      this.totalHeight = len * 50;
      this.renderList();
      this.offsetBottom = this.totalHeight - 500;
    },
    renderList(start = 0, end = 10) {
      this.list = this.data.slice(start, end);
    }
  }
};
</script>
<style scoped>
</style>