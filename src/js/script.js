import {
    tasks,
    displayTask,
    updateSummary,
    resetTaskForm,
} from './Task.js';

import {
    resetTimer
} from './Timer.js';

const addtask = document.querySelector(".addtask-btn");
const addtaskContainer = document.querySelector(".add-container");
const cancelBtn = document.querySelector(".btn-cancel");
const countup = document.querySelector(".countup");
const countdown = document.querySelector(".countdown");
const taskCounter = document.querySelector(".task-counter");
const addProject = document.querySelector(".addproject");
const addNoteBtn = document.querySelector(".addnote");
const noteInput = document.querySelector(".note-input");
const saveBtn = document.querySelector(".btn-save");
const taskInput = document.querySelector(".task-input");
const tasksList = document.querySelector(".tasks-list");
const sessionStatus = document.querySelector(".session-status");
const message = document.querySelector(".message-card");
const clearBtn = document.querySelector(".clear-btn");
const celebration = document.getElementById("celebration");


// Celebration handler
function showCelebration() {
    if (!celebration) return;
    celebration.classList.remove("hidden");
    setTimeout(() => {
        celebration.classList.add("hidden");

    }, 3000);
}


// Load saved tasks

tasks.forEach(task => {
    displayTask(task);
    updateSummary();
});


// Show the Add Task form
addtask.addEventListener("click", () => {
    addtask.classList.add("hidden");
    addtaskContainer.classList.remove("hidden");
});

// Cancel Forms
cancelBtn.addEventListener("click", () => {
    resetTaskForm();
    addtask.classList.remove("hidden");
    addtaskContainer.classList.add("hidden");
});

// Decrease estimated Pomodoros 
countdown.addEventListener("click", () => {
    if (Number(taskCounter.value) > 1) {
        taskCounter.value = Number(taskCounter.value) - 1;
    }
});
// Increase estimated Pomodoros 

countup.addEventListener("click", () => {
    taskCounter.value = Number(taskCounter.value) + 1;
});

// Premium Prompt Modal Hook
addProject.addEventListener("click", () => {
    alert("This feature is limited to premium users only.");
});

// Show the note textarea
addNoteBtn.addEventListener("click", () => {
    addNoteBtn.classList.add("hidden");

    noteInput.classList.remove("hidden");
    noteInput.focus();
});

//save button to add a new task
saveBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") return;

    const newTask = {
        title: taskInput.value,
        note: noteInput.value,
        count: taskCounter.value,
        completed: false
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTask(newTask);
    updateSummary();
    resetTaskForm();
});

// clear array reset action
clearBtn.addEventListener("click", () => {
    showCelebration();
    tasks.length = 0;
    localStorage.removeItem("tasks");
    message.classList.remove("show-animate");
    updateSummary();
    tasksList.innerHTML = "";
    sessionStatus.textContent = "Time to focus!";
});
