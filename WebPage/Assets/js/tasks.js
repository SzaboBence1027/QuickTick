document.getElementById('deadline').addEventListener('change', function() {
    const selectedDate = this.value;
    if (selectedDate) {
        fetchTasks(selectedDate);
    } else {
        fetchTasks(getCurrentDate());
    }
});

document.getElementById('styledSelect1').addEventListener('change', function() {
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
    if (labelId&& labelId !== '1') {
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
        taskDiv.id = `task-${task.id}`;
    
        // Replace the original task HTML with the new ag-courses_item structure
        const coursesItemDiv = document.createElement('div');
        coursesItemDiv.className = 'ag-courses_item';
    
        // Apply black background here
        coursesItemDiv.style.backgroundColor = 'black';  // Keep the black background for the entire task item
    
        coursesItemDiv.innerHTML = `
            <a href="#" class="ag-courses-item_link">
                <div class="ag-courses-item_bg"></div> <!-- New background -->
                <div class="ag-courses-item_title">
                    ${task.t_name} <!-- Display task name -->
                </div>
                <div class="ag-courses-item_date-box">
                    Start:
                    <span class="ag-courses-item_date">
                        ${task.deadline} <!-- Display task deadline -->
                    </span>
                </div>
            </a>
        `;
    
        // Append the task name, deadline, and background to the taskDiv
        taskDiv.appendChild(coursesItemDiv);
    
        // Add task-specific details below the ag-courses_item structure inside the same div
        const taskDetailsDiv = document.createElement('div');
        taskDetailsDiv.className = 'task-details';
    
        taskDetailsDiv.innerHTML = `
            <p>Description: ${task.description}</p>
            <p>Priority: ${task.priority}</p>
            <p>Progress: ${task.progresson}</p>
            <p>Label: ${task.label_name}</p>
            <!-- Edit link with task ID -->
            <a href="edit_task.html?task_id=${task.id}" class="edit-task-link">
                Edit Task
            </a>
            <!-- Delete button -->
            <button onclick="deleteTask(${task.id})" class="delete-task-button">
                Delete Task
            </button>
        `;
    
        // Hide the task details initially
        taskDetailsDiv.style.display = 'none';
    
        // Append the task details to the coursesItemDiv (which now has the black background)
        coursesItemDiv.appendChild(taskDetailsDiv);
    
        // Add click event to toggle the visibility of task details
        coursesItemDiv.addEventListener('click', () => {
            const isVisible = taskDetailsDiv.style.display === 'block';
            taskDetailsDiv.style.display = isVisible ? 'none' : 'block';  // Toggle visibility
        });
    
        // Finally, append the updated taskDiv (now with the new background and details) to the container
        container.appendChild(taskDiv);
    });
    
    

    /*tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task`;
        taskDiv.style.backgroundColor =task.label_color; // Add label color
        taskDiv.id = `task-${task.id}`;
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
            <a href="edit_task.html?task_id=${task.id}"><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="#000000"/>
            </svg></a> <!-- Edit link with task ID -->
            
            <button onclick="deleteTask(${task.id})">Delete</button>
            
        `;

        taskDiv.appendChild(taskHeader);
        taskDiv.appendChild(taskDetails);
        container.appendChild(taskDiv);
    });*/
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
                const labelFilter = document.getElementById('styledSelect1');
                data.labels.forEach(label => {
                    
                        const option = document.createElement('option');
                        option.value = label.id;
                        option.textContent = label.l_name;
                        labelFilter.appendChild(option);
                    
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


function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }

    fetch(`../Assets/php/delete_task.php?task_id=${taskId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response data:', data); // Debugging line
        if (data.success) {
            alert('Task deleted successfully.');
            // Remove the task from the DOM
            const taskElement = document.getElementById(`task-${taskId}`);
            if (taskElement) {
                taskElement.remove();
            } else {
                console.error(`Task element with ID task-${taskId} not found.`);
            }
        } else {
            alert('Failed to delete task: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while deleting the task.');
    });
}