import sidebar from './UI/sidebar.vue'
import btn from './commom/btn.vue'
import backtop from './commom/backTop.vue'
import adminSidebar from './UI/adminSidebar.vue'
import user from './commom/user.vue'
import views from './views/index.js'

const install = (Vue) => {
  Vue.component(sidebar.name, sidebar)
  Vue.component(btn.name, btn)
  Vue.component(backtop.name, backtop)
  Vue.component(adminSidebar.name, adminSidebar)
  Vue.component(user.name, user)

  Vue.use(views)
}

export default install
