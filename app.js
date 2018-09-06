class DataStorage {
  constructor(){
   if(! DataStorage.instance) {
    DataStorage.instance = this;
    this.privateKey = "__taskList__"
    this._data = JSON.parse(localStorage.getItem(this.privateKey)) || [];   
   }
   return DataStorage.instance;
  }

  add(task) {
    const taskItem = {}
    taskItem.taskName = task.taskName;
    taskItem.taskDesc = task.taskDesc;
    taskItem.taskStatus = task.taskStatus;
    this._data.push(taskItem);
    localStorage.setItem(this.privateKey, JSON.stringify(this._data));
  }

  update(task) {
    const newList = this._data.map(item => {
      if (item.taskName === task.taskName) {
        item.taskStatus = task.taskStatus;
        return item;
      } else {
        return item;
      }
    });
    this._data = newList;
    localStorage.setItem(this.privateKey, JSON.stringify(this._data));    
  }

  remove(task) {
    const newList = this._data.filter(item => item.taskName !== task.taskName);
    this._data = newList;
    localStorage.setItem(this.privateKey, JSON.stringify(this._data));     
  }
}

class Form {
  constructor(mediator) {
    this.mediator = mediator;
    this.taskName = "";
    this.taskDesc = "";
    this.taskStatus = "";
    this.taskNameField = document.getElementById("taskTitle");
    this.taskDescField = document.getElementById("taskText");
    this.taskStatusField = document.getElementById("status");
    this.addBtn = document.getElementById("addBtn");
    this.add = this.add.bind(this);
    this.addListeners = this.addListeners.bind(this);
    this.clearFields = this.clearFields.bind(this);
    return (this.addListeners())
  }

  addListeners() {
    this.addBtn.addEventListener("click", (e) => {      
      if (this.taskNameField.value !== "") {
        this.add();
      }
      else {
        alert("Fill the Task Name field")
      }
    })
  }

  add() {
    this.taskName = this.taskNameField.value;
    this.taskDesc = this.taskDescField.value;
    this.taskStatus = this.taskStatusField.value;
    this.mediator.notify(this, "add");
    this.clearFields();
  }

  clearFields() {
    this.taskNameField.value = "";
    this.taskDescField.value = "";
    this.taskStatusField.value = "ToDo";
  }
}

class Task {
  constructor(mediator, sender){
    this.mediator = mediator;
    this.taskName = sender.taskName;
    this.taskDesc = sender.taskDesc;
    this.taskStatus = sender.taskStatus;
    this.createElement = this.createElement.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.setStatus = this.setStatus.bind(this);   
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
    cardBody.innerHTML = `<h5 class="card-title">${this.taskName}</h5>
    <p class="card-text">${this.taskDesc}</p>`;

    const form = document.createElement("form");
    const formGroup = document.createElement("div");
    formGroup.classList.add("form-group");
    const label = document.createElement("label");
    label.setAttribute("for", `${this.taskName}_status`);
    label.innerText = "Status";
    const select = document.createElement("select");
    select.classList.add("form-control");
    select.id = `${this.name}_status`;
    select.innerHTML = "<option>ToDo</option><option>Going</option><option>Done</option>  <option>Reject</option>";
    select.value = this.taskStatus;
    select.addEventListener("change", () => {this.setStatus(select.value)});

    formGroup.appendChild(label);
    formGroup.appendChild(select);
    form.appendChild(formGroup);
    cardBody.insertBefore(form, cardBody.firstChild);

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.classList.add("delete", "btn", "btn-outline-danger");
    deleteBtn.innerText = "Delete";
    cardBody.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", (e) => this.removeElement());
    return (this.taskElement);
  }

  setStatus(status) {
    this.taskStatus = status;
    this.mediator.notify(this, "update");
  }

  removeElement() {
    this.mediator.notify(this, "remove");
  }
}

class Mediator {
  constructor() {
    this.task_list = document.getElementById("taskList");
    this.dataStorage = new DataStorage();
    this.init = this.init.bind(this);
    return this.init();
  }

  init() {
    window.onload = () => {
      const renderList = this.dataStorage._data;
      renderList.forEach(item => {
        const task = new Task(this, item);
        this.task_list.appendChild(task.createElement());
      });
    }
  }

  notify(sender, message) {
    if (sender instanceof Form && message === "add") {
      const validator = (sender) => {
        let i = true;
        this.dataStorage._data.forEach(item => {
          if (item.taskName === sender.taskName) {          
            i = false;
          }                  
        });
        return i;        
      }     
      if (validator(sender)) {
        const task = new Task(this, sender);
        this.task_list.appendChild(task.createElement());
        this.dataStorage.add(task);
      } else {
        alert("Task has already added");
      }
    } else if (sender instanceof Task && message === "remove") {  
      sender.taskElement.remove();
      this.dataStorage.remove(sender);
    } else if (sender instanceof Task && message === "update") {  
      this.dataStorage.update(sender);
    }
  }
}

const mediator = new Mediator();
const form = new Form(mediator);

