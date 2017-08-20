console.log('Loaded!');

var button = document.getElementById('counter');

button.onclick = function() {
  
  //MAke a request to counter endpoint
  var request= new XMLHttpRequest();
  
  request.onreadystatechange = function(){
    if(request.readystate === XMLHttpRequest.done){
        if(request.status === 200){
            var counter = request.responseText;
            var count = document.getElementById('count');
            count.innerHTML=counter.toString();
        }
    }
  };
  
  request.open('GET', 'http://ee150002001.imad.hasura-app.io/counter' , true);
  request.send('null');
};

var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('sbt_btn');
submit.onclick = function(){
    console.log('hi');
   //make rquest
   
   // capture and render
   var names = ['name1','name2','name3'];
   var list='';
   console.log('before for');
   for(var i=0; i< names.lenght; i++){
       console.log('for');
       list += '<li>' + names[i] + '</li>';
   }
   console.log('after for');
   var namelist = document.getElementById('namelist');
   namelist.innerHTML= list;
   console.log('list');
};




