document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});

function addTask(taskText) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');

    taskItem.innerHTML = `
        ${taskText}
        <button class="delete">حذف</button>
    `;

    taskList.appendChild(taskItem);

    taskItem.querySelector('.delete').addEventListener('click', function() {
        taskItem.remove();
    });

    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = [];

    taskList.querySelectorAll('li').forEach(function(taskItem) {
        tasks.push(taskItem.firstChild.textContent.trim());
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(function(taskText) {
        addTask(taskText);
    });
}

loadTasks();
