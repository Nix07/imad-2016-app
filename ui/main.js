console.log('Loaded!');

//Executing new javascript
var elem = document.getElementById('main');
elem.innerHTML = "New Value";

//Moving the madi
var elem2 = document.getElementById('madi');
elem2.onclick = function () {
   elem2.style.marginLeft = '100px';  
};