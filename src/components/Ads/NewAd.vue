<template lang="pug">
    v-container
        v-row(align="center" justify="center")
            v-col(cols="12")
                v-card(class="elevation-12")
                    v-toolbar(color="primary" dark flat)
                        v-toolbar-title Новое объявление
                    v-spacer
                    v-card-text
                        v-form(v-model="valid" ref="form" validate @submit.prevent="")
                            v-text-field(
                                label="Заголовок" type="text" name="title" v-model="title"
                                prepend-icon="mdi-page-layout-header"
                                :rules="rulesRequire")
                            v-textarea(
                                label="Объявление" type="text" name="description" v-model="description"
                                prepend-icon="mdi-clipboard-text-outline"
                                multiline
                                :rules="rulesRequire")
                            v-label
                                v-switch(v-model="promo" label="Показывать в карусели" color="primary")
                            v-file-input(accept="image/*" label="Файл объявления")
                            v-card-actions
                                v-spacer
                                v-btn(color="primary" :disabled="!valid" @click="doSave")
                                    v-icon mdi-content-save-move
                                    | Сохранить

</template>

<script>
    export default {
        name: "NewAd",
        data: () => ({
            valid: false,
            title: "",
            description: "",
            promo: false,
            rulesRequire: [
                v => !!v || "Обязательное поле",
            ],
        }),
        methods: {
            doSave() {

            },
        },
    }
</script>

<style scoped>

</style>