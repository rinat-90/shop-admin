import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'




const debouncer = (callback, wait) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

const app = createApp(App)

app.directive('debounce', {
  mounted(el, binding) {
    if(binding.value !== binding.oldValue) {
      el.oninput = debouncer(function(){
        el.dispatchEvent(new Event('change'))
      }, parseInt(binding.value) || 500)
    }
  }
})

app.config.globalProperties.$filters = {
  date(value) {
    return new Date(value).toLocaleString()
  },
  currencyFilter (value, currency = 'USD') {
    return new Intl.NumberFormat('us', {
      style: 'currency',
      currency
    }).format(value);
  },
}


app.use(store).use(router).mount("#app");
