var listbox = document.getElementById("list");

function gettasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function addtask() {
  var input = document.getElementById("task-input").value.trim();
  if (input !== "") {
    let tasks = gettasks();
    tasks.push({ title: input, isdone: false });
    savetask(tasks);
    rendertasks();
  } else {
    alert("please enter the task");
  }
}

function savetask(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function rendertasks() {
  document.getElementById("task-input").value = "";
  let tasks = gettasks();
  listbox.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let lielement = document.createElement("li");
    lielement.className = "task-item";

    if (tasks[i].isdone) {
      lielement.classList.add("checked");
    }

    let spanelement = document.createElement("span");
    spanelement.className = "task-text";
    let textcontent = document.createTextNode(tasks[i].title);
    spanelement.appendChild(textcontent);
    lielement.appendChild(spanelement);

    let divelement = document.createElement("div");
    divelement.className = "icons";

    let imgclose = document.createElement("img");
    imgclose.className = "close-icon";
    imgclose.src = "images/close.png";
    imgclose.alt = "close";
    imgclose.onclick = () => close(i);
    divelement.appendChild(imgclose);

    let imgupdat = document.createElement("img");
    imgupdat.className = "update-icon";
    imgupdat.src = "images/update.png";
    imgupdat.alt = "update";
    imgupdat.onclick = () => update(i);
    divelement.appendChild(imgupdat);

    lielement.appendChild(divelement);

    // ✅ هذي تكفي للتأشير
    lielement.onclick = () => check(i);

    listbox.appendChild(lielement);
  }
}

function close(index) {
  let tasks = gettasks();
  tasks.splice(index, 1);
  savetask(tasks);
  rendertasks();
}

function update(index) {
  let tasks = gettasks();
  let newTask = prompt("أدخل التعديل:", tasks[index].title);
  if (newTask !== null && newTask.trim() !== "") {
    tasks[index].title = newTask;
    savetask(tasks);
    rendertasks();
  }
}

function check(index) {
  let tasks = gettasks();
  tasks[index].isdone = !tasks[index].isdone;
  savetask(tasks);
  rendertasks();
}

document.getElementById("task-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addtask();
  }
});
window.onload = rendertasks;
