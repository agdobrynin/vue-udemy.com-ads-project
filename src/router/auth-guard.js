import store from "@/store";
export default function (to, from, next) {
    if (store.getters.isUserLogin) {
        next();
    } else {
        const page = to.meta.title || to.fullPath;
        store.dispatch("actionError", `Для доступа к странице \n"${page}"\n небходимо пройти авторизацию`);
        next({name: "login"});
    }
}
