class DataStorage {
  constructor(){
   if(! DataStorage.instance) {
    DataStorage.instance = this;
    this.privateKey = "__taskList__"
    this._data = localStorage.getItem(this.privateKey) || [];   
   }
   return DataStorage.instance;
  }

  add(task) {
    const taskItem = {}
    taskItem.name = task.name;
    taskItem.desc = task.desc;
    this._data.push(taskItem);
    localStorage.setItem(this.privateKey, JSON.stringify(this._data));
  }

  remove(task) {
    console.log(task.name);
    console.log(this._data);
    
    
  }
}

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
    this.dataStorage = new DataStorage(); 
  }

  notify(sender, message) {
    if (sender instanceof Form && message === "add" ) {  
      const task = new Task(this, sender);
      this.task_list.appendChild(task.createElement());
      this.dataStorage.add(task);
    } else if (sender instanceof Task && message === "remove" ) {  
      sender.taskElement.remove();
      this.dataStorage.remove(sender);
    }
  }
}

const mediator = new Mediator();
const form = new Form(mediator);

