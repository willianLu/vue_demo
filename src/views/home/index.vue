<template>
  <div class="home">
    <h1>我是首页</h1>
    <div>
      <el-input v-focus v-model="name" placeholder="请输入名称" />
    </div>
    <div>{{article}}</div>
    <div>
      <el-button type="success" v-copy="article">copy</el-button>
    </div>
    <div>
      <input type="file" @change="handleFileChange" />
      <el-button @click="handleUpload">上传</el-button>
    </div>
    <functional name="张三"></functional>
  </div>
</template>

<script>
import Functional from '@/components/functional';
import { uploadAsync } from "@/api";
const LENGTH = 10;
export default {
  name: "home",
  components: {
    Functional
  },
  data() {
    return {
      name: "",
      article:
        "七张机，鸳鸯织就又迟疑。只恐被人轻裁剪，分飞两处，一场离恨，何计再相随？",
      file: null,
      fileList: []
    };
  },
  created() {},
  methods: {
    handleFileChange(e) {
      const [file] = e.target.files;
      this.file = file;
    },
    async handleUpload() {
      if(!this.file) {
        return this.$message.warning("请选择文件");
      }
      const fileChunkList = this.createFileChunk(this.file);
      const fileList = fileChunkList.map(({file},index) => ({
        chunk: file,
        hash: this.file.name + "-" + index
      })); 
      await this.uploadChunks(fileList);
      await this.mergeRequest();
    },
    /**
     * 
     * 对文件进行切片
     * @param { Blob:file } file 切片文件
     * @param { Number } length 切片数量
     * @export { Array[Blob] } 文件切片数组 
     * 
     */
    createFileChunk(file, length = LENGTH) {
      const fileChunkList = [];
      const chunkSize = Math.ceil(file.size / length);
      let cur = 0;
      while(cur < file.size) {
        fileChunkList.push({file: file.slice(cur, cur + chunkSize)});
        cur += chunkSize;
      }
      return fileChunkList;
    },
    async uploadChunks(fileList) {
      const requestList = fileList.map(({chunk, hash}) => {
        const formData = new FormData();
        formData.append("chunk", chunk);
        formData.append("hash", hash);
        formData.append("fileName", this.file.name);
        return uploadAsync("http://localhost:8888", formData);
      });
      await Promise.all(requestList);
    },
    async mergeRequest() {
      await uploadAsync("http://localhost:8888/merge", { fileName: this.file.name });
    }
  }
};
</script>

<style>
</style>
