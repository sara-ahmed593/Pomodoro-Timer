import {
    tasks,
    renderTask,
    updateSummary,
    resetTaskForm,
    createTask
} from './Task.js';

import {
    resetTimer
} from './Timer.js';

import { addTaskBtn, addTaskContainer, cancelBtn, count_up, count_down, taskCounter, addProject, addNoteBtn, noteInput, saveBtn, taskInput, tasksList, sessionStatus, message, clearTaskBtn, celebration } from './dom.js';


// Celebration handler
function showCelebration() {
    if (!celebration) return;
    celebration.classList.remove("hidden");
    celebration.classList.add("show");



}


// Load saved tasks

tasks.forEach(task => {
    renderTask(task);

});
updateSummary();

// Show the Add Task form
addTaskBtn.addEventListener("click", () => {
    addTaskBtn.classList.add("hidden");
    addTaskContainer.classList.remove("hidden");
});

// Cancel Forms
cancelBtn.addEventListener("click", () => {
    resetTaskForm();
    addTaskBtn.classList.remove("hidden");
    addTaskContainer.classList.add("hidden");
});

// Decrease estimated Pomodoros 
count_down.addEventListener("click", () => {
    if (Number(taskCounter.value) > 1) {
        taskCounter.value = Number(taskCounter.value) - 1;
    }
});
// Increase estimated Pomodoros 

count_up.addEventListener("click", () => {
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

    createTask(taskInput, noteInput, taskCounter);
    resetTaskForm();
});

// clear array reset action
clearTaskBtn.addEventListener("click", () => {
    showCelebration();
    tasks.length = 0;
    localStorage.removeItem("tasks");
    message.classList.remove("show-animate");
    updateSummary();
    tasksList.innerHTML = "";
    sessionStatus.textContent = "Time to focus!";
});
