<template>
    <div></div>
</template>

<script>
    export default {
        name: "Logout",
        beforeRouteEnter (to, from, next) {
            next( vm => {
                vm.$store.dispatch("actionUserLogout");
                vm.$router.push("/");
            });
        }
    }
</script>

<style scoped>

</style>