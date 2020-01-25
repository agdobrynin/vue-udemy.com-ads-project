<template>
    <div></div>
</template>

<script>
    export default {
        name: "Logout",
        beforeRouteEnter (to, from, next) {
            next( vm => {
                vm.$store.dispatch("actionUserLogout");
                vm.$router.push({name: "home"});
            });
        }
    }
</script>

<style scoped>

</style>