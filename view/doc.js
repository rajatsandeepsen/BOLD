import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-lite.js";
let DBclone, TODOclone
export const todo = class {
    todoArray = [];
    TODO;
    DB;
    qry;
    userCollection;
    constructor(DB, UID) {
        this.DB = DBclone = DB;
        this.userCollection = UID;
        this.TODO = TODOclone = collection(DB, UID);
        this.qry = query(this.TODO, orderBy('timeStamp', "desc"));
        this.refresh()
    }
    refresh() {
        this.todoArray = [];

        //using IIAFE because constructor cannot be async
        (async () => {
            const querySnapshot = await getDocs(this.qry);
            querySnapshot.forEach((doc) => {
                //here destructuring is used to add id to the object
                this.todoArray.push({...doc.data(),id: doc.id})
            })
            this.displayTodo()
            const deleteBtn = document.querySelectorAll('.delete');
            deleteBtn.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    let id = e.target.parentElement.parentElement.id;
                    this.deleteTodo(id.toString());
                })
            })
        })();

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
            this.refresh()
        }).catch((error) => {
            console.error("Error adding document: ", error);
        })
    }




    displayTodo() {
        let container = document.getElementById("container");
        container.innerHTML = "";
        this.todoArray.forEach((data) => {
            container.innerHTML += this.TempleteTodo(data);
        })
    }



    TempleteTodo(data){
        if (data.type === "todo" && ((Date.now() - data.timeStamp < 86400000) || !data.done )){


            let icon = data.done ? "bi-check-square-fill" : "bi-square";
            let btnstyle = data.done ? "btn" : "btn delete";
            let text = data.done ? "text-decoration-line-through" + " " + "text-black-50" : "";
            return `<div id=${data.id} class="shadow-lg bg-white p-2 d-flex gap-2 align-items-center">
                <button class="${btnstyle}"><i class="bi ${icon} onpageI"></i></button>
                <h6 class="${text}">${data.text}</h6>
            </div>`;
        }
        else if (data.type === "link"  && (Date.now() - data.timeStamp < 6 * 3600000)){
            function urlify(text) {
                var urlRegex = /(https?:\/\/[^\s]+)/g;
                return text.replace(urlRegex, function(url) {
                    return '<a href="' + url + '"class="d-flex gap-1 align-items-center"><i class="bi bi-link-45deg"></i> ' + url + '</a>';
                })
            }
            return `<div class="shadow-lg bg-white p-3">
                <div class="d-flex align-items-center justify-content-between">
                    <code>${urlify(data.text)}</code>
                    <button class="btn" onclick="navigator.clipboard.writeText('${data.text}')"><i class="bi bi-clipboard onpageI"></i></button>
                </div>
            </div>`;
        }
        else if (data.type === "note" && (Date.now() - data.timeStamp < 2628000000)){
            let textArray = data.text.split("<br>");

            let header = textArray.shift();
            let paragraph = textArray.join("");
            return `<div class="shadow-lg bg-white p-3">
                <div class="d-flex align-items-center justify-content-between">
                    <h6>${header}</h6>
                    <button class="btn" onclick="navigator.clipboard.writeText('${data.text}')"><i class="bi bi-clipboard onpageI"></i></button>
                </div>
                <code>${paragraph}</code>
            </div>`;
        }
        //working on it
        else if (data.type === "img"){
            return `<div class="bg-white shadow-lg img-doc d-flex flex-column flex-md-row my-2">
                        <img src="https://picsum.photos/200/" alt="" srcset="" class="flex-grow-1">
                        <div class="p-3 w-100 d-flex align-items-start justify-content-between">
                            <code class="flex-grow-1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis alias laboriosam cum odit perspiciatis ad atque eum! Itaque consectetur et ex aliquam impedit adipisci? Inventore voluptates alias itaque quam aut labore sunt facere fugit? Labore nihil a eaque pariatur debitis, aspernatur ex ratione cumque earum officia fugit hic, accusantium magnam!
                            </code>
                            <div class="h-100 float-end w-auto d-flex flex-column justify-content-center justify-content-md-start">
                                <a class="btn" download="https://picsum.photos/200/">
                                    <i class="bi bi-download onpageI"></i></a>
                                <button class="btn" onclick="navigator.clipboard.writeText('${data.text}')">
                                    <i class="bi bi-clipboard onpageI"></i></button>
                            </div>
                        </div>
                    </div>`
        } 
        else return ``
    }


    static copytext(text) {
         navigator.clipboard.writeText(text);
    }


    deleteTodo(ID) {
        let docRef = doc(this.DB, this.userCollection ,ID)
        updateDoc(docRef, {
          done: true
        })
        .then(() => {
            this.refresh();
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        })
    }
    
}

