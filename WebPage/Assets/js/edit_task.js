document.getElementById('edit-task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('../Assets/php/change_task.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('message');
        if (data.success) {
            messageDiv.innerHTML = `<p style="color: white;">${data.message}</p>`;
            window.location.href = `../views/Fooldal.html`;
        } else {
            messageDiv.innerHTML = `<p style="color: white;">${data.message}</p>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerHTML = `<p style="color: red;">An error occurred</p>`;
    });
});

window.onload = function() {
    const taskId = getQueryParameter('task_id');
    if (taskId) {
        loadLabels().then(() => {
            loadTaskDetails(taskId);
        });
    } else {
        loadLabels();
    }
};

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function loadTaskDetails(taskId) {
    fetch(`../Assets/php/get_task.php?task_id=${taskId}`)
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById('styledSelect1');
            if (data.success) {
                document.getElementById('task_id').value = data.task.id;
                document.getElementById('t_name').value = data.task.t_name;
                document.getElementById('description').value = data.task.description;
                document.getElementById('priority').value = data.task.priority;
                document.getElementById('priority-value').textContent = data.task.priority;
                document.getElementById('deadline').value = data.task.deadline;

                // Set the selected option based on the label ID
                for (let i = 0; i < selectElement.options.length; i++) {
                    if (selectElement.options[i].value == data.task.label_id) {
                        selectElement.selectedIndex = i;
                        break;
                    }
                }
            } else {
                console.error('Failed to load task details:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}

function loadLabels() {
    console.log('Loading labels...');
    return fetch('../Assets/php/labels.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const labelFilter = document.getElementById('styledSelect1');
                labelFilter.innerHTML = ''; // Clear existing options
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