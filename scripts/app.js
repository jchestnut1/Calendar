var importantIcon = "fas fa-user";
var nonImportantIcon = "fas fa-user-slash";
var isImportant = false;
var hideInformation = false;

function saveTask(){
    
let title = $("#txtTitle").val();
let description = $("#txtDescription").val();
let dueDate = $("#txtDueDate").val();
let tag = $("#txtTag").val();
let category = $("#txtCategory").val();
let color = $("#txtColor").val();

let task = new Task(title,description,tag,category,color,dueDate);

$.ajax({
    type: "POST",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/",
    data: JSON.stringify(task),
    contentType: "application/json",
    success: function(response) {
        displayTask(task);
        clearForm();
    },
    error: function(details) {
        console.log("Save Failed", details);
    },
})
}

function clearForm(){
    $("#txtTitle").val("");
    $("#txtDescription").val("");
    $("#txtDueDate").val("");
    $("#txtColor").val("");
    $("#txtTag").val("");
    $("#txtColor").val("");
}

function displayTask(task){
    
    let syntax = `<div class="task"> 
        
    <div class="name">
        <h3>${task.title}</h3>
        <p>${task.description}</p>
    </div>

    <label class="date">${task.dueDate}</label>

    <div class="extra">
        <label>${task.category}</label>
        <label>${task.tag}</label>
    </div>

    </div>`;

    $("#taskList").append(syntax);
}

function changeIcon(){
    if(isImportant == false){
        $("#important").removeClass(nonImportantIcon).addClass(importantIcon);
        isImportant = true;
    }else{
        $("#important").removeClass(importantIcon).addClass(nonImportantIcon);
        isImportant = false;
    }  
}

function toggleSection(){
    if(hideInformation == false){
        $(".info-table").hide();
        hideInformation = true;
    }else{
        $(".info-table").show();
        hideInformation = false;
    }
    
}

function fetchTask(){
    $.ajax({
        type: "GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        success: function(response){
            console.log("Fetch response",response);
            let allTasks = JSON.parse(response);
            for(let i=0; i<allTasks.length; i++){
                let task = allTasks[i];
                if(task.name == "Jay"){
                displayTask(task);
                }
            }
        },
        eror: function(details){
            console.log("Error",details);
        }
    });
}

function init() {
    console.log("Task Manager");
    fetchTasks();

    $("#btnSave").click(saveTask);
    $("#important").click(changeIcon);
    $("#hide-info").click(toggleSection);
}


window.onload = init;