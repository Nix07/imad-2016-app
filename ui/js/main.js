//Counter code
/*var button = document.getElementById("counter");

button.onclick = function () {
    
    var request =new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
       }
    };
    
    request.open('GET','http://nix07.imad.hasura-app.io/counter', true);
    request.send(null);
};*/

//Response from the server


//Counter code
/*var button = document.getElementById("counter");

button.onclick = function () {
    
    var request =new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
       }
    };
    
    request.open('GET','http://nix07.imad.hasura-app.io/counter', true);
    request.send(null);
};*/


//Submit username/password to login
var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    //Make the request to the server and send the name
    //Capture the names name render it
        var request =new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                console.log('user logged in');
                alert('Logged in successfully');
            } else if (request.status === 403) {
                alert('Username/passowrds is Invalid');
            } else if (request.status === 500) {
                alert('Something went wrong in server.');
            }
       }
    };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST','http://nix07.imad.hasura-app.io/login' + name, true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}))};
    
   /* var names = ['name1','name2','name3'];
    var list = '';
    for (var i=0;i < names.length;i++){
    	list += '<li>' + names[i] + '</li>';
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
};

var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    //Make the request to the server and send the name
    //Capture the names name render it
        var request =new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for (var i=0;i < names.length;i++){
                	list += '<li>' + names[i] + '</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
            }
       }
    };
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    request.open('GET','http://nix07.imad.hasura-app.io/submit-name?name=' + name, true);
        request.send(null);
    
    var names = ['name1','name2','name3'];
    var list = '';
    for (var i=0;i < names.length;i++){
    	list += '<li>' + names[i] + '</li>';
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
};*/