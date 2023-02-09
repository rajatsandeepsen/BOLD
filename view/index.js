import { initializeApp } from './main.js';


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
import { getAuth, onAuthStateChanged } from './dynamicExport.js';
const auth = getAuth();
import { getFirestore } from "./main.js";
const DB = getFirestore();


const login = document.getElementById("loginPAGE");
const container = document.getElementById("container");
const textInput = document.getElementById("textInput");
let todoObj;
function deleteTodo(id) {
    todoObj.deleteTodo(id);
}
// let deleteTodo = () => {};

onAuthStateChanged(auth, user => {
    theAuthForm
    document.querySelector('#loginPAGE p').innerHTML = "";
    if (user) {
        login.style.display = "none";
        container.style.display = "flex";
        textInput.style.display = "block";

        import('./doc.js')
            .then((res) => {
                todoObj = new res.todo(DB, user.uid)
                // passing user id  
            })
            .catch(err => console.log(err.message))


        textInput.addEventListener('submit', e => {
            e.preventDefault();
            e.stopPropagation();
            let value = textInput.textfield.value;
            let type = document.querySelector('input[name="choice"]:checked').value;
            todoObj.addTodo(value, type);
            textInput.reset();
        })

        // dynamic import


        import('./dynamicExport.js').then(({ signOut }) => {
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
        login.style.display = "flex";
        container.style.display = "none";
        textInput.style.display = "none";
        const loginFORM = document.getElementById("loginFORM");
        const theAuthForm = document.getElementById("theAuthForm");
        const signFORM = document.getElementById("signFORM");

        // dynamic import 
        import('./dynamicExport.js').then(({ signInWithEmailAndPassword, createUserWithEmailAndPassword }) => {
            loginFORM.addEventListener('click', (e) => {
                e.preventDefault();
                let email = theAuthForm.email.value;
                let password = theAuthForm.password.value;

                signInWithEmailAndPassword(auth, email, password).then((cred) => {
                    console.log('user logined in:', cred.user);
                    theAuthForm.reset()
                })
                    .catch((err) => {
                        const authError = document.getElementById('authError')
                        authError.innerHTML = err
                        console.log(err);
                        theAuthForm.password.value = "";
                    })
            })
            signFORM.addEventListener('click', (e) => {
                e.preventDefault();
                let email = theAuthForm.email.value;
                let password = theAuthForm.password.value;

                createUserWithEmailAndPassword(auth, email, password).then((cred) => {
                    console.log('user logined in:', cred.user);
                    theAuthForm.reset()
                })
                    .catch((err) => {
                        const authError = document.getElementById('authError')
                        authError.innerHTML = err
                        console.log(err);
                        theAuthForm.password.value = "";
                    })
            })
        })
    }
});
