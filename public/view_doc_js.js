"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunknotion_clone"] = self["webpackChunknotion_clone"] || []).push([["view_doc_js"],{

/***/ "./view/doc.js":
/*!*********************!*\
  !*** ./view/doc.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"todo\": () => (/* binding */ todo)\n/* harmony export */ });\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n\nlet DBclone, TODOclone\nconst todo = class {\n    todoArray = [];\n    TODO;\n    DB;\n    qry;\n    userCollection;\n    constructor (DB, UID) {\n        this.DB = DBclone = DB;\n        this.userCollection = UID;\n        this.TODO = TODOclone = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(DB, UID);\n        this.qry = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.query)(this.TODO, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.orderBy)('timeStamp', \"desc\"));\n        this.refresh()\n    }\n    refresh() {\n        this.todoArray = [];\n\n        //using IIAFE because constructor cannot be async\n        (async () => {\n            const querySnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.getDocs)(this.qry);\n            querySnapshot.forEach((doc) => {\n                //here destructuring is used to add id to the object\n                this.todoArray.push({ ...doc.data(), id: doc.id })\n            })\n            this.displayTodo()\n            const deleteBtn = document.querySelectorAll('.delete');\n            deleteBtn.forEach(btn => {\n                btn.addEventListener('click', (e) => {\n                    e.preventDefault();\n                    let id = e.target.parentElement.parentElement.id;\n                    this.deleteTodo(id.toString());\n                })\n            })\n        })();\n\n    }\n\n\n\n    addTodo(value, type) {\n        let X\n        if (type == \"todo\")\n            X = { type: type, text: value, timeStamp: Date.now(), done: false }\n\n        else if (type == \"note\") {\n            let textArray = value.split(\"\\n\");\n            let paragraph = textArray.join(\"<br>\");\n            X = { type: type, text: paragraph, timeStamp: Date.now() }\n        }\n\n        else X = { type: type, text: value, timeStamp: Date.now() }\n\n        ;(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.addDoc)(this.TODO, X)\n            .then((docRef) => {\n                this.refresh()\n            }).catch((error) => {\n                console.error(\"Error adding document: \", error);\n            })\n    }\n\n\n\n\n    displayTodo() {\n        let container = document.getElementById(\"container\");\n        container.innerHTML = \"\";\n        this.todoArray.forEach((data) => {\n            container.innerHTML += this.TempleteTodo(data);\n        })\n    }\n\n\n\n    TempleteTodo(data) {\n        if (data.type === \"todo\" && ((Date.now() - data.timeStamp < 86400000) || !data.done)) {\n\n\n            let icon = data.done ? \"bi-check-square-fill\" : \"bi-square\";\n            let btnstyle = data.done ? \"btn\" : \"btn delete\";\n            let text = data.done ? \"text-decoration-line-through\" + \" \" + \"text-black-50\" : \"\";\n            return `<div id=${data.id} class=\"shadow-lg bg-white p-2 d-flex gap-2 align-items-center\">\n                <button class=\"${btnstyle}\"><i class=\"bi ${icon} onpageI\"></i></button>\n                <h6 class=\"${text}\">${data.text}</h6>\n            </div>`;\n        }\n        else if (data.type === \"link\" && (Date.now() - data.timeStamp < 6 * 3600000)) {\n            function urlify(text) {\n                var urlRegex = /(https?:\\/\\/[^\\s]+)/g;\n                return text.replace(urlRegex, function (url) {\n                    return '<a href=\"' + url + '\"class=\"d-flex gap-1 align-items-center\"><i class=\"bi bi-link-45deg\"></i> ' + url + '</a>';\n                })\n            }\n            return `<div class=\"shadow-lg bg-white p-3\">\n                <div class=\"d-flex align-items-center justify-content-between\">\n                    <code>${urlify(data.text)}</code>\n                    <button class=\"btn\" onclick=\"navigator.clipboard.writeText('${data.text}')\"><i class=\"bi bi-clipboard onpageI\"></i></button>\n                </div>\n            </div>`;\n        }\n        else if (data.type === \"note\" && (Date.now() - data.timeStamp < 2628000000)) {\n            let textArray = data.text.split(\"<br>\");\n\n            let header = textArray.shift();\n            let paragraph = textArray.join(\"\");\n            return `<div class=\"shadow-lg bg-white p-3\">\n                <div class=\"d-flex align-items-center justify-content-between\">\n                    <h6>${header}</h6>\n                    <button class=\"btn\" onclick=\"navigator.clipboard.writeText('${data.text}')\"><i class=\"bi bi-clipboard onpageI\"></i></button>\n                </div>\n                <code>${paragraph}</code>\n            </div>`;\n        }\n        //working on it\n        else if (data.type === \"img\") {\n            return `<div class=\"bg-white shadow-lg img-doc d-flex flex-column flex-md-row my-2\">\n                        <img src=\"https://picsum.photos/200/\" alt=\"\" srcset=\"\" class=\"flex-grow-1\">\n                        <div class=\"p-3 w-100 d-flex align-items-start justify-content-between\">\n                            <code class=\"flex-grow-1\">\n                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis alias laboriosam cum odit perspiciatis ad atque eum! Itaque consectetur et ex aliquam impedit adipisci? Inventore voluptates alias itaque quam aut labore sunt facere fugit? Labore nihil a eaque pariatur debitis, aspernatur ex ratione cumque earum officia fugit hic, accusantium magnam!\n                            </code>\n                            <div class=\"h-100 float-end w-auto d-flex flex-column justify-content-center justify-content-md-start\">\n                                <a class=\"btn\" download=\"https://picsum.photos/200/\">\n                                    <i class=\"bi bi-download onpageI\"></i></a>\n                                <button class=\"btn\" onclick=\"navigator.clipboard.writeText('${data.text}')\">\n                                    <i class=\"bi bi-clipboard onpageI\"></i></button>\n                            </div>\n                        </div>\n                    </div>`\n        }\n        else return ``\n    }\n\n\n    static copytext(text) {\n        navigator.clipboard.writeText(text);\n    }\n\n\n    deleteTodo(ID) {\n        let docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(this.DB, this.userCollection, ID)\n        ;(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.updateDoc)(docRef, {\n            done: true\n        })\n            .then(() => {\n                this.refresh();\n            })\n            .catch((error) => {\n                console.error(\"Error updating document: \", error);\n            })\n    }\n\n}\n\n\n\n//# sourceURL=webpack://notion-clone/./view/doc.js?");

/***/ })

}]);