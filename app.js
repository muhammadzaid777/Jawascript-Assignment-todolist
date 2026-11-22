import { db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "./firebaseConfig.js";

let arr = []

let editId = null

let todo = document.getElementById("list")


// FIREBASE: load the saved todos when the page opens
let fetchTodos = async () => {
    try {
        arr = []
        const querySnapshot = await getDocs(collection(db, "todoItems"));

        querySnapshot.forEach((docSnap) => {
            arr.push({ ...docSnap.data(), id: docSnap.id });
        });

        // keeps the same order after a refresh
        arr.sort((a, b) => a.createdAt - b.createdAt);
    } catch (error) {
        console.error(error)
    }
}


let addTodo = async () => {

    let todoinput = document.getElementById("todo-inp")

    let newTodo = {
        text: todoinput.value,
        isCompleted: false,
        createdAt: new Date().getTime()
    }

    try {
        // FIREBASE: save it, Firebase creates the id
        let docRef = await addDoc(collection(db, "todoItems"), newTodo)

        arr.push({ ...newTodo, id: docRef.id })

        todoinput.value = ""

        displaytodos()
    } catch (error) {
        console.error(error)
    }

}


let displaytodos = () => {

    todo.innerHTML = ""

    arr.map((item) => {

        let todolist = document.createElement("li")

        todolist.innerHTML = `

            <div>

            <span class="${item.isCompleted ? 'done' : ''}">${item.text}</span>
            <button class = "dl" onClick = "elete('${item.id}')">delete</button>

            <button class = "ed" onClick = "edi('${item.id}')">edit</button>
            <button onclick="alldone('${item.id}')">Done</button>

            </div>
            `

        todo.appendChild(todolist)

    })

}


let elete = async (td) => {

    try {
        // FIREBASE: delete it from the database first
        await deleteDoc(doc(db, "todoItems", td))

        let filter = arr.filter((tod) => tod.id != td)

        arr = filter

        displaytodos()
    } catch (error) {
        console.error(error)
    }

}


let edi = (todo_id) => {

    let find = arr.find((tdo) => tdo.id == todo_id);

    document.getElementById('todo-inp').value = find.text;

    editId = todo_id;

    let adding = document.getElementById('addBtn');

    adding.innerText = 'Update';

    adding.removeAttribute("onClick")
    
          adding.setAttribute('onclick', 'updateTodo()');

    let d_btn = document.querySelectorAll('.dl')


    let ed_btn = document.querySelectorAll('.ed')
            document.querySelector('#alldelete').disabled = true
    d_btn.forEach((btn) => btn.disabled = true)
    ed_btn.forEach((btn) => btn.disabled = true)
};


let updateTodo = async () => {

    try {

           await updateDoc(doc(db, "todoItems", editId), {
            text: document.getElementById('todo-inp').value
        });

        let find = arr.find((tdo) => tdo.id == editId);
  
  find.text = document.getElementById('todo-inp').value;
           document.getElementById('todo-inp').value = "";


                        let adding = document.getElementById('addBtn');
 
        adding.innerText = 'Add';

              adding.removeAttribute('onclick');
        adding.setAttribute('onclick', 'addTodo()');

        editId = null;

        let d_btn = document.querySelectorAll('.dl')
        let ed_btn = document.querySelectorAll('.ed')
        document.querySelector('#alldelete').disabled = false
        d_btn.forEach((btn) => btn.disabled = false)
        ed_btn.forEach((btn) => btn.disabled = false)

        displaytodos();
    } catch (error) {
        console.error(error)
    }

};


let deleteAll = async (dl) => {

    try {
        await Promise.all(
            arr.map((item) => deleteDoc(doc(db, "todoItems", item.id)))
        )

        arr = []

        displaytodos()
    } catch (error) {
        console.error(error)
    }

}


let alldone = async (todo_id) => {

    try {
        await updateDoc(doc(db, "todoItems", todo_id), {
            isCompleted: true
        });

        let find = arr.find((todo) => todo.id == todo_id);

        find.isCompleted = true;

        displaytodos();
    } catch (error) {
        console.error(error)
    }

};

fetchTodos().then(() => {
    displaytodos()
})

window.addTodo = addTodo
window.elete = elete
window.edi = edi
window.updateTodo = updateTodo
window.deleteAll = deleteAll
window.alldone = alldone
