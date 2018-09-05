class Form {
  constructor(mediator) {
    this.mediator = mediator;
    this.taskName = document.getElementById("taskTitle");
    this.taskDesc = document.getElementById("taskText");
    // this.taskStatus
    this.addBtn = document.getElementById("addBtn");
    this.add = this.add.bind(this);
    this.addListeners = this.addListeners.bind(this);
    return (this.addListeners())
  }

  addListeners() {
    this.addBtn.addEventListener("click", (e) => {
      if (this.taskName.value !== "") {
        this.add();
        this.taskName.value = "";
        this.taskDesc.value = "";
      }
      else {
        alert("Fill the Task Name field")
      }
    })
  }

  add() {
    this.mediator.notify(this, "add");
  }
}

class Task {
  constructor(mediator, sender){
    this.mediator = mediator;
    this.name = sender.taskName.value;
    this.desc = sender.taskDesc.value;
    // this.status = status;
    this.createElement = this.createElement.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.taskElement;
  }

  createElement() {
    this.taskElement = document.createElement("div");
    this.taskElement.classList.add("col-xs-12", "col-sm-6", "col-md-4", "col-lg-3", "pt-2", "pb-4");
    const card = document.createElement("div");
    card.classList.add("card");
    this.taskElement.appendChild(card);
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);
    cardBody.innerHTML = `<h5 class="card-title">${this.name}</h5>
    <p class="card-text">${this.desc}</p>`;
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.classList.add("delete", "btn", "btn-outline-danger");
    deleteBtn.innerText = "Delete";
    cardBody.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", (e) => this.removeElement());
    return (this.taskElement);
  }

  removeElement() {
    this.mediator.notify(this, "remove");
  }
}

class Mediator {
  constructor() {
    this.task_list = document.getElementById("taskList");
    this.addToDom = this.addToDom.bind(this);   
  }

  addToDom(HTMLelement) {
    this.task_list.appendChild(HTMLelement);
  }

  notify(sender, message) {
    if (sender instanceof Form && message === "add" ) {  
      const task = new Task(this, sender);
      const HtmlElement = task.createElement();
      this.addToDom(HtmlElement);
    } else if (sender instanceof Task && message === "remove" ) {  
      sender.taskElement.remove();
    }
  }
}

const mediator = new Mediator();
const form = new Form(mediator);

