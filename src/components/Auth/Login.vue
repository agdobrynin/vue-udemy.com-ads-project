<template lang="pug">
    v-container
                v-row(align="center" justify="center")
                    v-col(cols="12" sm="8" md="4")
                        v-card
                            v-toolbar(color="primary" dark flat)
                                v-toolbar-title Вход
                            v-spacer
                            v-card-text
                                v-form
                                    v-text-field(label="Логин" name="login" prepend-icon="mdi-account" type="text")
                                    v-text-field(id="password" label="Пароль" name="password" prepend-icon="mdi-lock" type="password")
                                    v-card-actions
                                        v-spacer
                                        v-btn(color="primary") Войти

</template>

<script>
    export default {
        name: "Login",
        data () {
            return {

            }
        }
    }
</script>
