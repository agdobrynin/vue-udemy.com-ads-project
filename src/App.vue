<template lang="pug">
    v-app
        v-navigation-drawer(app temporary v-model="navigationDrawer")
            v-list(dense)
                v-list-item(v-for="(item, index) in menuLinks"
                    :key="index"
                    :to="item.url")
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
            v-btn(text v-for="(item, index) in menuLinks"
                :key="index"
                :to="item.url"
                class="hidden-sm-and-down")
                v-icon(left) {{ item.icon }}
                | {{ item.title }}
        v-content
            router-view
        v-footer(app) &copy; 2020

        v-snackbar(
            v-if="error"
            color="cyan darken-2"
            :timeout="8000"
            :value="true"
            @click="closeError"
            multi-line=true) {{ error }}
            v-btn(color="error" @click.native="closeError") Закрыть
</template>

<script>

    export default {
        name: "App",
        data: () => ({
            navigationDrawer: false,
            menu: [
                {
                    icon: "mdi-lock",
                    title: "Вход",
                    url: "/login",
                    auth: false,
                },
                {
                    icon: "mdi-account-plus",
                    title: "Регистрация",
                    url: "/registration",
                    auth: false,
                },
                {
                    icon: "mdi-newspaper-plus",
                    title: "Новое объявление",
                    url: "/newadv",
                    auth: true,
                },
                {
                    icon: "mdi-card-text-outline",
                    title: "Мои объявления",
                    url: "/listads",
                    auth: true,
                },
                {
                    icon: "mdi-cash-multiple",
                    title: "Заказы на покупку",
                    url: "/orders",
                    auth: true,
                },
                {
                    icon: "mdi-logout",
                    title: "Выход",
                    url: "/logout",
                    auth: true,
                },
            ],
        }),
        computed: {
            error: (self) => self.$store.getters.error,
            menuLinks: (self) => self.menu.filter( menuItem => menuItem.auth === self.$store.getters.isUserLogin),
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