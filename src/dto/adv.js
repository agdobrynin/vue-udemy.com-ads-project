export default class Adv {

    constructor(title, desc, promo, image, userId = null, id = null, date = null) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.promo = promo;
        this.image = image;
        this.userId = userId;
        this.date = date || new Date(date).toISOString();
    }

    dateLocateString(locate = "ru") {
        return new Date(this.date).toLocaleString(locate);
    }
}
