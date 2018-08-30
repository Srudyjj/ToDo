const toDo = (function() {

  const UIElements = {
    taskName: document.getElementById('taskTitle'),
    taskText: document.getElementById('taskText'),
    addBtn: document.getElementById('addBtn'),
    taskList: document.getElementById('taskList')
  };

  const clearFields = function() {
    UIElements.taskName.value = '';
    UIElements.taskText.value = '';
  };

  const warning = function(elem) {
    elem.classList.add("warning");
    setTimeout(() => {
      elem.classList.remove("warning")
    }, 2000);
  };

  const storage = {

    getItems: function() {
      let items = {};
      for (let i = 0; i < localStorage.length; i++) {
        const name = localStorage.key(i);
        items[name] = localStorage.getItem(name);
      }
      return items;
    },

    setItem: function(name, description) {
      localStorage.setItem(String(name), String(description));
    },

    deleteItem: function(name) {
      localStorage.removeItem(String(name));
    }
  }

  return {
    add: function() {
      if (UIElements.taskName.value !== "") {
        const task = `
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 pt-2 pb-4">
            <div status="" class="card">
              <div class="card-body">
                <h5 class="card-title">${UIElements.taskName.value}</h5>
                <p class="card-text">${UIElements.taskText.value}</p>
                <button type="button" class="delete btn btn btn-outline-danger">Delete</button>
              </div>  
            </div>
          </div>
        `;
      UIElements.taskList.innerHTML += task;
      storage.setItem(UIElements.taskName.value, UIElements.taskText.value)
      clearFields();
      } else {
        warning(UIElements.taskName);
      }
    },

    delete: function(e) {
      if (e.target.classList.contains("delete")) {
        removeCard(e.target);

        function removeCard(elem) {        
          if(elem.classList.contains("card")) {
            const name = elem.querySelector(".card-title").textContent;
            storage.deleteItem(name);
            return elem.parentElement.remove();
          }
          removeCard(elem.parentElement); 
        }
      }
    },

    getUI: function() {
      return UIElements
    },

    renderElements: function() {
      const items = storage.getItems();

      for(name in items) {
        const task = `
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 pt-2 pb-4">
            <div status="" class="card">
              <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${items[name]}</p>
                <button type="button" class="delete btn btn btn-outline-danger">Delete</button>
              </div>  
            </div>
          </div>
        `;
        UIElements.taskList.innerHTML += task;
      }
    }
  }
})()

toDo.getUI().addBtn.addEventListener('click', toDo.add);
toDo.getUI().taskList.addEventListener('click', toDo.delete);

window.addEventListener("load", function() {
  toDo.renderElements();
});






