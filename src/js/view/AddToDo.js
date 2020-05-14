class AddToDo {
    constructor() {
        // Classe do tipo view, forma o template do componente principal da página
        const toDoClass = new ToDo();
        this.toDoList = toDoClass.toDoList;

        // Classes CSS (font-awesome 5 icons)
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

    completeToDo(done) {
        // Atribui a classe css correta dependendo do valor boolean do parâmetro done
        this.done = done ? this.check : this.uncheck;
        // nova variável com underscore para não sobreescrever a variável lined original
        this._lined = done ? this.lined : "";
    }

    insertComponent(name, id, done, trash) {
        // Passa os parâmetros do to-do para o template
        this.name = name;
        this.id = id;
        this.done = done;
        this.trash = trash;
        this.position = "beforeend";

        // O localStorage usa essa propriedade para não restaurar to-dos excluídos
        if (this.trash) return;

        this.completeToDo(done);

        // Renderiza o componente abaixo do último componente da lista.
        return this.toDoList.insertAdjacentHTML(
            this.position,
            this.template(this.name, this.id, this.done, this._lined)
        );
    }
}