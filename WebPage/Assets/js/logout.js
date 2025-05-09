function confirmLogout() {
    // Display the confirmation popout
    const userConfirmed = confirm("Are you sure you want to log out?");
    if (userConfirmed) {
        // Make an AJAX request to the logout endpoint
        fetch('../Assets/php/logout.php', {
            method: 'POST', // Use POST method to match RESTful principles
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'logout' }) // Optional data, could be useful in more complex cases
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.success)
            if (data.success) {
                window.location.href = "../index.html"; // Redirect after successful logout
            } else {
                alert('Logout failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error logging out.');
        });
    }
}