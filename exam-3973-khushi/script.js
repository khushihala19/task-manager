let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskName = document.getElementById('task-name').value;
    const taskDescription = document.getElementById('task-description').value;

    const taskId = Date.now();

    const task = {
        id: taskId,
        name: taskName,
        description: taskDescription
    };

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskForm.reset();

    displayTasks();
});

function displayTasks() {
    taskList.innerHTML = '';

    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${task.name}</strong>: ${task.description}
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function deleteTask(taskId) {
    tasks = tasks.filter(function(task) {
        return task.id !== taskId;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

    displayTasks();
}

function editTask(taskId) {
    const task = tasks.find(function(task) {
        return task.id === taskId;
    });

    document.getElementById('task-name').value = task.name;
    document.getElementById('task-description').value = task.description;

    tasks = tasks.filter(function(task) {
        return task.id !== taskId;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

    displayTasks();
}
displayTasks();
