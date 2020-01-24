export default class dtoAdv {

    constructor(title, desc, promo, image, userId = null, id = null, date = null) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.promo = promo;
        this.image = image;
        this.userId = userId;
        this.date = date || new Date().toISOString();
    }
}
