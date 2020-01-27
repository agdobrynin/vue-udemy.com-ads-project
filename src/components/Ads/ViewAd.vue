<template lang="pug">
    v-container
        v-card.mx-auto.d-flex.flex-column(v-if="!loading")
            v-img(:src="adv.image")
            v-card-title {{ adv.title }}
            v-card-subtitle {{ adv.date | dateLocale }}
            v-card-text.adv__desc {{ adv.desc }}
            v-card-actions
                v-spacer
                v-btn.v-btn--flat(v-if="isOwner" :to="{name: 'editAdv', params:{id: adv.id}}") Редактировать
                buy-ad(v-if="!isOwner" :adv="adv")
</template>

<script>
    import BuyAd from "@/components/Shared/BuyAd";

    export default {
        name: "OneAd",
        components: {
            BuyAd,
        },
        props: {
            id: {
                required: true,
            },
        },
        computed: {
            adv: self => self.$store.getters.advById(self.id),
            isOwner: self => self.$store.getters.user.id === self.adv.userId,
            loading: self => self.$store.getters.loading,
        },
    }
</script>

<style scoped>
    .adv__desc {
        white-space: pre-wrap;
    }
</style>