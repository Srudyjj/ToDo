// window.addEventListener("load", function(event) {
//     console.log("All resources finished loading!");
// });

const toDo = (function() {

  const UIElements = {
    taskName: document.getElementById('taskTitle'),
    taskText: document.getElementById('taskText'),
    addBtn: document.getElementById('addBtn'),
    taskList: document.getElementById('taskList')
  }

  const clearFields = function() {
    UIElements.taskName.value = '';
    UIElements.taskText.value = '';
  }

  const warning = function(elem) {
    elem.classList.add("warning");
    setTimeout(() => {
      elem.classList.remove("warning")
    }, 2000);
  }

  return {
    add: function() {
      if (UIElements.taskName.value !== "") {
        const task = `
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 pt-2 pb-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${UIElements.taskName.value}</h5>
                <p class="card-text">${UIElements.taskText.value}</p>
                <div class="btn-group" role="group" aria-label="Button group">
                  <div class="btn-group" role="group">
                    <button id="taskStatus" type="button" class="btn btn-outline-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Status
                    </button>
                    <div class="dropdown-menu" aria-labelledby="taskStatus">
                      <a class="dropdown-item" status="done" href="#">Done</a>
                      <a class="dropdown-item" status="onProcess" href="#">On Process</a>
                    </div>
                  </div>
                  <button type="button" class="edit btn btn btn-outline-warning">Edit</button>
                  <button type="button" class="delete btn btn btn-outline-danger">Delete</button>
                </div>
              </div>
            </div>
          </div>
        `;
      UIElements.taskList.innerHTML += task;
      clearFields();
      } else {
        warning(UIElements.taskName);
      }
    },

    delete: function(e) {
      if (e.target.classList.contains("delete")) {
        parent(e.target);

        function parent(elem) {        
          if(elem.classList.contains("card")) {
            return elem.parentElement.remove();
          }
          parent(elem.parentElement); 
        }
      }
    },

    edit: function() {
      console.log("edit");
      
    },

    status: function() {
      console.log("status");
    },

    getUI : function() {
      return UIElements
    }
  }
})()

toDo.getUI().addBtn.addEventListener('click', toDo.add);
toDo.getUI().taskList.addEventListener('click', toDo.delete);






