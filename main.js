let todoAddBtn = document.getElementById('add');
let dropDownForm = document.querySelector('.drop__down__form');
let dropDownFormCloseBtn = document.querySelector('#close__form');

todoAddBtn.addEventListener("click", () => {
    dropDownForm.classList.remove("drop__down__close");
    dropDownForm.classList.add("drop__down__show")

    let title = document.getElementById('title');
    let desc = document.getElementById('desc');
    
    title.value = "";
    desc.value = "";
})

dropDownFormCloseBtn.addEventListener("click", () => {
    dropDownForm.classList.add("drop__down__close");
    dropDownForm.classList.remove("drop__down__show")
})

// code for add todo

let saveToDo = () => {
    let title = document.getElementById('title');
    let desc = document.getElementById('desc');

    localStorage.setItem(title.value, desc.value);

    title.value = "";
    desc.value = "";

    dropDownForm.classList.add("drop__down__close");
    dropDownForm.classList.remove("drop__down__show");

    location.reload();

}


// code for display data in Dom


function allStorageData() {
    var archive = [];
    for (var i = 0; i < localStorage.length; i++) {
        archive[i] = localStorage.getItem(localStorage.key(i));
    }

    return archive;
}

function allStorageKey() {

    keys = Object.keys(localStorage),
        i = keys.length;

    return keys;
}

let displayData = () => {

    let todoContainer = document.querySelector('.todo__container');

    let key = allStorageKey();
    let data = allStorageData();

    todoContainer.innerHTML = "";

    for (let i = 0; i < key.length; i++) {

        todoContainer.innerHTML += `
        <div class="todo">
            <div class="text__content">
                <p class="todo__title">
                    ${key[i]}
                </p>
                <p class="todo__desc">
                    ${data[i]}
                </p>
            </div>

            <div class="btn__group">
                <button class="edit" data-key="${key[i]}" data-value="${data[i]}">Edit</button>
                <button class="delete" data-key="${key[i]}">Delete</button>
            </div>
        </div>
            `;
    }
}

displayData();


// code for edit todos
let editBtns = document.querySelectorAll('.edit');

editBtns.forEach(element => {

    element.addEventListener("click", () => {
        let editTodoTitle = element.getAttribute("data-key")
        let editTodoDescription = element.getAttribute("data-value")

        dropDownForm.classList.remove("drop__down__close");
        dropDownForm.classList.add("drop__down__show")

        let title = document.getElementById('title');
        let desc = document.getElementById('desc');
        let submitBtn = document.getElementById('submit__btn');

        title.value = editTodoTitle;
        desc.value = editTodoDescription;

        submitBtn.setAttribute("onclick", "editTodo()");
        submitBtn.setAttribute("data-key", title.value);

    })
})

let editTodo = () => {
    let title = document.getElementById('title');
    let desc = document.getElementById('desc');
    let submitBtn = document.getElementById('submit__btn');

    let key = submitBtn.getAttribute("data-key");

    localStorage.removeItem(key);
    localStorage.setItem(title.value, desc.value);

    title.value = "";
    desc.value = "";

    submitBtn.setAttribute("onclick", "saveToDo()");
    submitBtn.removeAttribute("data-key");

    dropDownForm.classList.add("drop__down__close");
    dropDownForm.classList.remove("drop__down__show");

    location.reload();
}

// remove item
let deleteBtns = document.querySelectorAll('.delete');
deleteBtns.forEach((Element) => {
    Element.addEventListener("click", () => {
        let key = Element.getAttribute("data-key");
        let userResponse = confirm(`really you want to delete todo : \n${key}`);
        if(userResponse)
        {
            localStorage.removeItem(key);
            location.reload();
        }
    })
})
