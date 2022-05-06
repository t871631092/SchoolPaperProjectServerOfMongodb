import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import axios from 'axios';
import 'element-plus/dist/index.css'
const app = createApp(App)
let Axios = axios.create({
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:8080'
    }
});


Axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    if (error && error.response && error.response.status == 401) {
        console.log('unlogin')
        window.location = '#/login'
    }
    // 对响应错误做点什么
    return Promise.reject(error);
});
app.config.globalProperties.$axios = Axios
const Base_URl = 'http://localhost:8088/';
app.config.globalProperties.get = (url, cb, options) => {
    console.log(Base_URl + url)
    Axios.get(Base_URl + url, options).then((res, err) => {
        cb(res.data, err);
    })
}
app.config.globalProperties.post = (url, data, cb, options) => {
    Axios.post(Base_URl + url, data, options).then((res, err) => {
        cb(res.data, err);
    })
}

app.use(ElementPlus).use(router).mount('#app')