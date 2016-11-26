
function loadLoginForm () {
    var loginHtml = `
    <style>
        .mobile {
            width: 60%;
            margin: 25px auto;
        }

        @media (max-width: 600px) {
            .mobile {
                width: 80%;
                 margin: 25px auto;
        }
    </style>
    <div class="container-fluid col-md-6 col-md-offset-3 text-center">
    <div class="mobile">
        <h1 style="font-family:'Bungee', cursive;">Login/Register</h1>
		  <form style="padding-right: 20px; padding-left=20px;padding=top:30px;">
			    <div class="form-group">
			      <input type="text" class="form-control" id="username" placeholder="Username">
			    </div>
			    <div class="form-group">
			      <input type="password" class="form-control" id="password" placeholder="Enter password">
			    </div>
			    
			    <button type="submit" class="btn btn-md btn-primary btn-block btn-left" id="login_btn" style="padding= 50px;">Login</button>
			    <button type="submit" class="btn btn-md btn-primary btn-block" id="register_btn">Register</button>
		  </form>
	</div>
	<div class="container-fluid">
			<hr>
				<div class="text-center" style="font-family: 'Baloo Bhaina', cursive; font-sze: 20px;">
					<font size="4">Made with ♥ by <b>Nikhil Prakash</b></font>
				</div>
		</div>
	</div>
	<br>
        `;
    document.getElementById('login_area').innerHTML = loginHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200 || request.status===0) {
                  submit.value = 'Success!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
                  
              } else {
                  console.log(request.status);
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              loadLogin();
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        if (username==='' || password==='') {
           alert("Username/Password can't be empty!");
           return;
        }
    
        if (username.length===0 || password.length===0){
            alert("Username/Password can't be empty!");
            return;
        }
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.value = 'Logging in...';
        
    };
    
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              }else if (request.status === 0) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              }
              else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        if (username==='' || password==='') {
           alert("Username/Password can't be empty!");
           return;
        }
    
        if (username.length===0 || password.length===0){
            alert("Username/Password can't be empty!");
            return;
        }
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.value = 'Registering...';
    
    };
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
    <div class="jumbotron text-center"><h1>Hi <b>${username}...</b></h1></div>
        <div class="text-center">
        <a href="/logout" style="font-size: 4;"">Logout</a>
        </div>
    `;
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                /*var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;
                }
                content += "</ul>"
                articles.innerHTML = content;*/
            } else {
                articles.innerHTML('Oops! Could not load all articles!');
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}


// The first thing to do is to check if the user is logged in!
loadLogin();

// Now this is something that we could have directly done on the server-side using templating too!
loadArticles();
