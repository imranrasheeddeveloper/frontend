import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'https://famger.com/',
})

Vue.prototype.$http = axiosIns

export default axiosIns
