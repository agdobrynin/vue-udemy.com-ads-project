<template lang="pug">
    v-container
        v-row(align="center" justify="center")
            v-col(cols="12" sm="8" md="6")
                v-card(class="elevation-12")
                    v-toolbar(color="primary" dark flat)
                        v-toolbar-title Регистрация
                    v-spacer
                    v-card-text
                        v-form(v-model="valid" ref="form" validate loading="true")
                            v-text-field(
                                label="E-mail" type="email" name="email" v-model="email" prepend-icon="mdi-account"
                                :rules="rulesEmail")
                            v-text-field(
                                id="password" label="Пароль" name="password" v-model="password" prepend-icon="mdi-lock" type="password"
                                :counter="minPasswordLength"
                                :rules="rulesPassword")
                            v-text-field(
                                id="password-confirm" label="Подтверждение пароля" name="password-confirm" v-model="passwordConfirm" prepend-icon="mdi-lock" type="password"
                                :rules="rulesPasswordConfirm")
                            v-card-actions
                                v-spacer
                                v-btn(
                                    color="primary"
                                    :disabled="!valid || loading"
                                    :loading="loading"
                                    @click="doRegistration") Зарегистрироваться

</template>

<script>
    const MIN_PASSWORD_LENGTH = 6;
    export default {
        name: "Login",
        data: (self) => ({
                minPasswordLength: MIN_PASSWORD_LENGTH,
                valid: false,

                email: "",
                password: "",
                passwordConfirm: "",
                rulesEmail: [
                    v => !!v || "E-mail обязательное поле",
                    v => /.+@.+\.(\w{2,})/.test(v) || 'Значение не является email адресом',
                ],
                rulesPassword: [
                    v => !!v || "Пароль обязательное поле",
                    v => v.length >= self.minPasswordLength || `Пароля не менее ${self.minPasswordLength} символов`,
                ],
                rulesPasswordConfirm: [
                    v => !!v || "Подтвердите пароль",
                    v => v === self.password || `Пароли не совпадаю`,
                ],
        }),
        computed: {
            loading: (self) => self.$store.getters.loading,
            error: (self) => self.$store.getters.error,
        },
        methods: {
            doRegistration() {
                if (this.$refs.form.validate()) {
                    const user = {
                        email: this.email,
                        password: this.password,
                    };
                    this.$store.dispatch("actionRegisterUser", user)
                        .then( () => {
                            this.$router.push("/");
                        }).catch( () => {});
                }
            }
        },
    }
</script>
