/* Global Variables */

const clear = document.querySelector(".refresh-btn");
const dateElement = document.getElementById("date");
const toDoList = document.querySelector(".app-list");
const addBtn = document.getElementById("idAddBtn");
const input = document.getElementById("idAddInput");

let list;
let id;

const check = "fa-check-circle";
const uncheck = "fa-circle";
const lined = "lined";

// LocalStorage

let data = localStorage.getItem("toDo");

if (data) {
    list = JSON.parse(data);
    loadList(list);
    id = list.length;
} else {
    list = [];
    id = 0;
}

function loadList(array) {
    array.forEach((item) => {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Todo Template

function addToDo(toDo, id, done, trash) {
    if (trash) {
        return;
    }

    this.toDo = toDo;
    this.id = id;
    this.done = done ? check : uncheck;
    this.lined = done ? lined : "";

    this.toDoComponent = `
  <div class="to-do-container">

  <div class="font-2x">
      <i id="${this.id}" class="far ${this.done} font-3x" job="complete"></i>
      <span class="to-do-title ${this.lined}">${this.toDo}</span>
  </div>

  <div>
      <i id="trash${this.id}" class="fas fa-trash-alt font-3x" job="delete"></i>
  </div>
</div>
`;

    const position = "beforeend";

    return toDoList.insertAdjacentHTML(position, this.toDoComponent);
}

// Add Remove Todo

addBtn.addEventListener("click", () => {
    let toDo = input.value;

    if (toDo) {
        addToDo(toDo, id, false, false);

        list.push({
            name: toDo,
            id: id,
            done: false,
            trash: false,
        });
    } else {
        alert("Preencha o campo Add um To-do");
    }
    input.value = "";
    localStorage.setItem("toDo", JSON.stringify(list));
});

input.addEventListener("keyup", (event) => {
    let toDo = input.value;

    if (event.keyCode == 13) {
        if (toDo) {
            addToDo(toDo, id, false, false);

            list.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
            });
        } else {
            alert("Preencha o campo Add um To-do");
        }
        input.value = "";
        localStorage.setItem("toDo", JSON.stringify(list));
        id++;
    }
});

// Add Remove Class

function completeToDo(element) {
    this.element = element;
    this.element.classList.toggle(check);
    this.element.classList.toggle(uncheck);

    if (this.element.classList.contains(check)) {
        list[this.element.id].done = true;
    } else {
        list[this.element.id].done = false;
    }

    this.element.parentNode.querySelector(".to-do-title").classList.toggle(lined);
}

function removeToDo(element) {
    this.element = element;

    this.id = this.element.id;
    this.id = this.id.replace("trash", "");
    list[this.id].trash = true;

    this.container = this.element.parentNode.parentNode;

    this.element.classList.add("color-5th")
    this.container.classList.add("fade-out-left")

    window.setTimeout(() => {
        this.container.parentNode.removeChild(
            this.container
        );
    }, 400)
}

toDoList.addEventListener("click", function (event) {
    let element = event.target;
    let elementJob = element.attributes.job.value;

    if (elementJob === "complete") {
        completeToDo(element);
    } else if (elementJob === "delete") {
        removeToDo(element);
    }

    localStorage.setItem("toDo", JSON.stringify(list));
});

// Date

let options = {
    weekday: "long",
    month: "short",
    day: "numeric",
};

let today = new Date();
today = today.toLocaleDateString("pt-BR", options);
const todayCap = today.charAt(0).toUpperCase() + today.slice(1);

dateElement.innerHTML = todayCap;