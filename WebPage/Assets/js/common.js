var state = {
    users: [],
    isLoggedIn: false,
    isLoginPending: false
  };
  
  window.onload = renderLoginComponent;
  
  function renderLoginComponent() {
    if (state.isLoggedIn) {
      document.getElementById("login-component").innerHTML = "";
      return;
    }
  
    document.getElementById("login-component").innerHTML = `
        <div  class="card p-3">    
          <h1>Bejelentkezés</h1>   
          <form id="login" class="p-3">
            <label class="w-100">
              Email:
              <br>
              <input type="text" name="email" id="email" ${
                state.isLoginPending ? "disabled" : ""
              }  />
            </label>
            <br>
            <label class="w-100">
              Jelszó:
              <br>
              <input type="password" name="password" id="password" ${
                state.isLoginPending ? "disabled" : ""
              } />
            </label>
            <br>
            <button type="submit" id="login" ${
              state.isLoginPending ? "disabled" : ""
            }>Küldés</button>
            <div id="message" class="float-right mt-2">
              ${state.isLoginPending ? "Bejelentkezés folyamatban..." : ""}
            </div>
          </form>
        </div>
        <div class="register">
          <a href="../views/Registration_Page.html" >Regisztárció!</a> 
        </div>
    `;
  
    document.getElementById("login").onsubmit = function(event) {
      event.preventDefault();
      var email = event.target.elements.email.value;
      var password = event.target.elements.password.value;
      var body = JSON.stringify({
        email: email,
        password: password
      });
      state.isLoginPending = true;
      renderLoginComponent();
      loginAndFetchUsers(body);
     
    };
  }
  
 
  
  async function loginAndFetchUsers(body) {
    // await: Promise<_> -> _
    var loginResponse = await fetch("https://reqres.in/api/login", {
      method: "POST",
      body: body,
      headers: {
        "Content-type": "application/json"
      }
    });
    
    if(!loginResponse.ok) {
      alert("Bejelentkezés sikertelen");
      state.isLoginPending = false;
      renderLoginComponent();
      return;
    }
  
    var token = await loginResponse.json();
    state.isLoggedIn = true;
    state.isLoginPending = false;
    renderLoginComponent();
  
    var usersResponse = await fetch("https://reqres.in/api/users");
  
    if(!usersResponse.ok) {
      alert('Users error');
      state.isLoginPending = false;
      renderLoginComponent();
      return;
    }
  
    var userPage = await usersResponse.json()
    // state change
    state.users = userPage.data;
    // render
    renderUsers();
  }
  
  function renderUsers() {
    var usersHTML = "";
    for (var user of state.users) {
      usersHTML += `<li class="list-group-item">${user.first_name} ${user.last_name}</li>`;
    }
  
    document.getElementById("user-list-container").innerHTML =
      '<ul class="list-group">' + usersHTML + "</ul>";
  }
  
  /*
    1. Ha a bejelentkezés sikeres, akkor a form ne jelenjen meg
    2. Message doboz módosítása
    3. Amíg a bejelentkezés folyamatban van, az input mezők legyenek disabled-re állítva
  */
  

