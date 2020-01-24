export default class Adv {

    constructor(title, desc, promo, image, userId = null) {
        this.id = null;
        this.title = title;
        this.desc = desc;
        this.promo = promo;
        this.image = image;
        this.userId = userId;
        this.date = new Date().toISOString();
    }

    date() {
        return new Date(this.date).toLocaleDateString();
    }
}
