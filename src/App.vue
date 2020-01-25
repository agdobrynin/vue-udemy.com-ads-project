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
            v-app-bar-nav-icon.d-lg-none(@click="navigationDrawer = !navigationDrawer")
            v-spacer
            v-toolbar-items.hidden-md-and-down
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
        data: (self) => ({
            navigationDrawer: false,
            menu: [
                {
                    icon: "mdi-home",
                    title: "Все объявления",
                    url: self.$router.resolve({name: "home"}).href,
                },
                {
                    icon: "mdi-lock",
                    title: "Вход",
                    url: self.$router.resolve({name: "login"}).href,
                    auth: false,
                },
                {
                    icon: "mdi-account-plus",
                    title: "Регистрация",
                    url: self.$router.resolve({name: "registration"}).href,
                    auth: false,
                },
                {
                    icon: "mdi-newspaper-plus",
                    title: "Новое объявление",
                    url: self.$router.resolve({name: "editAdv"}).href,
                    auth: true,
                },
                {
                    icon: "mdi-card-text-outline",
                    title: "Мои объявления",
                    url: self.$router.resolve({name: "listAds"}).href,
                    auth: true,
                },
                {
                    icon: "mdi-cash-multiple",
                    title: "Заказы на покупку",
                    url: self.$router.resolve({name: "orders"}).href,
                    auth: true,
                },
                {
                    icon: "mdi-logout",
                    title: "Выход",
                    url: self.$router.resolve({name: "logout"}).href,
                    auth: true,
                },
            ],
        }),
        computed: {
            error: (self) => self.$store.getters.error,
            menuLinks () {
                return this.menu.filter((menuItem) => {
                    if (!menuItem.hasOwnProperty("auth")) {
                        return true;
                    }
                    return menuItem.auth === this.$store.getters.isUserLogin;
                });
            },
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