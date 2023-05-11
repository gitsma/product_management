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
let enterURL = document.getElementById("enterURL");
let placeImage = document.getElementById("placeImage")

let insertBtn = document.getElementById("insert");
let updateBtn = document.getElementById("update");
let removeBtn = document.getElementById("remove");
let findBtn = document.getElementById("find");



function insertData(evt){
    evt.preventDefault();
    console.log(typeof enterID.value.length, enterName.value, enterQuantity.value.length, enterURL.value);

    set(ref(database, "products/" + enterID.value), {
        Name: enterName.value,
        ID: enterID.value,
        Quantity: enterQuantity.value,
        Image: enterURL.value
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
                let listItem = document.createElement('li');
                listItem.classList.add("list-group-item", "list-group-item-secondary");
                listItem.textContent = "Product Name: " + snapshot.val().Name;
                result.appendChild(listItem);
                let listItemSecond = document.createElement('li');
                listItemSecond.classList.add("list-group-item", "list-group-item-light");
                listItemSecond.textContent = "Product Quantity: " + snapshot.val().Quantity;
                result.appendChild(listItemSecond);
                let listItemImage = document.createElement('img');
                listItemImage.src = snapshot.val().Image;
                placeImage.appendChild(listItemImage);

            } else {
                alert("No data found");
            }
        })
        .catch((error) => {
            alert(error)
        })
}

findBtn.addEventListener('click', findData);

function updateData(evt) {
    evt.preventDefault();
    if (enterID.value.length < 3){
        alert('Product Code cant be blank! MIN 3 Symbols')
        return
    }
    if (enterName.value === "") {
        alert('Product Name cant be blank!')
        return
    }
    if (enterQuantity.value.length < 1){
        alert('Product Quantity cant be blank! MIN 1 Symbols')
        return
    }
    console.log(`update function ${enterID.value}
                                ${enterName.value}
                                ${enterQuantity.value}`);
    update(ref(database, "products/" + enterID.value), {
        Name: enterName.value,
        Quantity: enterQuantity.value
    })
    .then(() => {
        alert("Data updated successfully");
    })
    .catch((error) => {
        alert(error);
    });
}

updateBtn.addEventListener('click', updateData);


function removeData(evt) {
    evt.preventDefault();
    if (enterID.value.length < 3) {
        alert('Product code cant be blank! MIN 3 Symbols')
        return
    }
    const dbRef = ref(database);
    get(child(dbRef, `products/${enterID.value}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            remove(ref(database, "products/" + enterID.value))
            .then(() => {
                alert("Data deleted successfully");
            })
            .catch((error) => {
                alert(error);
            });
        } else {
            console.log("No data available");
        }
    })
    .catch((error) => {
        alert(error);
    });
}

removeBtn.addEventListener('click', removeData);
