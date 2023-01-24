import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyAOO0ue-iq4WCZLPzj6ETL2vveGkhg9jzc",
  authDomain: "notion-clone-278d2.firebaseapp.com",
  projectId: "notion-clone-278d2",
  storageBucket: "notion-clone-278d2.appspot.com",
  messagingSenderId: "124076968705",
  appId: "1:124076968705:web:7f0d8da3ceed9b89a4e900"
};

initializeApp(firebaseConfig);

// import { getFirestore, collection } from "firebase/firestore";
// const DB  = getFirestore();
 
// import { getStorage } from "firebase/storage";
// const storage = getStorage();

// firebase auth
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth();


const login = document.getElementById("loginPAGE");
const container = document.getElementById("container");

onAuthStateChanged(auth, user => {
    if (user) {
        console.log("user logged in")
        login.style.display = "none";
        container.style.display = "flex";

        import('firebase/auth').then(({ signOut }) => {
            const logOUT = document.getElementById("logOUT");
            logOUT.addEventListener('click', (e) => {
                e.preventDefault();

                signOut(auth).then(() => {
                    console.log('user signed out')
                })
                .catch(err => {
                    console.log(err.message)
                })
            })
        })
    }
    else {
        console.log("user not logged in")
        login.style.display = "flex";
        container.style.display = "none";
        const loginFORM = document.getElementById("loginFORM");

        // dynamic import 
        import('firebase/auth').then(({ signInWithEmailAndPassword }) => {
            loginFORM.addEventListener('submit', (e) => {
                e.preventDefault();
                let email = loginFORM.email.value;
                let password = loginFORM.password.value;

                signInWithEmailAndPassword(auth, email, password).then((cred) => {
                    console.log('user logined in:', cred.user);
                })
                .catch((err) => {
                    console.log(err);
                })
            })
        })
    }
});
