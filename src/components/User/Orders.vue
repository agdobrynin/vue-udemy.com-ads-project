<template lang="pug">
    v-container
        v-layout(row)
            v-flex(sm6 offset-3)
                v-list(elevation="10")
                    v-toolbar-title.px-6 Заказы на покупку
                    v-list-item-group(multiple)
                        v-list-item(v-for="(order, index) in orders" :key="index")
                            template
                                v-list-item-action
                                    v-checkbox(:input-value="order.done" color="success" @click="doDone(order)")
                                v-list-item-content
                                    v-list-item-title {{ order.name }}
                                    v-list-item-subtitle {{ order.phone }}
                            v-list-item-action
                                v-btn(:to="{name: 'oneAdv', params:{id: order.adId}}") Просмотр
</template>

<script>
    export default {
        name: "Orders",
        data: () => ({
            orders: [
                {
                    id: 123,
                    adId: 321,
                    name: "Иван",
                    phone: "+7-927-236-56-89",
                    done: false,
                },
                {
                    id: 124,
                    adId: 31982,
                    name: "Пётр",
                    phone: "+7-919-547-11-05",
                    done: false,
                },
            ],
        }),
        methods: {
            doDone: (order) => {
                order.done = true;
            },
        },
    }
</script>

<style scoped>

</style>