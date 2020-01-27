<template lang="pug">
    v-dialog(v-model="dialog" persistent max-width="600px")
        template(v-slot:activator='{ on }')
            v-btn(color='green' dark='' v-on='on') Купить
        v-card
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
                v-btn(color='blue darken-1' text='' @click="doSave") Купить
</template>

<script>
    export default {
        name: "BuyAd",
        props: ["adv"],
        data: () => ({
            dialog: false,
            valid: false,
            name: "",
            phone: "",
            rulesRequire: [
                v => !!v || "Обязательное поле",
            ],
        }),
        computed: {
            shortDesc: (self) => self.adv.desc.slice(0,200) + (self.adv.desc.length > 200 ? "..." : ""),
        },
        methods: {
            doCancel() {
                this.name = "";
                this.phone = "";
                this.dialog = false;
            },
            doSave() {
                if (this.$refs.form.validate()) {
                    this.name = "";
                    this.phone = "";
                    this.dialog = false;
                }
            },
        },
    }
</script>

<style scoped>

</style>