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
            v-app-bar-nav-icon(@click="navigationDrawer = !navigationDrawer" class="hidden-sm-and-up")
            v-toolbar-title Доска объявлений
            v-spacer
            v-btn(text v-for="(item, index) in list" :key="index" :to="item.url" class="hidden-sm-and-down")
                v-icon(left) {{ item.icon }}
                | {{ item.title }}
        v-content
            router-view
        v-footer(app) &copy; 2020
</template>

<script>

    export default {
        name: "App",
        data() {
            return {
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
                        url: "/newad",
                    },
                    {
                        icon: "mdi-format-list-checkbox",
                        title: "Мои объявления",
                        url: "/listads",
                    }
                ],
            }
        },
    };
</script>
