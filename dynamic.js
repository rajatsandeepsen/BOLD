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



//formData used for loading data from html inputs or to create a new form
const formData = new FormData(SUBMITFORM);
formData.delete('terms');//to delete entite input field
let data = {};
for (const [key, value] of formData.entries()) {
    data[key] = value;
}
data["TimeStamp"] = Date.now();
console.log(data)




//delete a entity from object
const Employee = {
  firstname: 'John',
  lastname: 'Doe'
};
delete Employee.firstname; // delete the key and value together
console.log(Employee);// doe only print

if (Employee.firstname === undefined) //you can use undefined as keyword
  console.log('he');
// Expected output: undefined





// null & undefined
Employee.firstname = null // or we can give undefined as value
if (Employee.firstname == undefined) // return true
if (Employee.firstname === undefined) // return false
    
    

// object
data.TimeStamp = Date.now();
data["TimeStamp"] = Date.now();
// both are same

// object destructuring
let newData ={...data, TimeStamp: Date.now()}




// multi page value passing
// receiver end
console.log(window.location.href)
let url = window.location.href.split('/')
let id = url[url.length - 1].slice(1)
const docRef = document.getElementById('docRef')
docRef.innerHTML = `Your Document ID is <span class="fw-bolder">${id}</span>`
console.log(id)

// senter end
let URL = "./success/#" + docRef.id;// result will be ./success/index.html/#1234567
setTimeout(() => {
    window.location.replace(URL);
    //or window.location.href = URL;
}, 2500);
