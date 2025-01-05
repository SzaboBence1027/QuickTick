
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formDataa = {
        email: document.getElementById('lo_email').value,
        password: document.getElementById('lo_password').value
    };

    fetch('../Assets/php/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataa)
    })
    .then(response => response.json())
    .then(data => {
        
        if (data.success) {
            window.location.href = "../views/Fooldal.html";
            console.log("Sikeres bejelentkezés");
        }
        else {
            console.log('Login failed:', data.message); // Log the failure message
        }
       
    })
    .catch(error => console.error('Error:', error));

});
