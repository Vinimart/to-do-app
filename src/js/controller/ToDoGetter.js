class ToDoGetter {
    constructor() {
        // Classe controller instânciada na página HTML
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
        // Passa os parâmetros padrões para o construtor do componente de to-do

        if (this.name.value) {
            this.addToDo.insertComponent(this.name.value, this.id, false, false);

            // Envia os parâmetros para a lista de objetos que armazenam as propriedades do componente to-do
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

        // Limpa o input
        this.name.value = "";

        // ID é incrementado sempre que é criado uma nova instância do componente to-do
        this.id++;
    }

    completeToDo() {
        // Altera as classes CSS da instância do componente to-do
        this.element.classList.toggle(this.addToDo.check);
        this.element.classList.toggle(this.addToDo.uncheck);
        this.element.parentNode
            .querySelector(".to-do-title")
            .classList.toggle(this.addToDo.lined);

        // Altera a propriedade done no array lista do componente
        if (this.element.classList.contains(this.addToDo.check)) {
            this.list[this.element.id].done = true;
        } else {
            this.list[this.element.id].done = false;
        }
    }

    removeToDo() {
        // Altera a propriedade trash no array lista do componente
        this.trashId = this.element.id;
        this.trashId = this.trashId.replace("trash", "");
        this.list[this.trashId].trash = true;

        this.container = this.element.parentNode.parentNode;

        // Altera as classes CSS da instância do componente to-do
        this.element.classList.add("color-5th");
        this.container.classList.add("fade-out-left");

        // Remove o componente to-do logo após o fim da animação 'fade-out-left'
        window.setTimeout(() => {
            this.container.parentNode.removeChild(this.container);
        }, 400);
    }

    observe() {
        // Add componente
        this.name.addEventListener("keyup", (event) => {
            if (event.keyCode == 13) {
                this.add();
            }
        });

        // Add componente
        this.addBtn.addEventListener("click", () => {
            this.add();
        });

        // Marca como concluído ou deleta o componente
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