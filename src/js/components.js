class ToDo {

    constructor() {
        const $ = document.querySelector.bind(document)

        this.clear = $(".refresh-btn")
        this.dateElement = $("#date")
        this.toDoList = $(".app-list")
        this.addBtn = $("#idAddBtn")
        this.input = $("#idAddInput")

        this.list = []
        this.id = 0
    }
}

class AddToDo {

    constructor() {
        const toDoClass = new ToDo
        this.toDoList = toDoClass.toDoList

        this.check = "fa-check-circle"
        this.uncheck = "fa-circle"
        this.lined = "lined"
    }

    template(name, id, done, lined) {

        return `
        <div class="to-do-container">

        <div class="font-2x">
            <i id="${id}" class="far ${done} font-3x" job="complete"></i>
            <span class="to-do-title ${lined}">${name}</span>
        </div>

        <div>
            <i id="trash${id}" class="fas fa-trash-alt font-3x" job="delete"></i>
        </div>
        </div>
        `
    }

    isTrash() {

        if (this.trash) return
    }

    completeToDo(done) {

        this.done = done ? this.check : this.uncheck;
        this._lined = done ? this.lined : ""
    }

    insertComponent(name, id, done, trash) {

        this.name = name
        this.id = id;
        this.done = done
        this.trash = trash
        this.position = "beforeend"

        this.isTrash()
        this.completeToDo(done)

        return this.toDoList.insertAdjacentHTML(this.position, this.template(
            this.name,
            this.id,
            this.done,
            this._lined
        ));
    }
}

class ToDoGetter {

    constructor() {

        const toDo = new ToDo()
        this.addToDo = new AddToDo()

        this.addBtn = toDo.addBtn
        this.name = toDo.input
        this.id = toDo.id
        this.list = toDo.list
        this.toDoListView = toDo.toDoList

        this.observe()
    }

    add() {


        if (this.name.value) {

            this.addToDo.insertComponent(this.name.value, this.id, false, false)

            this.list.push({
                name: this.name.value,
                id: this.id,
                done: false,
                trash: false
            })
        } else {

            alert("Preencha o campo Add um To-do");
        }

        this.name.value = ''
        this.id++
    }

    completeToDo() {

        this.element.classList.toggle(this.addToDo.check);
        this.element.classList.toggle(this.addToDo.uncheck);

        if (this.element.classList.contains(this.addToDo.check)) {

            this.list[this.element.id].done = true;
        } else {

            this.list[this.element.id].done = false;
        }

        this.element.parentNode.querySelector(".to-do-title").classList.toggle(this.addToDo.lined);
    }

    removeToDo() {

        this.trashId = this.element.id;
        this.trashId = this.trashId.replace("trash", "");
        this.list[this.trashId].trash = true;

        this.container = this.element.parentNode.parentNode;

        this.element.classList.add("color-5th")
        this.container.classList.add("fade-out-left")

        window.setTimeout(() => {
            this.container.parentNode.removeChild(
                this.container
            );
        }, 400)
    }

    observe() {

        this.name.addEventListener('keyup', (event) => {

            if (event.keyCode == 13) {
                this.add()
            }
        })

        this.addBtn.addEventListener('click', () => {

            this.add()
        })

        this.toDoListView.addEventListener('click', (event) => {

            this.element = event.target
            this.elementJob = this.element.attributes.job.value;

            if (this.elementJob === "complete") {

                this.completeToDo()
            } else if (this.elementJob === "delete") {

                this.removeToDo()
            }
        })
    }
}