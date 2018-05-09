new Vue({
        el: '#todolist',
        data: {
                message: '',
                list: []
        },
        methods: {
                vclick: function () {
                        if (this.message) {
                                this.list.push(this.message)
                                this.message = ''
                        }
                },
                dltclick: function (index) {
                        this.list.splice(index, 1)

                }
        }
})
Vue.component('itemlist', {
        props: ['item', 'index'],
        template: '<li class="list-group-item text-info"><button class="btn btn-danger" @click="dlt">Delete</button>{{item}}</li>',
        methods: {
                dlt: function () {
                        this.$emit('dltclick', this.index)
                },
        }
})