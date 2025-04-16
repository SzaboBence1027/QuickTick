document.addEventListener('DOMContentLoaded', function () {
    fetchPastTasks();
});

function fetchPastTasks() {
    const url = '../Assets/php/all_tasks.php?type=past'; // Adjust the URL as neede

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayPastTasks(data.events);
                console.log('Past tasks fetched successfully:', data.events);
            } else {
                displayMessage(data.message || 'Failed to fetch past tasks.');
            }
        })
        .catch(error => {
            console.error('Error fetching past tasks:', error);
            displayMessage('An error occurred while fetching past tasks.');
        });
}

function displayPastTasks(tasksByDate) {
    const container = document.getElementById('tasks-container');
    container.innerHTML = ''; // Clear the container

    if (Object.keys(tasksByDate).length === 0) {
        displayMessage('No past tasks found.');
       
        return;
    }

    Object.keys(tasksByDate).forEach(date => {
        // Create a date header
        const dateHeader = document.createElement('h3');
        dateHeader.textContent = `Date: ${date}`;
        dateHeader.className = 'date-header';
        container.appendChild(dateHeader);

        // Create a list for tasks under this date
        const taskList = document.createElement('ul');
        taskList.className = 'task-list';

        tasksByDate[date].forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.textContent = task; // Task name and label
            taskList.appendChild(taskItem);
        });

        container.appendChild(taskList);
    });
}

function displayMessage(message) {
    const container = document.getElementById('tasks-container');
    container.innerHTML = `<p>${message}</p>`;
}