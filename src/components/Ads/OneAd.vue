<template lang="pug">
    v-container
        v-card.mx-auto.d-flex.flex-column(min-height="500")
            v-img(:src="adv.imageSrc" height="200px")
            v-card-title {{ adv.title }}
            v-card-subtitle {{ adv.date }}, {{ adv.author }}
            v-card-text {{ adv.desc }}
            v-card-actions
                v-spacer
                v-btn.v-btn--flat() Редактировать
                v-btn.success() Купить
</template>

<script>
    export default {
        name: "OneAd",
        props: {
            id: {
                type: Number,
                required: true,
            },
        },
        computed: {
            adv: self => self.$store.getters.advById(self.id),
        },
    }
</script>

<style scoped>

</style>