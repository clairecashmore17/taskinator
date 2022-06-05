var buttonEl = document.querySelector("#save-task");
console.log(buttonEl);

var tasksToDoEl = document.querySelector("#tasks-to-do");
console.log(tasksToDoEl);

function createTaskHandler() {
    var taskItemEl = document.createElement("li");
    taskItemEl.textContent = "hello";
    tasksToDoEl.appendChild(taskItemEl);
    taskItemEl.className = "task-item";
}
buttonEl.addEventListener("click",  createTaskHandler);
