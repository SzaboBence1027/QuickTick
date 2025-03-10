window.onload = function() {
    getUsers();
    console.log(getUsers());

}

function getUsers(){
    
    fetch('../Assets/php/profile_details.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        
    })
    .then(response => response.json())
    .then(data=>{
        if(data.success){
            document.getElementById('Nev').textContent="Név: "+data.user.name;
            document.getElementById('Email').textContent="Email: "+data.user.email;
            console.log(data.user.name)
    }
    else {
        console.error('Nem sikerult betolteni az adatokat:', data.message);}
} 
        
        
        )
    

}