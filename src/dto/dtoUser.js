export default class dtoUser {
    constructor(firebaseAuthUser = null) {
        const {uid, email} = firebaseAuthUser || {uid: null, email: null};
        this.id = uid;
        this.email = email;
    }
}
