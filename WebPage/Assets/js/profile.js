window.onload = function() {
    getUsers();
    console.log(getUsers());

}

function getUsers(){
    
    fetch('../Assets/php/profile_details.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    

}