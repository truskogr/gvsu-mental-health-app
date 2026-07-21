import * as firebase from "firebase/app"
import "firebase/auth"
require('dotenv').config();

const firebaseConfig = {
    apiKey: 'AIzaSyB0kG4XlVGC5l2PGKSkbDDGm9gFkcMuaxo',
    authDomain: 'testcapstone-8156c.firebaseapp.com',
    databaseURL: 'https://testcapstone-8156c.firebaseio.com',
    projectId: 'testcapstone-8156c',
    storageBucket: 'testcapstone-8156c.appspot.com',
    messagingSenderId: '492405959886',
    appId: '3edbfdc565bdc53851f49f',
    measurementId: 'G-28ESPY34RD'
}

export default class Firebase {
    public auth: any;
    public provider: firebase.auth.GoogleAuthProvider;
    public constructor() {
        firebase.initializeApp(firebaseConfig);

        this.auth = firebase.auth();
        this.provider = new firebase.auth.GoogleAuthProvider();
        this.provider.setCustomParameters({
            "hd": "mail.gvsu.edu"
        });
    }

    public signIn = async (): Promise<firebase.auth.UserCredential> => {
        return this.auth.signInWithPopup(this.provider);
    }

    public getResult = async (): Promise<firebase.auth.UserCredential> => {
        return this.auth.getRedirectResult();
    }
}