class ToDo {
    constructor() {
        // Class model que referencia a DOM da página principal do to-do app
        // A partir dessa classe é possível manipular os principais componentes visuais da aplicação
        const $ = document.querySelector.bind(document);

        this.clear = $(".refresh-btn");
        this.dateElement = $("#date");
        this.toDoList = $(".app-list");
        this.addBtn = $("#idAddBtn");
        this.input = $("#idAddInput");

        this.list = [];
        this.id = 0;
    }
}