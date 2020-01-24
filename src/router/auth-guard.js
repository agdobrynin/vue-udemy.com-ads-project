import store from "@/store";
export default function (to, from, next) {
    if (store.getters.isUserLogin) {
        next();
    } else {
        const pageUrl = to.fullPath;
        store.dispatch("actionError", `Для доступа к странице "${pageUrl}" небходимо пройти авторизацию`);
        next({name: "login"});
    }
}
