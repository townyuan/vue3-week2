import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';


const app = {
  data(){
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'townyuan',
      products: [],
      tempProduct: {}
    }
  },
  methods: {
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          this.getProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = 'login.html';
        })
    },
    getProducts(){
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios.get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    openProduct(item) {
      this.tempProduct = item;
    }
  },
  mounted(){
    //取出 token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)yuanToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin()
  }
}
createApp(app).mount('#app');
