class AddToDo {
    constructor() {
        const toDoClass = new ToDo();
        this.toDoList = toDoClass.toDoList;

        this.check = "fa-check-circle";
        this.uncheck = "fa-circle";
        this.lined = "lined";
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
        `;
    }

    isTrash() {
        if (this.trash) return;
    }

    completeToDo(done) {
        this.done = done ? this.check : this.uncheck;
        this._lined = done ? this.lined : "";
    }

    insertComponent(name, id, done, trash) {
        this.name = name;
        this.id = id;
        this.done = done;
        this.trash = trash;
        this.position = "beforeend";

        this.isTrash();
        this.completeToDo(done);

        return this.toDoList.insertAdjacentHTML(
            this.position,
            this.template(this.name, this.id, this.done, this._lined)
        );
    }
}