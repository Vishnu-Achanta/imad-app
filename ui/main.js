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


