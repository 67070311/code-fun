// ฟังก์ชัน set cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// ฟังก์ชัน get cookie
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

// โหลด todo จาก cookie
function loadTodos() {
  let data = getCookie("todos");
  if (data) {
    let todos = JSON.parse(data);
    todos.forEach(text => addTodo(text, false));
  }
}

// บันทึก todo ลง cookie
function saveTodos() {
  let todos = [];
  document.querySelectorAll(".todo").forEach(el => {
    todos.push(el.textContent);
  });
  setCookie("todos", JSON.stringify(todos), 7);
}

// เพิ่ม todo ใหม่
function addTodo(text, save = true) {
  let ft_list = document.getElementById("ft_list");
  let div = document.createElement("div");
  div.className = "todo";
  div.textContent = text;

  div.addEventListener("click", function() {
    if (confirm("Do you really want to delete this TO DO?")) {
      div.remove();
      saveTodos();
    }
  });

  // แทรกด้านบนสุด
  ft_list.insertBefore(div, ft_list.firstChild);

  if (save) saveTodos();
}

// เมื่อกดปุ่ม New
document.getElementById("newBtn").addEventListener("click", function() {
  let task = prompt("Enter your new TO DO:");
  if (task && task.trim() !== "") {
    addTodo(task.trim());
  }
});

// โหลดตอนเริ่ม
window.onload = loadTodos;
