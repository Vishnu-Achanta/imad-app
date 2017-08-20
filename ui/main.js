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
   //make rquest
   var request= new XMLHttpRequest();
  
  request.onreadystatechange = function(){
    if(request.readystate === XMLHttpRequest.done){
        if(request.status === 200){
            var names = ['name1','name2','name3'];
            var list='';
            for(var i=0; i< names.length; i++){
                list += '<li>' + names[i] + '</li>';
            }
            var namelist = document.getElementById('namelist');
            namelist.innerHTML= list;
        }
    }
  };
  
  request.open('GET', 'http://ee150002001.imad.hasura-app.io/submit?name='+name , true);
  request.send('null');
};
   // capture and render
   
};




