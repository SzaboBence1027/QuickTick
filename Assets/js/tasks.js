document.getElementById('deadline').addEventListener('change', function() {
    const selectedDate = this.value;
    if (selectedDate) {
        fetchTasks(selectedDate);
    } else {
        fetchTasks(getCurrentDate());
    }
});

document.getElementById('label-filter').addEventListener('change', function() {
    const selectedDate = document.getElementById('deadline').value;
    const selectedLabel = this.value;
    fetchTasks(selectedDate, selectedLabel);
});

window.onload = function() {
    setDefaultDate();
    fetchTasks(getCurrentDate());
    loadLabels();
};

function setDefaultDate() {
    const dateInput = document.getElementById('deadline');
    if (dateInput) {
        dateInput.value = getCurrentDate();
    }
}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function fetchTasks(date, labelId = null) {
    let url = `../Assets/php/tasks.php?date=${date}`;
    if (labelId) {
        url += `&label_id=${labelId}`;
    }
    console.log(`Fetching tasks for date: ${date}`); // Debugging line
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Response data:', data); // Debugging line
            if (data.success) {
                if (data.tasks && data.tasks.length > 0) {
                    displayTasks(data.tasks);
                } else {
                    displayMessage(data.message || 'No tasks found for this date.');
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
        taskDiv.style.borderLeft = `5px solid ${task.label_color}`; // Add label color

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
            <p>Label: ${task.label_name}</p>
            <a href="edit_task.html?task_id=${task.id}">Edit Task</a> <!-- Edit link with task ID -->
            
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

function loadLabels() {
    fetch('../Assets/php/labels.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const labelFilter = document.getElementById('label-filter');
                data.labels.forEach(label => {
                    if (label.l_name !='No Label') { // Exclude "No Label" option
                        const option = document.createElement('option');
                        option.value = label.id;
                        option.textContent = label.l_name;
                        labelFilter.appendChild(option);
                    }
                });
            } else {
                console.error('Failed to load labels:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}

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