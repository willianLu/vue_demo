import Mock from "mockjs";

Mock.mock(/\/login/, "post", req => {
  try {
    let { account, password, permission = [] } = JSON.parse(req.body);
    if (account === "lu" && password === "123456") {
      return success({
        id: 1,
        name: "一地芒草",
        premission: ["p_home", "p_test"].concat(permission)
      });
    } else {
      return error("用户名或密码错误");
    }
  } catch (e) {
    return error();
  }
});

function success(data) {
  return {
    errno: 0,
    msg: "请求成功",
    data
  };
}

function error(msg = "请求失败", data = {}, errno = 5000) {
  return {
    errno,
    msg,
    data
  };
}

export default Mock;
