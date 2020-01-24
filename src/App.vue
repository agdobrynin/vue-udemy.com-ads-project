<template lang="pug">
    v-app
        v-navigation-drawer(app temporary v-model="navigationDrawer")
            v-list(dense)
                div(v-if="user")
                    v-list-item
                        v-list-item-avatar
                            v-img(:src="user.photoURL")
                        v-list-item-content
                            v-list-item-title {{ user.email }}
                    v-divider
                v-list-item(v-for="(item, index) in menuLinks"
                    :key="index"
                    :to="item.url")
                    v-list-item-icon
                        v-icon {{ item.icon }}
                    v-list-item-content
                        v-list-item-title {{ item.title }}

        v-app-bar(app dense dark color="primary")
            v-app-bar-nav-icon.hidden-md-and-up(@click="navigationDrawer = !navigationDrawer")
            v-toolbar-title
                router-link(:to="{name: 'home'}" tag="span" class="pointer")
                    | Доска объявлений
            v-spacer
            v-toolbar-items.hidden-sm-and-down
                v-list-item(v-for="(item, index) in menuLinks" :key="index")
                    v-btn(text :to="item.url") {{ item.title }}
                        v-icon {{ item.icon }}
                    v-divider(inset vertical)
                v-list-item.spacer.hidden-sm-and-down(v-if="user.id" text="")
                    v-list-item-avatar
                        v-img(:src="user.photoURL")
                    v-list-item-content
                        v-list-item-title {{ user.email }}

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
            user: (self) => self.$store.getters.user,
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