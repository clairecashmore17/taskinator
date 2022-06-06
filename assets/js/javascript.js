
var formEl = document.querySelector("#task-form"); 
var tasksToDoEl = document.querySelector("#tasks-to-do");

function createTaskHandler(event) {
    event.preventDefault(); 

    // Retrieving the text value created by the user
    var taskNameInput = document.querySelector("input[name ='task-name']").value;
    //Retrieving the type of task the user chose
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    //Creating the list item and fiving class name
    var listItemEl = document.createElement("li"); 
    listItemEl.className = "task-item"; 

    //create a div to holde task info and add it to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";

    //add html content to the div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    // listItemEl.textContent = taskNameInput; 
    listItemEl.appendChild(taskInfoEl);

    //add to the parent
    tasksToDoEl.appendChild(listItemEl); 
    }; 

    formEl.addEventListener("submit", createTaskHandler);
 
    
 
      