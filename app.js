class Form {
  constructor(mediator) {
    this.mediator = mediator;
    this.taskName = document.getElementById("taskTitle");
    this.taskDesc = document.getElementById("taskText");
    // this.taskStatus
    this.addBtn = document.getElementById("addBtn");
    this.add = this.add.bind(this);
  }

  addListeners() {
    this.addBtn.addEventListener("click", (e) => {
      if (this.taskName.value !== "") {
        this.add();
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
  }

  createElement() {
    return (`
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 pt-2 pb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${this.name}</h5>
          <p class="card-text">${this.desc}</p>
          <button type="button" class="delete btn btn btn-outline-danger">Delete</button>
        </div>  
      </div>
    </div>`)
  }

  addToDOM(task_list) {
    task_list.innerHTML += this.createElement();
  }
}

class Mediator {
  constructor() {
    this.task_list = document.getElementById("taskList");   
  }

  notify(sender, message) {
    if (sender instanceof Form && message === "add" ) {  
      const task = new Task(this, sender);
      task.createElement();    
      task.addToDOM(this.task_list);
    }
  }
}

const mediator = new Mediator();
const form = new Form(mediator);
form.addListeners();
