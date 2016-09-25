//Counter code
var button = document.getElementById("button");
var counter = 0;

button.onclick = function(){
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById("count");
                span.innerHTML = counter.toString();
            }
       }
    };
    
    request.open('GET',"http://http://nix07.imad.hasura-app.io/counter",true);
    request.send(null);
};