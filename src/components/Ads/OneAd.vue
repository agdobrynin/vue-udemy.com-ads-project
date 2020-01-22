<template lang="pug">
    v-container
        v-card.mx-auto.d-flex.flex-column(min-height="500")
            v-img(:src="srcImage" height="200px")
            v-card-title {{ title }}
            v-card-subtitle {{ date }}, {{ author }}
            v-card-text {{ description }}
            v-card-actions
                v-spacer
                v-btn.v-btn--flat() Редактировать
                v-btn.success() Купить
</template>

<script>
    export default {
        name: "OneAd",
        data: () => ({
            id: 123,
            date: "10.01.02020",
            author: "Иван",
            srcImage: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
            title: "Lorem ipsum dolor sit amet.",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque deleniti distinctio dolores est excepturi expedita incidunt labore natus nesciunt nulla placeat possimus, quis reiciendis rerum voluptatibus!",
        }),
    }
</script>

<style scoped>

</style>