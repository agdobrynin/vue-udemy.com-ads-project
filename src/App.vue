<template lang="pug">
    v-app
        v-navigation-drawer(app temporary)
        v-app-bar(app dense dark color="primary")
            v-app-bar-nav-icon
            v-toolbar-title Ad application
            v-spacer
            v-btn(text) Один
                v-icon mdi-domain
            v-btn(text) Два
                v-icon mdi-message-text
            v-btn(text) Три
                v-icon mdi-arrow-up-bold-box-outline
        v-content
            | router-view
        v-footer(app) &copy; 2020
</template>

<script>

    export default {
        name: 'App',
        data: () => ({
            //
        }),
    };
</script>
