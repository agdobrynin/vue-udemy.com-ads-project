<template lang="pug">
    v-container
        v-row(align="center" justify="center")
            v-col(cols="12" sm="8" md="6")
                v-card(class="elevation-12")
                    v-toolbar(color="primary" dark flat)
                        v-toolbar-title Вход
                    v-spacer
                    v-card-text
                        v-form(v-model="valid" ref="form" validate)
                            v-text-field(
                                label="E-mail" type="email" name="email" v-model="email" prepend-icon="mdi-account"
                                :rules="rulesEmail")
                            v-text-field(
                                id="password" label="Пароль" name="password" v-model="password" prepend-icon="mdi-lock" type="password"
                                :counter="minPasswordLength"
                                :rules="rulesPassword")
                            v-card-actions
                                v-spacer
                                v-btn(color="primary" :disabled="!valid" @click="doLogin") Войти

</template>

<script>
    const MIN_PASSWORD_LENGTH = 6;
    export default {
        name: "Login",
        data () {
            return {
                minPasswordLength: MIN_PASSWORD_LENGTH,
                valid: false,

                email: "",
                password: "",
                rulesEmail: [
                    v => !!v || "E-mail обязательное поле",
                    v => /.+@.+\.(\w{2,})/.test(v) || 'Значение не является email адресом',
                ],
                rulesPassword: [
                    v => !!v || "Пароль обязательное поле",
                    v => v.length >= this.minPasswordLength || `Пароля не менее ${this.minPasswordLength} символов`,
                ],
            }
        },
        methods: {
            doLogin() {
                // eslint-disable-next-line no-console
                console.log(this.email, this.password);
            }
        },
    }
</script>
