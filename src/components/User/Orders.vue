<template lang="pug">
    v-container
        v-layout(row)
            v-flex(sm6 offset-3 v-if="orders.length")
                v-list(elevation="10")
                    v-list-item
                        v-toolbar-title Заказы на покупку
                    v-list-item(v-for="(order, index) in orders" :key="orders.advId")
                        v-list-item-content
                            v-alert(type="info")
                                v-list-item-title Имя: {{ order.name }}
                                v-list-item-title Телефон: {{ order.phone }}
                            v-alert(v-if="order.done" dense type="success") Покупка подтверждена
                            short-adv.pa-0.ma-0(:adv="advById(order.advId)")
                            v-row
                                v-col
                                    v-btn(
                                        v-if="!order.done"
                                        color="success"
                                        :disabled="order.done || localLoading"
                                        :loading="localLoading"
                                        @click="doDone(order)") Подтвердить покупку
                                v-col
                                    v-btn(color="primary" :to="{name: 'oneAdv', params:{id: order.advId}}") Просмотр
            v-flex(v-else)
                h1(align="center") Заказов еще нет.
</template>

<script>
    import ShortAdv from "@/components/Shared/ShortAdv";

    export default {
        name: "Orders",
        data: () => ({
            localLoading: false,
        }),
        components: {
            ShortAdv
        },
        methods: {
            doDone(order){
                this.localLoading = true;
                this.$store.dispatch("orderDone", order).finally( () => {
                    this.localLoading = false;
                });
                order.done = true;
            },
        },
        created() {
            this.$store.dispatch("fetchOrder")
        },
        computed: {
            orders: (self) => self.$store.getters.orders,
            advById: (self) => (advId) => self.$store.getters.advById(advId),
        },
    }
</script>

<style scoped>

</style>