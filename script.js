/**
 * Created by pawan on 7/1/17.
 */

var todoList = localStorage.getItem("toDos");

if (!todoList) {
    todoList = [];
    localStorage.setItem("toDos", JSON.stringify(todoList));
}

$(function () {
    refreshList();

    var todoBox = $("#todoBox");
    var addBtn = $("#addBtn");
    var clearBtn = $("#clearBtn");

    addBtn.click(function () {
        addNewTodo(todoBox.val());
        refreshList();
    });

    clearBtn.click(function () {
        clearFnc();
        refreshList();
    });

    var list = $('#todoList');
    list.on("click", "li", setDone);
    list.on("click", ".xBtn", cross);
    list.disableSelection();
});

function refreshList() {

    todoList = JSON.parse(localStorage.getItem("toDos"));
    var listData = "";

    for (var j = 0; j < todoList.length; j++) {
        var todo = todoList[j];
        listData += "<li class='"+ (todo.done? "done": "") +"'>" +
            "<input type='checkbox' id='" + j + "'" + (todo.done ? " checked" : "") + ">" +
            "<span style='text-decoration : " + (todo.done ? "line-through" : "") + "'>" + todo.task + "</span>" +
            "<button type = 'button' class='xBtn'>x</button></li>"
    }

    var list = $("#todoList");
    list.html(listData);

}

function addNewTodo(newTodo) {
    todoList.push({
        task: newTodo,
        done: false
    });
    localStorage.setItem("toDos", JSON.stringify(todoList));
}

function clearFnc() {
    todoList = todoList.filter(function (item) {
        if (!item.done) {
            return item;
        }
    });
    localStorage.setItem("toDos", JSON.stringify(todoList));
}

function cross() {
    console.log("inside cross fn");
    var chkBox = $($(this).parent().children()[0]);
    todoList.splice(chkBox.attr("id"), 1);
    localStorage.setItem("toDos", JSON.stringify(todoList));
    refreshList();
}

function setDone(ev) {
    if(ev.target.className == 'xBtn'){
        return;
    }

    console.log("inside set Done");
    var li = $(this);
    var checkbox = $(li.children()[0]);

    if(li.hasClass('done')){
        checkbox.prop('checked', false);
    }
    else{
        checkbox.prop('checked', true);
    }

    todoList[checkbox.attr("id")].done = checkbox.prop('checked');
    localStorage.setItem("toDos", JSON.stringify(todoList));

    li.toggleClass('done');
    strikeToggle(checkbox.next());
}

function strikeToggle(el) {
    if (el.css("textDecoration") == "line-through") {
        el.css("textDecoration", "");
    }
    else {
        el.css("textDecoration", "line-through");
    }
}