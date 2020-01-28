<template lang="pug">
    v-dialog(v-model="dialog" persistent max-width="600px")
        template(v-slot:activator='{ on }')
            v-btn(color='green' dark='' v-on='on') Купить
        v-card(:loading="localLoading" :disabled="localLoading")
            v-card-title
                span.headline Оформить покупку
            v-card-text
                v-container
                    v-form(v-model="valid" ref="form" validate @submit.prevent="")
                        v-row
                            v-col(cols='12' sm='6')
                                v-text-field(
                                    label="Ваше имя"
                                    v-model="name"
                                    prepend-inner-icon="mdi-account"
                                    :rules="rulesRequire")
                            v-col(cols='12' sm='6')
                                v-text-field(
                                    label="Контактный телефон"
                                    v-model="phone"
                                    prepend-inner-icon="mdi-cellphone-basic"
                                    :rules="rulesRequire")
                            short-adv(:adv="adv")
            v-card-actions
                v-spacer
                v-btn(color='blue darken-1' text='' @click="doCancel") Отказаться
                v-btn(color='blue darken-1' text='' @click="doSave" :disabled="!valid") Купить
</template>

<script>
    import dtoOrder from "@/dto/dtoOrder";
    import ShortAdv from "@/components/Shared/ShortAdv";

    export default {
        name: "BuyAd",
        props: ["adv"],
        components: {
            ShortAdv
        },
        data: () => ({
            dialog: false,
            valid: false,
            name: "",
            phone: "",
            localLoading: false,
            rulesRequire: [
                v => !!v || "Обязательное поле",
            ],
        }),
        computed: {
            user: self => self.$store.getters.user,
        },
        methods: {
            doCancel() {
                this.name = "";
                this.phone = "";
                this.dialog = false;
            },
            doSave() {
                if (this.$refs.form.validate()) {
                    this.localLoading = true;
                    const order = new dtoOrder();
                    order.advId = this.adv.id;
                    order.ownerId = this.adv.userId;
                    order.name = this.name;
                    order.phone = this.phone;
                    this.$store.dispatch("createOrder", order)
                        .then( () => {
                            this.dialog = false;
                            this.name = "";
                            this.phone = "";
                        })
                        .finally( () => {
                            this.localLoading = false;
                        });
                }
            },
        },
    }
</script>

<style scoped>

</style>