// dynamic import modules
import('firebase/auth')
    .then(({signInWithEmailAndPassword}) => {

    })

//dynamic import files methods
import ('./app.js')
    .catch(err => {
        console.log(err)
    })
    .then(({app}) => {
        //then run the app method fromo app.js
        app()
    })

//dynamic import methods from modules
async function anyMethod (){
    const { signInWithEmailAndPassword } = await import('firebase/auth')    
}

// dynamic import class from file
import('./doc.js')
        .then((res) => { 
                todoObj = new res.todo(DB)
                
            })
        .catch(err => console.log(err.message))




//using IIAFE because constructor cannot be async
(async () => {
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {

        //here destructuring is used to add id to the object
        this.todoArray.push({...doc.data(),id: doc.id})
    })
    
    this.displayTodo()
})();


//clone a function 
function log(hi) {
  console.log(hi);
}
const boundLog = log.bind();
boundLog(10);
