// variable for our event listener in main
var pageContentEl = document.querySelector("#page-content");

//counter for keeping track of tasks created
var taskIdCounter = 0;

var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var tasks = [];

var formEl = document.querySelector("#task-form"); 


function taskFormHandler(event) {
    event.preventDefault(); 

    // Retrieving the text value created by the user
    var taskNameInput = document.querySelector("input[name ='task-name']").value;
    //Retrieving the type of task the user chose
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    //check if input values are empty
    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    formEl.reset();

    var isEdit = formEl.hasAttribute("data-task-id");
    
   // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do"
    };



    createTaskEl(taskDataObj);
    }
}; 
//function to complete the edited task
function completeEditTask(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)){
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
    saveTasks();
  };

function createTaskEl(taskDataObj){
    
    //Creating the list item and fiving class name
    var listItemEl = document.createElement("li"); 
    listItemEl.className = "task-item"; 

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //create a div to holde task info and add it to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";

    //add html content to the div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    // listItemEl.textContent = taskNameInput; 
    listItemEl.appendChild(taskInfoEl);



    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);
    //add to the parent
    tasksToDoEl.appendChild(listItemEl); 


    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);
    //increase our task counter for next task to come in
    taskIdCounter++;
    saveTasks();
};

//function to create task actions
function createTaskActions(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create teh edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id",taskId);

    //adding the button to the parent action container
    actionContainerEl.appendChild(editButtonEl);

    //create the delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //select statements
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    //array for the options for loop
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i =0; i <statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    
    return actionContainerEl;
};
var taskStatusChangeHandler = function(event) {
    
  
    // find task list item based on event.target's data-task-id attribute
    var taskId = event.target.getAttribute("data-task-id");
  
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
    // convert value to lower case
    var statusValue = event.target.value.toLowerCase();
  
    if (statusValue === "to do") {
      tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
      tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
      tasksCompletedEl.appendChild(taskSelected);
    }

    //update task's in tasks array
    for(var i =0; i <tasks.length; i++) {
        if(tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }

    saveTasks();
  };


 
//Function to delete a task
function deleteTask(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    //create new array to hold updated list of tasks
    var updatedTaskArr = [];

    //loop through current tasks
    for (var i =0; i < tasks.length; i++) {
        //if tasks[i].id doesnt match the value of taskID, let's keep that task and push it into the new array
        if(tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    //reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    saveTasks();
};
//Function to edit a task
function editTask(taskId){
    console.log("editing task #" + taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    document.querySelector("input[name='task-name']").value = taskName;

    //find task type
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("select[name='task-type']").value = taskType;

    //updating button to let users know we are editing
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
};

// Function for the button handler
function taskButtonHandler(event) {
    console.log(event.target);
    //get target element from event
    var targetEl = event.target;
    if(event.target.matches(".delete-btn")){
        //get elements data-task id
        var taskId = targetEl.getAttribute("data-task-id");
       deleteTask(taskId);
    }
    else if(event.target.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
};

//SAVING TO LOCAL STORAGE
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
} ;

function loadTasks() {
    //retirieving the tasks that are saved in local storage and placing them in a new variable
    var savedTasks = localStorage.getItem("tasks");

    //check and see if they are null savedTasks
    if(!saveTasks){
        return false;
    }
    console.log("Saved Tasks have been found!");
    //otherwise we will load up the saved tasks
    //Now we have to move the savedTasks back into an array
    savedTasks = JSON.parse(savedTasks);

    //loop through our array in order to create and load them to the page
    for( var i = 0; i < savedTasks.length; i++) {
        //ysing the createTaskEl in order to recreate the loaded task info onto the page
        createTaskEl(savedTasks[i]);
    }
};

formEl.addEventListener("submit", taskFormHandler);
//event listener for delete or edit buttons
pageContentEl.addEventListener("click", taskButtonHandler);
    
pageContentEl.addEventListener("change", taskStatusChangeHandler);
loadTasks();
      