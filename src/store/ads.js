export default {
    state: {
        ads: [
            {
                imageSrc: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
                title: "Lorem ipsum.",
                date: "20.01.2020",
                desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, quos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, quos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, quos!",
                color: "indigo",
                id: 123,
                promo: true,
                userId: 1,
            },
            {
                imageSrc: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
                title: "Ipsum dolor consectetur.",
                date: "18.01.2020",
                desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet corporis deleniti inventore ipsam iure molestias, odit, quasi quod, ratione rerum sint.",
                id: 789,
                promo: false,
                userId: 2,
            },
            {
                imageSrc: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
                title: "Lorem dolor amet.",
                date: "15.01.2020",
                desc: "Eos, quos! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet corporis deleniti inventore ipsam iure molestias, odit, quasi quod, ratione rerum sint.",
                color: "deep-purple accent-4",
                id: 9654,
                promo: true,
                userId: 1,
            },
        ]
    },
    mutations: {
        setNewAdv(state, payload) {
            state.ads.push(payload);
        },
    },
    actions: {
        actionNewAdv({ commit }, payload) {
            payload.id = Math.random();
            commit("setNewAdv", payload);
        },
    },
    getters: {
        adsAll: (state) => state.ads,
        adsPromo: (state) => state.ads.filter( adv => adv.promo ),
        adsOwner: (state) => userId => state.ads.filter( adv =>  adv.userId === userId),
        advById: (state) =>  adId => state.ads.find( adv => adv.id === adId),
    },
}
