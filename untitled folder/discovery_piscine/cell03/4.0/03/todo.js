// set cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// get cookie
function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

// load todos
function loadTodos() {
  let data = getCookie("todos");
  if (data) {
    let todos = JSON.parse(data);
    todos.forEach(text => addTodo(text, false));
  }
}

// save todos
function saveTodos() {
  let todos = [];
  $(".todo").each(function() {
    todos.push($(this).text());
  });
  setCookie("todos", JSON.stringify(todos), 7);
}

// add todo
function addTodo(text, save = true) {
  const $div = $("<div>").addClass("todo").text(text);

  $div.on("click", function() {
    if (confirm("Do you really want to delete this TO DO?")) {
      $div.remove();
      saveTodos();
    }
  });

  $("#ft_list").prepend($div);

  if (save) saveTodos();
}

// new button
$("#newBtn").on("click", function() {
  let task = prompt("Enter your new TO DO:");
  if (task && task.trim() !== "") {
    addTodo(task.trim());
  }
});

// load on start
$(document).ready(loadTodos);
