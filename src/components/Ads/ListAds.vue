<template lang="pug">
    v-container
        h1 Список моих объявлений
        v-layout(grid-list-lg)
            v-layout(row wrap)
                v-flex(v-for="(adv, index) in adsList" :key="index" xs12 sm6 md4 pa-5)
                    v-card.mx-auto(max-width="400")
                        v-img(:src="adv.imageSrc" height='200px')
                        v-card-title {{ adv.title }}
                        v-card-subtitle {{ adv.date }}
                        v-card-text {{ adv.desc.slice(0, 100) }}&hellip;
                        v-card-actions
                            v-spacer
                            v-btn(right color='purple' text='' :to="{name: 'oneAdv', params:{id: adv.id}}") Open
</template>

<script>
    export default {
        name: "ListAds",
        data: () => ({
            show: false,
            adsList: [
                {
                    id: 123,
                    imageSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
                    title: "Lorem ipsum.",
                    date: "20.01.2020",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, quos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, quos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, quos!",
                    color: "indigo",
                },
                {
                    id: 321,
                    imageSrc: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
                    title: "Ipsum dolor consectetur.",
                    date: "18.01.2020",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet corporis deleniti inventore ipsam iure molestias, odit, quasi quod, ratione rerum sint.",
                },
                {
                    id: 456,
                    imageSrc: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
                    title: "Lorem dolor amet.",
                    date: "15.01.2020",
                    desc: "Eos, quos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet corporis deleniti inventore ipsam iure molestias, odit, quasi quod, ratione rerum sint.",
                    color: "deep-purple accent-4",
                },

            ],
        }),
    }
</script>
<style scoped>

</style>