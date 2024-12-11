/*document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent form submission

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  //const rememberMe = document.getElementById('rememberMe').checked;

  console.log('Email:', email);
  console.log('Password:', password);

  const data = new FormData();
  data.append('email', email);
  data.append('password', password);
  console.log(data)  
  fetch('../Assets/php/login.php', {
      method: 'POST',
      body: data
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          // Store JWT token
         
          const token = data.token;
          if (rememberMe) {
              // Store token in cookies with 30 days expiry
              document.cookie = `token=${token}; path=/; max-age=${30 * 24 * 60 * 60}; secure; HttpOnly`;
          } else {
              // Store token in localStorage for the session
              localStorage.setItem('token', token);
          }
          window.location.href = '../../index.html';  // Redirect to protected page
      } else {
          document.getElementById('errorMessage').innerText = data.message;
      }
  })
  .catch(error => {
      document.getElementById('errorMessage').innerText = 'An error occurred!';
  });
});*/
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    fetch('../Assets/php/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || data.error);
    });
});
