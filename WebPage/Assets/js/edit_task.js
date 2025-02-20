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
        loadTaskDetails(taskId);
    }
    loadLabels();
};

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function loadTaskDetails(taskId) {
    fetch(`../Assets/php/get_task.php?task_id=${taskId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('task_id').value = data.task.id;
                document.getElementById('t_name').value = data.task.t_name;
                document.getElementById('description').value = data.task.description;
                document.getElementById('label-filter').value = data.task.label_id;
                document.getElementById('priority').value = data.task.priority;
                document.getElementById('progresson').value = data.task.progresson;
                document.getElementById('deadline').value = data.task.deadline;
            } else {
                console.error('Failed to load task details:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}

function loadLabels() {
    console.log('Loading labels...');
    fetch('../Assets/php/labels.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const labelFilter = document.getElementById('label-filter');
                data.labels.forEach(label => {
                    if (label.l_name !== 'No Label') { // Exclude "No Label" option
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