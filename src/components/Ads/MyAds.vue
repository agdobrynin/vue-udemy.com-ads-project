<template lang="pug">
    v-container
        h1 Список моих объявлений
        v-layout(grid-list-lg)
            v-layout(v-if="adsOwnerList.length" row wrap)
                v-flex( v-for="(adv, index) in adsOwnerList" :key="index" xs12 sm6 md4 pa-5)
                    v-card.mx-auto.d-flex.flex-column(max-width="400" min-height="500"
                        :to="{name: 'oneAdv', params:{id: adv.id}}")
                        v-img(:src="adv.image" height='200px')
                        v-card-title {{ adv.title }}
                        v-card-subtitle {{ adv.date | dateLocale }}
                        v-card-text {{ adv.desc.slice(0, 100) }}&hellip;
                        v-card-actions
                            v-spacer
                            v-btn(right color='purple' text='' :to="{name: 'oneAdv', params:{id: adv.id}}") Open
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

</style>