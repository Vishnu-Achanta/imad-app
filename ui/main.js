console.log('Loaded!');


var submit = document.getElementById('sbt_btn');
submit.onclick = function(){
   //make rquest
   var request= new XMLHttpRequest();
  
  request.onreadystatechange = function(){
    if(request.readystate === XMLHttpRequest.done){
        if(request.status === 200){
            console.log('User login successful');
            alert('User login successful');
        }else if (request.status === 403 ){
            alert('Username / password incorrect');
        }else if (request.status === 500 ){
            alert('Something wrong with the server');
        }
    }
  };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  request.open('POST', 'http://ee150002001.imad.hasura-app.io/login' , true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username: username, password: password}));
};
   // capture and render
   





