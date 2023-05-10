import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import firebaseConfig from './firebase.js';

// startuoju, prisijungiu prie savo projekto
const app = initializeApp(firebaseConfig);

//prisijungiu prie savo database
const database = getDatabase();

console.log("labas")

let enterID = document.getElementById("enterID");
let enterName = document.getElementById("enterName");
let enterQuantity = document.getElementById("enterQuantity");
let findID = document.getElementById("findID");
let result = document.getElementById("result");

let insertBtn = document.getElementById("insert");
let updateBtn = document.getElementById("update");
let removeBtn = document.getElementById("remove");
let findBtn = document.getElementById("find");

let findDataPlace = document.getElementById("findDataPlace");

function insertData(evt){
    evt.preventDefault();
    console.log(typeof enterID.value.length, enterName.value, enterQuantity.value.length);

    set(ref(database, "products/" + enterID.value), {
        Name: enterName.value,
        ID: enterID.value,
        Quantity: enterQuantity.value
    })
        .then(()=> {
            alert("data added successfully");
        })
        .catch((error) => {
            alert(error);
        });
}

insertBtn.addEventListener('click', insertData);

function findData(evt){
    evt.preventDefault();
    console.log(`select function ${enterID.value}`);
    if (findID.value.length < 3) {
        alert('Product Code cant be blank! MIN 3 Symbols')
        return
    }
    const dbref = ref(database);

    get(child(dbref, "products/" + findID.value))
        .then((snapshot) => {
            if (snapshot.exists()){
                console.log(snapshot.val());
                findDataPlace.append(JSON.stringify(snapshot.val()));

            } else {
                alert("No data found");
            }
        })
        .catch((error) => {
            alert(error)
        })
}

findBtn.addEventListener('click', findData);