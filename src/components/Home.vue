<template lang="pug">
    div
        v-progress-linear(v-if="loading" indeterminate color="cyan" height="50") Загрузка объявлений&hellip;
        v-container(v-if="promoAds.length")
            v-carousel(cycle="" height="400" hide-delimiter-background="" show-arrows-on-hover="")
                v-carousel-item(v-for="(adv, index) in promoAds" :key="index" :src="adv.image" progress touch)
                    v-btn(
                        :to="{name: 'oneAdv', params:{id: adv.id}}"
                        class="buttonGoto" absolute bottom right)
                        | Просмотр
                    v-sheet(:color="adv.color || 'primary'" height="auto")
                        v-row.fill-height(align="center" justify="center")
                            .display-3.text-truncate.mx-5 {{ adv.title }}

        v-container(grid-list-lg)
            v-layout(row wrap v-if="adsList.length")
                v-flex(v-for="(adv, index) in adsList" :key="index" xs12 sm6 md4)
                    v-card.mx-auto.d-flex.flex-column(max-width="400" min-height="400")
                        v-img.white--text.align-end(height="200px" :src="adv.image")
                            v-card-title(class="card__title_bg")
                                span.white--text {{ adv.title }}
                        v-card-subtitle.pb-0 {{ adv.date }}
                        v-card-text.text--primary
                            div {{adv.desc.slice(0,75)}}&hellip;
                        v-card-actions(align-end)
                            v-btn(bottom color="info" :to="{name: 'oneAdv', params:{id: adv.id}}") Просмотр
                            v-btn(bottom color="success") Купить
            v-flex(v-else-if="!loading")
                v-alert(outlined='' type='warning' prominent='' border='left' )
                    | В базе не найдено объявлений


</template>

<script>
    export default {
        name: "Home",
        computed: {
            promoAds: self => self.$store.getters.adsPromo,
            adsList: self => self.$store.getters.adsAll,
            loading: self => self.$store.getters.loading,
        },
    }
</script>

<style scoped>
    .buttonGoto {
        bottom: 60px;
    }

    .card__title_bg {
        background: rgb(0, 0, 0); /* Fallback for older browsers without RGBA-support */
        background: rgba(0, 0, 0, 0.5);
    }
</style>
