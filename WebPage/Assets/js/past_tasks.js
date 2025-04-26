document.addEventListener('DOMContentLoaded', function () {
    PastTaskDeleteANdMArkAsDone();
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
function PastTaskDeleteANdMArkAsDone() {
    const url = '../Assets/php/change_progress.php'; // Adjust the URL as needed
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
               console.log('Task marked expired and deleted');
            } else {
                console.log(data.message || 'Failed to mark task as expired and delete.');
            }
        })
        .catch(error => {
            console.error('Error fetching past tasks:', error);
            displayMessage('An error occurred while fetching past tasks.');
        });

}

function displayPastTasks(tasksByDate) {
    const parentContainer = document.getElementById('tasks-container'); // Parent container
    parentContainer.innerHTML = ''; // Clear the container

    if (Object.keys(tasksByDate).length === 0) {
        displayMessage('No past tasks found.');
        return;
    }

    Object.keys(tasksByDate).forEach(date => {
        // Create a container for tasks of the current date
        const dateContainer = document.createElement('div');
        dateContainer.className = 'date-container';

        // Create a date header
        const dateHeader = document.createElement('h3');
        dateHeader.textContent = `Feladatok a kövbetkező napról: ${date}`;
        dateHeader.className = 'date-header';

        // Add a horizontal line below the date header
        const dateSeparator = document.createElement('hr');
        dateSeparator.className = 'date-separator';

        // Append the header and separator to the date container
        dateContainer.appendChild(dateHeader);
        dateContainer.appendChild(dateSeparator);

        // Create the task container (same as in tasks.js)
        const taskContainer = document.createElement('div');
        taskContainer.className = 'ag-courses_box';

        // Iterate through tasks for the current date
        tasksByDate[date].forEach(task => {
            // Create the card container
            const taskCard = document.createElement('div');
            taskCard.className = 'ag-courses_item';
            taskCard.id = `task-${task.id}`;

            // Create the link wrapper
            const taskLink = document.createElement('a');
            taskLink.href = '#';
            taskLink.className = 'ag-courses-item_link';

            // Background div (set the label color dynamically)
            const taskBg = document.createElement('div');
            taskBg.className = 'ag-courses-item_bg';
            if (task.progresson == 1) {
            taskBg.style.backgroundColor = '#008000'
            }
            else  {
             taskBg.style.backgroundColor = '#FF0000'}
            // Task title
            const taskTitle = document.createElement('div');
            taskTitle.className = 'ag-courses-item_title';
            taskTitle.textContent = task.t_name;

            // Task date box
            const taskDateBox = document.createElement('div');
            taskDateBox.className = 'ag-courses-item_date-box';
            taskDateBox.innerHTML = `
               
            `;

            // Add click event to open the modal
            taskLink.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent default link behavior
                openModal(task.t_name, task.description, task.label_color, task.id); // Pass task details to the modal
            });

            // Append elements to build the card
            taskLink.appendChild(taskBg);
            taskLink.appendChild(taskTitle);
            taskLink.appendChild(taskDateBox);
            taskCard.appendChild(taskLink);

            // Append the card to the task container
            taskContainer.appendChild(taskCard);
        });

        // Append the task container to the date container
        dateContainer.appendChild(taskContainer);

        // Append the date container to the main container
        parentContainer.appendChild(dateContainer);
    });
}
function openModal(title, description,color,task_id) {
    const modal = document.getElementById('task-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
   

    modalTitle.textContent = title; // Set the task title
    modalDescription.textContent = `Leírás: ${description} ` ; // Set the task description
    

    modal.style.display = 'block'; // Show the modal
   const modalContent = document.querySelector('.modal-content');
    modalContent.style.backgroundColor = color; // Set the label color as the background color
}

function displayMessage(message) {
    const container = document.getElementById('tasks-container');
    container.innerHTML = `<p>${message}</p>`;
}


// Close the modal when the "X" button is clicked
document.querySelector('.close').addEventListener('click', function () {
    const modal = document.getElementById('task-modal');
    modal.style.display = 'none';
});

// Close the modal when clicking outside the modal content
window.addEventListener('click', function (event) {
    const modal = document.getElementById('task-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});