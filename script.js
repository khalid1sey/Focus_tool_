let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let time = 25 * 60;
let timerInterval = null;

const taskList = document.getElementById("taskList");
const timeDisplay = document.getElementById("time");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span style="text-decoration:${task.done ? 'line-through' : 'none'}">
        ${task.text}
      </span>
      <button onclick="toggleTask(${index})">✓</button>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value.trim() === "") return;
  tasks.push({ text: input.value, done: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    time--;
    updateTime();
    if (time <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Focus session complete!");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  time = 25 * 60;
  updateTime();
}

function updateTime() {
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");
  timeDisplay.textContent = `${minutes}:${seconds}`;
}

renderTasks();
updateTime();
