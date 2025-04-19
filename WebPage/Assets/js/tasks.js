document.getElementById('deadline').addEventListener('change', function() {
    const selectedDate = this.value;
    if (selectedDate) {
        fetchTasks(selectedDate);
    } else {
        fetchTasks(getCurrentDate());
    }
});

document.getElementById('styledSelect1').addEventListener('change', function () {
    const selectedDate = document.getElementById('deadline').value; // Get the selected date
    const selectedLabel = this.value; // Get the selected label ID

    console.log(`Selected label value: "${selectedLabel}"`); // Debugging line

    // If the first option ("Minden címke") is selected, do not send label_id
    if (selectedLabel === '' || selectedLabel === "1") {
        fetchTasks(selectedDate); // Fetch tasks without label_id
    } else {
        fetchTasks(selectedDate, selectedLabel); // Fetch tasks with label_id
    }
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
    
    // Only include label_id if it's not empty or null
    if (labelId && labelId !== '') {
        url += `&label_id=${labelId}`;
    }

    console.log(`Fetching tasks with URL: ${url}`); // Debugging line

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Response data:', data); // Debugging line
            if (data.success && data.tasks && data.tasks.length > 0) {
                displayTasks(data.tasks); // Show tasks
            } else {
                displayMessage(data.message || 'Nincs feladatod erre a napra.'); // Show message
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayMessage('An error occurred while fetching tasks.');
        });
}
function displayTasks(tasks) {
    const parentContainer = document.getElementById('tasks-container'); // Parent container
    let container = document.querySelector('.ag-courses_box'); // Try to find the container

    // Clear the parent container completely
    parentContainer.innerHTML = ''; // Clear everything (tasks or messages)

    // Recreate the .ag-courses_box container
    container = document.createElement('div');
    container.className = 'ag-courses_box';
    parentContainer.appendChild(container); // Append it to the parent container

    console.log('Tasks to display:', tasks); // Debugging line

    tasks.forEach((task, index) => {
        console.log(`Rendering task ${index + 1}:`, task); // Debugging line

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
        taskBg.style.backgroundColor = task.label_color || '#f9b234'; // Default color if no label color is provided

        // Task title
        const taskTitle = document.createElement('div');
        taskTitle.className = 'ag-courses-item_title';
        taskTitle.textContent = task.t_name;

        // Task date box
        const taskDateBox = document.createElement('div');
        taskDateBox.className = 'ag-courses-item_date-box';
        taskDateBox.innerHTML = `
            Deadline:
            <span class="ag-courses-item_date">${task.deadline}</span>
        `;

        // Add click event to open the modal
        taskLink.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            openModal(task.t_name, task.description,task.label_color,task.id); // Pass task title and description to the modal
        });

        // Append elements to build the card
        taskLink.appendChild(taskBg);
        taskLink.appendChild(taskTitle);
        taskLink.appendChild(taskDateBox);
        taskCard.appendChild(taskLink);

        // Append the card to the container
        container.appendChild(taskCard);
    });

    console.log('All tasks rendered successfully.'); // Debugging line
}
function openModal(title, description,color,task_id) {
    const modal = document.getElementById('task-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalbuttons=document.getElementById('modal-buttons');

    modalTitle.textContent = title; // Set the task title
    modalDescription.textContent = `Leírás: ${description} ` ; // Set the task description
    modalbuttons.innerHTML=`<a href="edit_task.html?task_id=${task_id}"><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="#000000"/>
    </svg></a> <!-- Edit link with task ID -->
    
    <button class="svg_button"  onclick="deleteTask(${task_id})"> <svg fill="#000000" width="30px" height="30px" viewBox="-6.7 0 122.88 122.88" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  enable-background="new 0 0 109.484 122.88" xml:space="preserve">

    <g>
    
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144 c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633 L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3 c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314 h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869 V42.998L49.572,42.998z"/>
    
    </g>
    
    </svg></button>
    <button class="svg_button" onclick="MarkTaskDone(${task_id})">
       <svg width="30px" height="30px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    
    <title>done [#1478]</title>
    <desc>Created with Sketch.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Dribbble-Light-Preview" transform="translate(-139.000000, -400.000000)" fill="#000000">
            <g id="icons" transform="translate(56.000000, 160.000000)">
                <path d="M97.23065,248.168 L92.7776,252.408 C92.366,252.8 91.69925,252.8 91.28765,252.408 L89.0627,250.289 C88.65215,249.899 88.65215,249.266 89.0627,248.875 C89.4722,248.485 90.1379,248.485 90.5474,248.875 L91.2908,249.583 C91.7003,249.973 92.36495,249.973 92.7755,249.583 L95.74595,246.754 C96.15545,246.363 96.8201,246.363 97.23065,246.754 C97.6412,247.144 97.6412,247.777 97.23065,248.168 M101.9,240 L85.1,240 C83.93975,240 83,240.895 83,242 L83,258 C83,259.104 83.93975,260 85.1,260 L101.9,260 C103.06025,260 104,259.104 104,258 L104,242 C104,240.895 103.06025,240 101.9,240" id="done-[#1478]">

</path>
            </g>
        </g>
    </g>
</svg>
    </button>
    `;

    modal.style.display = 'block'; // Show the modal
   const modalContent = document.querySelector('.modal-content');
    modalContent.style.backgroundColor = color; // Set the label color as the background color
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
    
   

    function displayMessage(message) {
        const container = document.getElementById('tasks-container');
        const nap_container=document.getElementById('form-group');
        if (!container) {
            console.error('No element with id "tasks-container" found.');
            return;
        }
    
        // Clear existing tasks or messages
        container.innerHTML = '';
    
        // Create and display the message
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.style.color = 'white'; // Optional: Style the message
        messageElement.style.textAlign = 'center'; // Optional: Center the message
        container.appendChild(messageElement);
        
        if (message === 'Nincs feladatod erre a napra') {
            createCalendar();
        }
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
                const modal = document.getElementById('task-modal');
                modal.style.display = 'none';
                const remainingTasks = document.querySelectorAll('.ag-courses_item');
                if (remainingTasks.length === 0) {
                    console.log('No tasks remaining. Displaying calendar.');
                    createCalendar(); // Refresh the calendar
                } else {
                    console.log(`Remaining tasks: ${remainingTasks.length}`);
                }
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

function createCalendar() {
    const container = document.getElementById('tasks-container');
    if (!container) {
        console.error('No element with id "tasks-container" found.');
        return;
    }

    // Clear the container before adding the calendar
    container.innerHTML = '';

    // Create calendar modal container
    const calModalContainer = document.createElement('div');
    calModalContainer.className = 'cal-modal-container';

    // Create calendar modal
    const calModal = document.createElement('div');
    calModal.className = 'cal-modal';

    // Create calendar placeholder
    const calendar = document.createElement('div');
    calendar.id = 'calendar';
    calendar.className = 'placeholder';

    // Create a container for calendar events
    const calendarEvents = document.createElement('div');
    calendarEvents.className = 'calendar-events';
    calendarEvents.textContent = 'Válaszon egy dátumot eseményel';

    // Append elements to the modal
    calModal.appendChild(calendar);
    calModal.appendChild(calendarEvents);
    calModalContainer.appendChild(calModal);
    container.appendChild(calModalContainer);

    // Fetch event data from the backend
    fetch('../Assets/php/all_tasks.php?type=future')
    .then(response => response.json())
    .then(data => {
        console.log('API Response:', data); // Debugging line
        if (data.success && data.events) {
            const eventDates = {};
            for (const [date, events] of Object.entries(data.events)) {
                // Normalize the date to YYYY-MM-DD
                const normalizedDate = flatpickr.formatDate(new Date(date), 'Y-m-d');
                eventDates[normalizedDate] = events;
            }
            console.log('Normalized event dates:', eventDates); // Debugging log
            initializeFlatpickr(calendar, eventDates, calendarEvents);
        } else {
            console.error('Failed to fetch events:', data.message || 'No events found.');
        }
    })
    .catch(error => {
        console.error('Error fetching events:', error);
    });
}
function initializeFlatpickr(calendar, eventDates, calendarEvents) {
    const flatpickrInstance = flatpickr(calendar, {
        inline: true,
        minDate: 'today',
        disableMobile: true,
        onChange: function (selectedDates, dateStr, instance) {
            if (selectedDates.length) {
                // Format the date as YYYY-MM-DD to avoid time zone issues
                const formattedDate = flatpickr.formatDate(selectedDates[0], 'Y-m-d');
                console.log('Formatted date for fetchTasks:', formattedDate); // Debugging log
                fetchTasks(formattedDate); // Update the page with tasks for the selected date
                const dateInput = document.getElementById('deadline');
                if (dateInput) {
                    dateInput.value = formattedDate;
                }
            }
        },
        onDayCreate: function (dObj, dStr, fp, dayElem) {
            // Format the date of the current day element as YYYY-MM-DD
            const date = flatpickr.formatDate(dayElem.dateObj, 'Y-m-d');
        
            console.log(`Checking calendar date: ${date}`); // Debugging log
        
            // Check if the date has events
            if (eventDates[date]) {
                console.log(`Date ${date} has events:`, eventDates[date]); // Debugging log
                dayElem.classList.add('has-event'); // Add a custom class for styling
            }
        },
        locale: {
            weekdays: {
                shorthand: ['V', 'H', 'K', 'SZE', 'CS', 'P', 'SZO'],
                longhand: ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
            },
        },
    });
}

function MarkTaskDone(task_id) {
    if (!confirm('Biztos kész vagy a feladattal?')) {
        return;
    }

    console.log('Marking task as done. Task ID:', task_id); // Debugging line

    // Prepare the data to send in the body
    const data = JSON.stringify({ task_id: task_id });

    fetch(`../Assets/php/change_progress.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Specify JSON content type
        },
        body: data, // Send the task_id in the body
    })
        .then(response => response.json())
        .then(data => {
            console.log('Response data:', data); // Debugging line
            if (data.success) {
                alert('Task marked as completed successfully.');
                // Remove the task from the DOM
                const taskElement = document.getElementById(`task-${task_id}`);
                if (taskElement) {
                    taskElement.remove();
                    const modal = document.getElementById('task-modal');
                    modal.style.display = 'none';
                    const remainingTasks = document.querySelectorAll('.ag-courses_item');
                    if (remainingTasks.length === 0) {
                        console.log('No tasks remaining. Displaying calendar.');
                        createCalendar(); // Refresh the calendar
                    } else {
                        console.log(`Remaining tasks: ${remainingTasks.length}`);
                    }
                  
                } else {
                    console.error(`Task element with ID task-${task_id} not found.`);
                }
            } else {
                alert('Failed to mark task as completed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while marking the task as completed.');
        });
}