import { Message } from "element-ui";

export default {
  bind(el, { value }) {
    el.$value = value;
    el.handler = () => {
      if (!el.$value) {
        Message({
          type: "warning",
          message: "无复制内容"
        });
        return;
      }
      const textarea = document.createElement("textarea");
      textarea.readOnly = true;
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      textarea.value = el.$value;
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      if (document.execCommand("Copy")) {
        Message({
          type: "success",
          message: "复制成功"
        });
      } else {
        Message({
          type: "error",
          message: "复制失败"
        });
      }
      document.body.removeChild(textarea);
    };
    el.addEventListener("click", el.handler);
  },
  componentUpdated(el, { value }) {
    el.$value = value;
  },
  unbind(el) {
    el.removeEventListener("click", el.handler);
  }
};
