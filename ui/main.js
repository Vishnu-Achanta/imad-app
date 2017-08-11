console.log('Loaded!');

var element = document.getElementById('main-text');
element.innerHTML = 'It is a secret' ;

var img = document.getElementById('madi');
img.onclick = function(){
     img.style.marginLeft = '100px'  ;
};