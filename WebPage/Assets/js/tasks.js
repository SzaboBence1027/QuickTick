document.getElementById('deadline').addEventListener('change', function() {
    const selectedDate = this.value;
    if (selectedDate) {
        fetchTasks(selectedDate);
    } else {
        fetchTasks(getCurrentDate());
    }
});
window.onload = function() {
    fetchTasks(getCurrentDate());
};

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function fetchTasks(date) {
    console.log(`Fetching tasks for date: ${date}`); // Debugging line
    fetch(`../Assets/php/tasks.php?date=${date}`)
        .then(response => response.json())
        .then(data => {
            console.log('Response data:', data); // Debugging line
            if (data.success) {
                if (data.tasks) {
                    displayTasks(data.tasks);
                } else {
                    displayMessage(data.message);
                }
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
        
        const taskHeader = document.createElement('div');
        taskHeader.className = 'task-header';
        taskHeader.style.cursor = 'pointer';
        
        const taskName = document.createElement('h3');
        taskName.textContent = task.t_name;
        
        const arrow = document.createElement('span');
        arrow.className = 'arrow';
        arrow.innerHTML = '&#9654;'; // Right arrow

        taskHeader.appendChild(taskName);
        taskHeader.appendChild(arrow);
        taskHeader.addEventListener('click', function() {
            taskDetails.classList.toggle('hidden');
            arrow.innerHTML = taskDetails.classList.contains('hidden') ? '&#9654;' : '&#9660;'; // Toggle between right and down arrow
        });

        const taskDetails = document.createElement('div');
        taskDetails.className = 'task-details hidden';
        taskDetails.innerHTML = `
            <p>${task.description}</p>
            <p>Fontosság: ${task.priority}</p>
            <p>Előrehaladás: ${task.progresson}</p>
            <p>Határidő: ${task.deadline}</p>
        `;

        taskDiv.appendChild(taskHeader);
        taskDiv.appendChild(taskDetails);
        container.appendChild(taskDiv);
    });
}

function displayMessage(message) {
    const container = document.getElementById('tasks-container');
    if (!container) {
        console.error('No element with id "tasks-container" found.');
        return;
    }
    container.innerHTML = `<p>${message}</p>`;
}

// CSS to hide the task details initially
const style = document.createElement('style');
style.innerHTML = `
    .task-details.hidden {
        display: none;
    }
    .task-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .arrow {
        font-size: 1.2em;
        margin-left: 10px;
    }
`;
document.head.appendChild(style);