<template lang="pug">
    v-container
        v-layout(row)
            v-flex(sm6 offset-3)
                v-list
                    v-toolbar-title.px-6 Заказы на покупку
                    v-list-item-group(v-model='settings' multiple='')
                        v-list-item(v-for="(order, index) in orders" :key="index")
                            template(v-slot:default='{ active, toggle }')
                                v-list-item-action
                                    v-checkbox(v-model='active' color='primary' @click='toggle')
                                v-list-item-content
                                    v-list-item-title {{ order.name }}
                                    v-list-item-subtitle {{ order.phone }}
                                v-list-item-action
                                    v-btn(:to="{name: 'oneAdv', params:{id: order.id}}")
                                        | Просмотр
</template>

<script>
    export default {
        name: "Orders",
        data: () => ({
            orders: [
                {
                    id: 123,
                    name: "Иван",
                    phone: "+7-927-236-56-89",
                }
            ],
        }),
    }
</script>

<style scoped>

</style>