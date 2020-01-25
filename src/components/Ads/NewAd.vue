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
                                label="Объявление" type="text" name="desc" v-model="desc"
                                prepend-icon="mdi-clipboard-text-outline"
                                multiline
                                :rules="rulesRequire")
                            v-label
                                v-switch(v-model="promo" label="Показывать в карусели" color="primary")
                            v-file-input(
                                v-model="image"
                                name="advImage"
                                accept="image/*"
                                label="Файл изображения"
                                show-size
                                chips
                                prepend-icon="mdi-camera"
                                :loading="imageLocalLoading"
                                :disabled="imageLocalLoading"
                                @change="fileUpload")
                            v-img(v-if="imageSrc" aspect-ratio="2" :src="imageSrc")
                            v-card-actions
                                v-spacer
                                v-btn(
                                    color="primary"
                                    :disabled="!valid || loading || !image"
                                    :loading="loading"
                                    @click="doSave")
                                    v-icon mdi-content-save-move
                                    | Сохранить

</template>

<script>
    import dtoAd from "@/dto/dtoAdv";

    export default {
        name: "NewAd",
        data: () => ({
            valid: false,
            title: "",
            desc: "",
            promo: false,
            image: null,
            imageSrc: "",
            imageLocalLoading: false,
            rulesRequire: [
                v => !!v || "Обязательное поле",
            ],
        }),
        methods: {
            doSave() {
                if (this.$refs.form.validate() && this.image) {
                    const dtoAdv = new dtoAd();
                    dtoAdv.title = this.title;
                    dtoAdv.desc = this.desc;
                    dtoAdv.promo = this.promo;
                    dtoAdv.image = this.image;
                    dtoAdv.userId = this.$store.getters.user.id || null;
                    this.$store.dispatch("newAdv", dtoAdv).then( ()=> {
                        this.$router.push({name: "listAds"});
                    }).catch( () => {});
                }
            },
            fileUpload(file) {
                // eslint-disable-next-line no-console
                // console.log(this.image);
                this.image = file;
                this.imageLocalLoading = true;
                if (this.image) {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(this.image);
                    fileReader.addEventListener('load', () => {
                        this.imageSrc = fileReader.result;
                        this.imageLocalLoading = false;
                    });
                } else {
                    this.imageSrc = null;
                    this.imageLocalLoading = false;
                }
            },
        },
        computed: {
            loading: (self) => self.$store.getters.loading,
        },
    }
</script>

<style scoped>

</style>