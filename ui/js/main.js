//Counter code
var button = document.getElementById("counter");

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
};


//Response from the server
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
};