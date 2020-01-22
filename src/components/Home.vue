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
                            .display-3.text-truncate.mx-5 {{ adv.title }}

        v-container(grid-list-lg)
            v-layout(row wrap)
                v-flex(v-for="(adv, index) in adsList" :key="index" xs12 sm6 md4)
                    v-card.mx-auto.d-flex.flex-column(max-width="400" min-height="400")
                        v-img.white--text.align-end(height="200px" :src="adv.imageSrc")
                            v-card-title(class="card__title_bg")
                                span.white--text {{ adv.title }}
                        v-card-subtitle.pb-0 {{ adv.date }}
                        v-card-text.text--primary
                            div {{adv.desc.slice(0,75)}}&hellip;
                        v-card-actions(align-end)
                            v-btn(bottom color="info" :to="{name: 'oneAdv', params:{id: adv.id}}") Просмотр
                            v-btn(bottom color="success") Купить


</template>

<script>
    export default {
        name: "Home",
        data: () => ({
            adsList: [
                {
                    imageSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
                    title: "Lorem ipsum.",
                    date: "20.01.2020",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, quos!",
                    color: "indigo",
                    id: 123,
                },
                {
                    imageSrc: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
                    title: "Ipsum dolor consectetur.",
                    date: "18.01.2020",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, quos!",
                    id: 789,
                },
                {
                    imageSrc: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
                    title: "Lorem dolor amet.",
                    date: "15.01.2020",
                    desc: "Eos, quos! Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                    color: "deep-purple accent-4",
                    id: 9654,
                },

            ],
        }),
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
