class ToDoGetter {
    constructor() {
        const toDo = new ToDo();
        const date = new HeaderDate();
        this.addToDo = new AddToDo();

        this.addBtn = toDo.addBtn;
        this.name = toDo.input;
        this.id = toDo.id;
        this.list = toDo.list;
        this.toDoListView = toDo.toDoList;

        this.observe();
        date.render(toDo.dateElement);
    }

    add() {
        if (this.name.value) {
            this.addToDo.insertComponent(this.name.value, this.id, false, false);

            this.list.push({
                name: this.name.value,
                id: this.id,
                done: false,
                trash: false,
            });
        } else {
            alert("Preencha o campo Add um To-do");
            return;
        }

        this.name.value = "";
        this.id++;
    }

    completeToDo() {
        this.element.classList.toggle(this.addToDo.check);
        this.element.classList.toggle(this.addToDo.uncheck);

        if (this.element.classList.contains(this.addToDo.check)) {
            this.list[this.element.id].done = true;
        } else {
            this.list[this.element.id].done = false;
        }

        this.element.parentNode
            .querySelector(".to-do-title")
            .classList.toggle(this.addToDo.lined);
    }

    removeToDo() {
        this.trashId = this.element.id;
        this.trashId = this.trashId.replace("trash", "");
        this.list[this.trashId].trash = true;

        this.container = this.element.parentNode.parentNode;

        this.element.classList.add("color-5th");
        this.container.classList.add("fade-out-left");

        window.setTimeout(() => {
            this.container.parentNode.removeChild(this.container);
        }, 400);
    }

    observe() {
        this.name.addEventListener("keyup", (event) => {
            if (event.keyCode == 13) {
                this.add();
            }
        });

        this.addBtn.addEventListener("click", () => {
            this.add();
        });

        this.toDoListView.addEventListener("click", (event) => {
            this.element = event.target;
            this.elementJob = this.element.attributes.job.value;

            if (this.elementJob === "complete") {
                this.completeToDo();
            } else if (this.elementJob === "delete") {
                this.removeToDo();
            }
        });
    }
}