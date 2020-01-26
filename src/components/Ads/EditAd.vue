<template lang="pug">
    v-container(v-if="!loading")
        v-row(align="center" justify="center")
            v-col(cols="12")
                v-card(class="elevation-12")
                    v-toolbar(color="primary" dark flat)
                        v-toolbar-title Новое объявление
                    v-spacer
                    v-card-text
                        v-form(v-model="valid" ref="form" validate @submit.prevent="")
                            input(type="hidden" value="id")
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
                                v-model="imageBlob"
                                name="imageBlob"
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
                                    :disabled="!valid || loading || !imageSrc"
                                    :loading="loading"
                                    @click="doSave")
                                    v-icon mdi-content-save-move
                                    | Сохранить

</template>

<script>
    import dtoAd from "@/dto/dtoAdv";

    export default {
        name: "EditAd",
        data: () => ({
            valid: false,
            id: null,
            title: "",
            desc: "",
            promo: false,
            imageBlob: null,
            imageSrc: "",
            imageLocalLoading: false,
            rulesRequire: [
                v => !!v || "Обязательное поле",
            ],
        }),
        methods: {
            doSave() {
                if (this.$refs.form.validate()) {
                    const dtoAdv = new dtoAd();
                    dtoAdv.id = this.id;
                    dtoAdv.title = this.title;
                    dtoAdv.desc = this.desc;
                    dtoAdv.promo = this.promo;
                    dtoAdv.userId = this.$store.getters.user.id || null;
                    dtoAdv.image = this.imageSrc;
                    const advNew = {
                        dtoADV: dtoAdv,
                        imageBlob: this.imageBlob,
                    };
                    if (dtoAdv.id) {
                        this.$store.dispatch("updateAdv", advNew).then(() => {
                            this.$router.push({name: "listAds"});
                        }).catch(() => {
                        });
                    } else {
                        this.$store.dispatch("newAdv", advNew).then(() => {
                            this.$router.push({name: "listAds"});
                        }).catch(() => {
                        });
                    }
                }
            },
            fileUpload(file) {
                this.imageBlob = file;
                this.imageLocalLoading = true;
                if (this.imageBlob) {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(this.imageBlob);
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
        created() {
            const advId = this.$route.params.id || null;
            const adv = this.$store.getters.advById(advId);
            if (adv) {
                const {id, title, desc, promo, image} = adv;
                this.id = id || null;
                this.title = title || "";
                this.desc = desc || "";
                this.promo = promo || false;
                this.imageSrc = image || "";
            }
        }
    }
</script>

<style scoped>

</style>