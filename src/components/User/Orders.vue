<template lang="pug">
    v-container
        v-layout(row)
            v-flex(sm6 offset-3 v-if="orders.length")
                v-list(elevation="10")
                    v-toolbar-title.px-6 Заказы на покупку
                    v-list-item-group(multiple)
                        v-list-item(v-for="(order, index) in orders" :key="index")
                            template
                                v-list-item-action
                                    v-checkbox(:input-value="order.done" color="success" @click="doDone(order)")
                                v-list-item-content
                                    v-list-item-title Имя: {{ order.name }}
                                    v-list-item-subtitle Телефон: {{ order.phone }}
                            v-list-item-action
                                v-btn(:to="{name: 'oneAdv', params:{id: order.advId}}") Просмотр
            v-flex(v-else)
                h1(align="center") Заказов еще нет.
</template>

<script>
    export default {
        name: "Orders",
        methods: {
            doDone: (order) => {
                order.done = true;
            },
        },
        created() {
            this.$store.dispatch("fetchOrder")
        },
        computed: {
            orders: (self) => self.$store.getters.orders,
        },
    }
</script>

<style scoped>

</style>