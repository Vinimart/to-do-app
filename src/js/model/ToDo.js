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