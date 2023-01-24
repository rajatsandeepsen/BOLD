// dynamic import 
import('firebase/auth')
    .then(({signInWithEmailAndPassword}) => {

    })

import ('./app.js')
    .catch(err => {
        console.log(err)
    })
    .then(({app}) => {
        //then run the app method fromo app.js
        app()
    })

//another one
async function anyMethod (){
    const { signInWithEmailAndPassword } = await import('firebase/auth')    
}

//another one

