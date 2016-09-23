console.log('Loaded!');

//Executing new javascript
var elem = document.getElementById('main');
elem.innerHTML = "New Value";

//Moving the madi
var elem2 = document.getElementById('madi');
function moveRight() {
    marginleft = marginleft + 10;
    elem2.style.marginLeft = marginleft + 'px';
}

elem2.onclick = function () {
   setIntervals(moveRight,50);  
};