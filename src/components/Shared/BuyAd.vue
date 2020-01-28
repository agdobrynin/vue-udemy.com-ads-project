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
                                    label='Ваше имя'
                                    v-model="name"
                                    :rules="rulesRequire")
                            v-col(cols='12' sm='6')
                                v-text-field(
                                    label='Контактный телефон'
                                    v-model="phone"
                                    :rules="rulesRequire")
                            v-col(cols='12')
                                v-row
                                    v-col.pt-10(cols='12' sm='4')
                                        v-img(:src="adv.image" aspect-ratio="1.4")
                                    v-col(cols='12' sm='8')
                                        v-card-title {{ adv.title }}
                                        v-card-text {{ shortDesc }}
            v-card-actions
                v-spacer
                v-btn(color='blue darken-1' text='' @click="doCancel") Отказаться
                v-btn(color='blue darken-1' text='' @click="doSave" :disabled="!valid") Купить
</template>

<script>
    const LAX_LENGTH_DESC = 200;
    import dtoOrder from "@/dto/dtoOrder";

    export default {
        name: "BuyAd",
        props: ["adv"],
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
            shortDesc: (self) => self.adv.desc.slice(0,LAX_LENGTH_DESC) + (self.adv.desc.length > LAX_LENGTH_DESC ? "..." : ""),
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