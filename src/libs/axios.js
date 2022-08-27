import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'http://localhost:4000',
})

Vue.prototype.$http = axiosIns

export default axiosIns
