import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-lite.js";

export const todo = class {
    todoArray = [];
    TODO;
    constructor(DB) {
        
        this.TODO = collection(DB, "NotionFeed");
        const qry = query(TODO, orderBy('timeStamp', "desc"));
        this.todoArray = [];

        //using IIAFE because constructor cannot be async
        (async () => {
            const querySnapshot = await getDocs(qry);
            querySnapshot.forEach((doc) => {
                this.todoArray.push(doc.data())
            
            })
            this.displayTodo()
        })();
        

        const INPUT = document.getElementById("INPUT");
        console.log('input doc')
        INPUT.addEventListener('submit', (e) => {
            e.preventDefault();
            let value = INPUT.value.value;
            let type = INPUT.choise.value || "link";
            this.addTodo(value,type);
            INPUT.reset();
            console.log('input successfull')
        })
    }



    addTodo(value,type) {
        let X
        if (type == "todo")
            X = {type: type, text: value, timeStamp: Date.now(), done: false}

        else if (type == "note"){
            let textArray = value.split("\n");
            let paragraph = textArray.join("<br>");
            X = {type: type, text: paragraph, timeStamp: Date.now()}
        }

        else X = {type: type, text: value, timeStamp: Date.now()}

        addDoc(this.TODO, X)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        }).catch((error) => {
            console.error("Error adding document: ", error);
        })
    }


    displayTodo() {
        let container = document.getElementById("container");
        this.todoArray.forEach((data) => {
            container.innerHTML += this.TempleteTodo(data);
        })
    }
    TempleteTodo(data){
        console.log(data)
        if (data.type === "todo"){
            let btnstyle = data.done ? "bi-check-square-fill" : "bi-square";
            let text = data.done ? "text-decoration-line-through text-black-50" : "";
            return `<div id="${data.ID}" class="shadow-lg bg-white p-3 d-flex gap-2 align-items-center">
                <button class="btn" onclick="todo.deleteTodo(${data.id})"><i class="bi ${btnstyle} onpageI"></i></button>
                <h6 class=${text}>${data.text}</h6>
            </div>`;
        }
        else if (data.type === "link"){
            return `<div class="shadow-lg bg-white p-3">
                <div class="d-flex align-items-center justify-content-between">
                    <code>${data.text}</code>
                    <button class="btn" onclick="navigator.clipboard.writeText(${data.text})"><i class="bi bi-clipboard onpageI"></i></button>
                </div>
            </div>`;
        }
        else if (data.type === "note"){
            let textArray = data.text.split("<br>");

            let header = textArray.shift();
            let paragraph = textArray.join("");
            return `<div class="shadow-lg bg-white p-3">
                <div class="d-flex align-items-center justify-content-between">
                    <h6>${header}</h6>
                    <button class="btn" onclick="navigator.clipboard.writeText(${data.text})"><i class="bi bi-clipboard onpageI"></i></button>
                </div>
                <code>${paragraph}</code>
            </div>`;
        }
        else return `<div class="shadow-lg bg-white p-3"><h6>Something went wrong</h6></div>`
    }
    static deleteTodo(ID) {
        let docRef = doc(DB, TODO, ID)
        updateDoc(docRef, {
          done: true
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        })
    }
    static copytext(text) {
         navigator.clipboard.writeText(text);
    }
    
}

