//Counter code
var button = document.getElementById("button");
var counter = 0;

button.onclick = function(){
    counter = counter +1;
    var span = document.getElementbyId("count");
    span.innerHTML = counter.toString();
}