export default class dtoUser {
    constructor(firebaseAuthUser = null) {
        const {uid, email, photoURL} = firebaseAuthUser || {uid: null, email: null, photoURL: null};
        this.id = uid;
        this.email = email;
        this.photoURL = photoURL ? photoURL : "/images/avatar-default.jpg";
    }
}
