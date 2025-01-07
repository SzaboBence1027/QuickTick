document.addEventListener('DOMContentLoaded', function() {
    fetchTasks();
});

function fetchTasks() {
    fetch('../Assets/php/tasks.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayTasks(data.tasks);
            } else {
                console.error('Failed to fetch tasks:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}

function displayTasks(tasks) {
    const container = document.getElementById('tasks-container');
    if (!container) {
        console.error('No element with id "tasks-container" found.');
        return;
    }
    container.innerHTML = '';

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.innerHTML = `
            <h3>${task.t_name}</h3>
            <p>${task.description}</p>
            <p>Fontosság: ${task.priority}</p>
            <p>Előrehaladás: ${task.progresson}</p>
            <p>Határidő: ${task.deadline}</p>
        `;
        container.appendChild(taskDiv);
    });
}
