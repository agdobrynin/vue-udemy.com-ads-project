<template lang="pug">
    v-col(cols='12')
        v-row
            v-col.pt-10(cols='12' sm='4')
                v-img(:src="adv.image" aspect-ratio="1.4")
            v-col(cols='12' sm='8')
                v-card-title {{ adv.title }}
                v-card-text {{ shortDesc }}
</template>

<script>
    const LAX_LENGTH_DESC = 200;
    export default {
        name: "ShortAdv",
        props: ["adv"],
        computed: {
            shortDesc: (self) => self.adv.desc.slice(0,LAX_LENGTH_DESC) + (self.adv.desc.length > LAX_LENGTH_DESC ? "..." : ""),
        },
    }
</script>

<style scoped>

</style>