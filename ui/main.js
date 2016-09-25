//Counter code
var button = document.get ElementById("button");
button.onclick() = function(){
    counter = counter +1;
    var span = document.getElementbyId("count");
    span.innerHTML = counter.toString();
}