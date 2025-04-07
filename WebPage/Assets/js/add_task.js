document.getElementById('add-task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    
    const formData = new FormData(this);
    

    // Check if label_id is set, if not, append it as an empty string
    if (!formData.has('label_id') || formData.get('label_id') === '') {
        formData.set('label_id', '');
    }
    formData.append('progresson',0);

    fetch('../Assets/php/add_task.php', {
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
    setDefaultDate();
    loadLabels();

    // Add event listener to capture selected label ID after the DOM is fully loaded
    document.getElementById('styledSelect1').addEventListener('change', function() {
        const selectedLabelId = this.value;
        console.log('Selected Label ID:', selectedLabelId);
    });
};

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function setDefaultDate() {
    const dateInput = document.getElementById('deadline');
    if (dateInput) {
        dateInput.value = getCurrentDate();
    }
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

