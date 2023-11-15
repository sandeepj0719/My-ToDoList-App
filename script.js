document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    // Load tasks from local storage on page load
    loadTasksFromLocalStorage();

    addTaskButton.addEventListener("click", addTask);

    function addTask() {
        const taskText = taskInput.value.trim();

        if (!taskText) {
            alert("Please enter a task!");
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            createdAt: new Date().toLocaleString(),
        };

        appendTaskToDOM(task);
        saveTaskToLocalStorage(task);
        taskInput.value = "";
    }

    function removeTask(taskId) {
        const taskElement = document.getElementById(taskId);
        taskList.removeChild(taskElement);
        removeTaskFromLocalStorage(taskId);
    }

    function appendTaskToDOM(task) {
        const li = document.createElement("li");
        li.id = task.id;
        li.innerHTML = `
            <span>${task.text} - ${task.createdAt}</span>
            <button class="remove-btn" onclick="removeTask(${task.id})">Remove</button>
        `;
        taskList.appendChild(li);
    }

    function saveTaskToLocalStorage(task) {
        const tasks = getTasksFromLocalStorage();
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function removeTaskFromLocalStorage(taskId) {
        const tasks = getTasksFromLocalStorage().filter(task => task.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function getTasksFromLocalStorage() {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    }

    function loadTasksFromLocalStorage() {
        const tasks = getTasksFromLocalStorage();
        tasks.forEach(task => appendTaskToDOM(task));
    }
});
