var importantIcon = "fas fa-user";
var nonImportantIcon = "fas fa-user-slash";
var isImportant = false;
var hideInformation = false;

function saveTask(){
    console.log("Button Clicked");
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

function init() {
    console.log("Task Manager");

    $("#btnSave").click(saveTask);
    $("#important").click(changeIcon);
    $("#hide-info").click(toggleSection);
}


window.onload = init;