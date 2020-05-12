const clear = document.querySelector(".refresh-btn");
const dateElement = document.getElementById("date");
const toDoList = document.querySelector(".app-list");
const addBtn = document.getElementById("idAddBtn");
const input = document.getElementById("idAddInput");

let list = [];
let id = 0;

const check = "fa-check-circle";
const uncheck = "fa-circle";
const lined = "lined";

function addToDo(toDo, id, done, trash) {
    if (trash) {
        return;
    }

    this.toDo = toDo;
    this.id = id;
    this.done = done ? check : uncheck;
    this.lined = this.done ? "" : lined;

    this.toDoComponent = `
  <div class="to-do-container">

  <div class="font-2x">
      <i id="${this.id}" class="far ${this.done}" job="complete"></i>
      <span class="to-do-title ${this.lined}">${this.toDo}</span>
  </div>

  <div>
      <i id="trash${this.id}" class="fas fa-trash-alt" job="delete"></i>
  </div>
</div>
`;

    const position = "beforeend";

    return toDoList.insertAdjacentHTML(position, this.toDoComponent);
}

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

    return (input.value = "");
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
        id++;
    }
});

function completeToDo(element) {
    this.element = element;
    this.element.classList.toggle(check);
    this.element.classList.toggle(uncheck);
    this.element.parentNode.querySelector(".to-do-title").classList.toggle(lined);

    if (this.element.classList.contains(check)) {
        list[this.element.id].done = true;
    } else {
        list[this.element.id].done = false;
    }
}

function removeToDo(element) {
    this.element = element;
    this.element.parentNode.parentNode.parentNode.removeChild(
        this.element.parentNode.parentNode
    );

    this.id = this.element.id;
    this.id = this.id.replace("trash", "");
    list[this.id].trash = true;
}

toDoList.addEventListener("click", function (event) {
    let element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob === "complete") {
        completeToDo(element);
    } else {
        removeToDo(element);
    }
});