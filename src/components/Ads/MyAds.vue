<template lang="pug">
    v-container
        h1 Список моих объявлений
        v-layout(grid-list-lg)
            v-layout(v-if="adsOwnerList.length" row wrap)
                v-flex( v-for="(adv, index) in adsOwnerList" :key="index" xs12 sm6 lg4 pa-5)
                    v-card.mx-auto.d-flex.flex-column(min-height="500"
                        :to="{name: 'oneAdv', params:{id: adv.id}}")
                        v-img(:src="adv.image" height='200px')
                            v-card-title.card__title_bg
                                span {{ adv.title }}
                        v-card-subtitle {{ adv.date | dateLocale }}
                        v-card-text {{ adv.desc.slice(0, 100) }}&hellip;
                        v-card-actions
                            v-icon(v-if="adv.promo" title="В промо странице" color="red" left) mdi-star
                            v-icon(v-else) mdi-star-outline
                            v-spacer
                            v-btn(color="" :to="{name: 'oneAdv', params:{id: adv.id}}") Просмотр
                            v-btn(color="primary" :to="{name: 'editAdv', params:{id: adv.id}}") Редактировать
            v-layout(v-else)
                v-flex
                    v-toolbar-title У вас пока нет объявлений
</template>

<script>
    export default {
        name: "ListAds",
        computed: {
            adsOwnerList: self => self.$store.getters.adsOwnerList(self.$store.getters.user.id),
        },
    }
</script>

<style scoped>
    .card__title_bg {
        background: rgb(0, 0, 0); /* Fallback for older browsers without RGBA-support */
        background: rgba(255, 255, 255, 0.72);
    }
</style>