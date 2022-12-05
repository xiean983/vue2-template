const request = axios.create({
  baseURL: 'https://www.fastmock.site/mock/b87ba72f9fed286cdf82cda0b7005aa7',
  timeout: 5000,
  headers: {}
});

// 请求拦截
request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      // 设置令牌请求头
      config.headers["Authorization"] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
request.interceptors.response.use(
  // 通过自定义code判定响应状态，也可以通过HTTP状态码判定
  response => {
    // 图片处理
    if (response.data.size) {
      return response.data
    }
    // 仅返回数据部分
    const res = response.data;
    return res;
  },
  error => {
    Message({
      message: error.msg || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error);
  }
);

export default request;
