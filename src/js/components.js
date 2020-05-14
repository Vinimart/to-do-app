class ToDo {

    constructor() {
        const $ = document.querySelector.bind(document)

        this.clear = $(".refresh-btn")
        this.dateElement = $("#date")
        this.toDoList = $(".app-list")
        this.addBtn = $("#idAddBtn")
        this.input = $("#idAddInput")
        
        this.list
        this.id
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
        this.lined = done ? this.lined : ""
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
            this.lined
        ));
    }
}

class ToDoGetter {

    constructor() {
        const toDo = new ToDo()
    
        this.addBtn = toDo.addBtn
        this.name = toDo.input
        this.id = toDo.id
        this.list = toDo.list

        this.observe()
    }

    add() {
        const addToDo = new AddToDo()

        if (this.name.value) {

            addToDo.insertComponent(this.name.value, this.id, false, false)
            //addToDo.insertComponent()

            /*this.list.push({
                name: this.name.value,
                id: this.id,
                done: false,
                trash: false
            })*/
        } else {
            alert("Preencha o campo Add um To-do");
        }
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
    }
}

