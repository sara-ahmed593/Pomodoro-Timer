// Task state management
import { sessionStatus, message, taskInput, taskCounter, noteInput, summary, pomos, finishTime, remainingHours, tasksList, addNoteBtn } from "./dom.js";

export let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
export let activeTask = null;



export function resetTaskForm() {
    taskInput.value = "";
    noteInput.value = "";
    taskCounter.value = 1;
    addNoteBtn.classList.remove("hidden");
    noteInput.classList.add("hidden");
}



function showCompletedAllTasks() {
    if (tasks.length > 0 && tasks.every(task => task.completed)) {
        message.classList.add("show-animate");
    }
}

// Create and display a task card
export function renderTask(taskData) {
    const task = document.createElement("div");
    task.className = "task-item";

    const header = document.createElement("div");
    header.className = "task-header";

    const left = document.createElement("div");
    left.className = "task-left";

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-circle-check task-check-icon";

    const title = document.createElement("h3");
    title.className = "task-title";
    title.textContent = taskData.title;

    left.append(icon, title);

    const right = document.createElement("div");
    right.className = "task-right";

    const counter = document.createElement("span");
    counter.className = "task-counter-text";
    counter.textContent = `0/${taskData.count}`;

    const menuBtn = document.createElement("button");
    menuBtn.className = "icon-btn";
    menuBtn.innerHTML = `<i class="fa-solid fa-ellipsis-vertical"></i>`;

    right.append(counter, menuBtn);
    header.append(left, right);
    task.append(header);

    if (taskData.completed) {
        task.classList.add("completed");
    }

    if (taskData.note !== "") {
        const note = document.createElement("div");
        note.className = "task-note";
        note.textContent = taskData.note;
        task.append(note);
    }

    tasksList.append(task);

    if (tasksList.children.length === 1) {
        task.classList.add("active");
        activeTask = task;
        sessionStatus.textContent = taskData.title;
    }
    handleTaskClick(task, icon, taskData);
}

function handleTaskClick(task, icon, taskData) {
    // active task
    task.addEventListener("click", () => {
        if (activeTask) {
            activeTask.classList.remove("active");
        }
        task.classList.add("active");
        activeTask = task;
        sessionStatus.textContent = taskData.title;
    });

    // Check completed toggle
    icon.addEventListener("click", (e) => {
        e.stopPropagation();
        task.classList.toggle("completed");
        taskData.completed = task.classList.contains("completed");

        if (taskData.completed) {
            tasksList.append(task);
        }

        showCompletedAllTasks();
        updateSummary();
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
}

// details summary 

export function updateSummary() {
    let countTasks = 0;

    if (tasks.length > 0) {
        summary.classList.remove("hidden");


        tasks.forEach((task) => {
            if (!task.completed) {
                countTasks += Number(task.count);
            }
        });

        pomos.textContent = countTasks;


        const remaining = tasks.filter(task => !task.completed).length;
        const hourPerTask = 0.4;

        remainingHours.textContent = "(" + (remaining * hourPerTask).toFixed(1) + "h" + ")"


        if (tasks.length > 0 && tasks.every(task => task.completed)) {
            finishTime.textContent = new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });
        }

        const finishDate = new Date(
            Date.now() + remaining * 0.4 * 60 * 60 * 1000
        );

        finishTime.textContent = finishDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });



    }
    else {
        summary.classList.add("hidden")

    }
}

export function createTask(taskInput, noteInput, taskCounter
) {
    const newTask = {
        title: taskInput.value,
        note: noteInput.value,
        count: taskCounter.value,
        completed: false
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTask(newTask);
    updateSummary();
}
