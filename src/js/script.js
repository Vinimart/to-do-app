const clear = document.querySelector(".refresh-btn");
const dateElement = document.getElementById("date");
const toDoList = document.querySelector(".app-list");
const addBtn = document.getElementById("idAddBtn");
const input = document.getElementById("idAddInput");



function addToDo(toDo) {

  function genId() {
    let idNum = 1;
    return idNum++;
  }

  this.id = `checkbox${genId()}`

  this.toDo = toDo;

  this.toDoComponent = `
<div class="to-do-container">
    <div class="font-2x">
      <input type="checkbox" id="${this.id}">
      <label>${this.toDo}</label>
    </div>
    <div>
      <i class="fas fa-trash-alt"></i>
    </div>
</div>
`;

  const position = "beforeend";

  return toDoList.insertAdjacentHTML(position, this.toDoComponent);
}

addBtn.addEventListener('click', () => {

    let toDo = input.value

    if (toDo) {
        addToDo(toDo)
    } else {
        alert('Preencha o campo Add um To-do')
    }

    return input.value = ''

})

input.addEventListener('keyup', (event) => {

    let toDo = input.value

    if (event.keyCode == 13) {

        if (toDo) {
            addToDo(toDo)
        } else {
            alert('Preencha o campo Add um To-do')
        }
    
        return input.value = ''
    }
})
