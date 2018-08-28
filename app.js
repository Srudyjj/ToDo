// window.addEventListener("load", function(event) {
//     console.log("All resources finished loading!");
// });

(function() {
  const taskTitleInput = document.getElementById('task_title');
  const taskBodyInput = document.getElementById("task_body");
  const taskList = document.getElementById("taskList");
  const addBtn = document.getElementById('addBtn');

  addBtn.addEventListener('click', (e) => {
    const taskTitleText = taskTitleInput.value
    const taskBodyText = taskBodyInput.value;
    console.log(taskTitleText, taskBodyText);

    let task = `
      <div class="card col-md-4">
        <div class="card-body">
          <h5 class="card-title">${taskTitleText}</h5>
          <p class="card-text">${taskBodyText}</p>
          <button type="button" class="btn btn-outline-success"> <i class="far fa-check-square"></i> Check</button>
          <button type="button" class="btn btn-outline-danger float-right ml-2 "> <i class="far fa-trash-alt"></i></button>
          <button type="button" class="btn btn-outline-warning float-right"><i class="far fa-edit"></i></button>
        </div>
      </div>
    `;

    taskList.innerHTML += task;

    e.preventDefault();
  });   
} 

)();


