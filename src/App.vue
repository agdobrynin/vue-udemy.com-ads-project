<template lang="pug">
    v-app
        v-navigation-drawer(app temporary v-model="navigationDrawer")
            v-list(dense)
                v-list-item(v-for="(item, index) in list" :key="index" :to="item.url")
                    v-list-item-icon
                        v-icon {{ item.icon }}
                    v-list-item-content
                        v-list-item-title {{ item.title }}
        v-app-bar(app dense dark color="primary")
            v-app-bar-nav-icon(@click="navigationDrawer = !navigationDrawer" class="hidden-md-and-up")
            v-toolbar-title
                router-link(:to="{name: 'home'}" tag="span" class="pointer")
                    | Доска объявлений
            v-spacer
            v-btn(text v-for="(item, index) in list" :key="index" :to="item.url" class="hidden-sm-and-down")
                v-icon(left) {{ item.icon }}
                | {{ item.title }}
        v-content
            router-view
        v-footer(app) &copy; 2020

        v-snackbar(
            v-if="error"
            :timeout="8000"
            :value="true"
            @click="closeError"
            multi-line=true) {{ error }}
            v-btn(color="red" text="" @click.native="closeError") Закрыть
</template>

<script>

    export default {
        name: "App",
        data: () => ({
            navigationDrawer: false,
            list: [
                {
                    icon: "mdi-lock",
                    title: "Вход",
                    url: "/login",
                },
                {
                    icon: "mdi-account-plus",
                    title: "Регистрация",
                    url: "/registration",
                },
                {
                    icon: "mdi-newspaper-plus",
                    title: "Новое объявление",
                    url: "/newadv",
                },
                {
                    icon: "mdi-format-list-checkbox",
                    title: "Мои объявления",
                    url: "/listads",
                },
                {
                    icon: "mdi-cash-multiple",
                    title: "Заказы на покупку",
                    url: "/orders",
                }
            ],
        }),
        computed: {
            error: (self) => self.$store.getters.error,
        },
        methods: {
            closeError() {
                this.$store.dispatch("actionClearError");
            },
        },
    };
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>