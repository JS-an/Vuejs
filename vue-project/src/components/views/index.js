import popup from './popup.vue'

const install = (Vue) => {
  let Popup = Vue.extend(popup)

  Vue.prototype.$popup = (msg, callback) => {
    let data = {
      msg,
      callback
    }

    let vm = new Popup({
      data
    }).$mount()

    document.getElementById('app').appendChild(vm.$el)

    vm.show = true
  }
}

export default{
  install
}
