import focus from "./focus";
import copy from "./copy";

//自定义指令对象集
const directives = {
  focus,
  copy
};

//将指令集以插件的形式挂载到vue上
export default {
  install(Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key]);
    });
  }
};
