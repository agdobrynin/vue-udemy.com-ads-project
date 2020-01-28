export default class dtoOrder {

    constructor (name, phone, advId, ownerId, done = false, id = null, date = null) {
        this.name = name;
        this.phone = phone;
        this.advId = advId;
        this.ownerId = ownerId;
        this.done = done;
        this.id = id;
        this.date = date || new Date().toISOString();
    }
}
