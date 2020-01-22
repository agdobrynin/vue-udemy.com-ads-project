<template lang="pug">
    div
        v-container
            v-carousel(cycle="" height="400" hide-delimiter-background="" show-arrows-on-hover="")
                v-carousel-item(v-for="(adv, index) in adsList" :key="index" :src="adv.imageSrc" progress touch)
                    v-btn(
                        :to="{name: 'oneAdv', params:{id: index}}"
                        class="buttonGoto" absolute bottom right)
                        | Просмотр
                    v-sheet(:color="adv.color || 'primary'" height="auto")
                        v-row.fill-height(align="center" justify="center")
                            .display-3 {{ adv.title }}

        v-container(grid-list-lg)
            v-layout(row wrap)
                v-flex(v-for="(ad, index) in adsList" :key="index" xs12 sm6 md4)
                    v-card.mx-auto(max-width="400")
                        v-img.white--text.align-end(height="200px" :src="ad.imageSrc")
                            v-card-title(class="card__title_bg")
                                span.white--text {{ ad.title }}
                        v-card-subtitle.pb-0 {{ ad.date }}
                        v-card-text.text--primary
                            div {{ ad.desc }}
                        v-divider
                        v-card-actions(align="right")
                            v-btn(color="info" :to="{name: 'oneAdv', params:{id: index}}") Просмотр
                            v-spacer
                            v-btn(color="success") Купить


</template>

<script>
    export default {
        name: "Home",
        data () {
            return {
                adsList: [
                    {
                        imageSrc : "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
                        title: "Lorem ipsum.",
                        date: "20.01.2020",
                        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, quos!",
                        color: "indigo",
                    },
                    {
                        imageSrc : "https://cdn.vuetifyjs.com/images/cards/house.jpg",
                        title: "Ipsum dolor.",
                        date: "18.01.2020",
                        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, quos!",
                    },
                    {
                        imageSrc : "https://cdn.vuetifyjs.com/images/cards/road.jpg",
                        title: "Lorem dolor amet.",
                        date: "15.01.2020",
                        desc: "Eos, quos! Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                        color: "deep-purple accent-4",
                    },

                ],
            }
        }
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
