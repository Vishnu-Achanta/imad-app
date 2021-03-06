var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');
var session = require('express-session');
var config = {
    user: 'ee150002001',
    database: 'ee150002001',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: {maxAge : 1000 * 60 * 60 *24 *30}
}));

var counter=0;
app.get('/counter', function (req, res) {
    counter = counter +1;
  res.send(counter.toString());
});


function CreateTemplate (data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
var htmlTemplate = `
    <html>
    <head>
    <title> ${title} </title>
        <link href="/ui/style.css" rel="stylesheet" />
        <meta name ="viewportcontent = "width=device-width, initial-scale=1">
    </head>
    <body>
        <div class="container" >
            <div> 
                <a href="/"> Home </a>
            </div>
            <h4>           
                <div> 
                    ${heading}
                </div>
            </h4>
            <h3>
                ${date.toDateString()}
            </h3>
            <h2> ${content} </h2>
        </div>
    </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt){
    
    var hashed= crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ['pbkdf2', 10000, salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function (req, res) {
  var hashedString = hash(req.params.input, 'this-is-a-random-string');
  res.send(hashedString);
});

app.post('/create-user', function (req, res) {
    
    var username = req.body.username;
    var password = req.body.password;
    
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    
        pool.query('INSERT INTO "user" (username, password)  VALUES ($1,$2)', [username, dbString], function(err, result){
        if(err){
           res.status(500).send(err.toString());
       } else{
           res.send('User succesfully created: '+ username);
       }
    });
});

app.post('/login', function (req, res) {
    
    var username = req.body.username;
    var password = req.body.password;
    
        pool.query('SELECT * FROM  "user" WHERE username = $1', [username], function(err, result){
        if(err)
        {
           res.status(500).send(err.toString());
        }
        else
        {
           if(result.rows.length === 0)
           {
               res.status(403).send('Username/password is invalid');
           } 
           else
           {
               var dbString = result.rows[0].password;
               var salt = dbString.split('$')[2];
               var hashedPassword = hash(password, salt);
               if(hashedPassword == dbString)
               {
                   req.session.auth = {userId: result.rows[0].id};
                   res.send('Credentials are valid');    
               }
               else
               {
                   res.status(403).send('Password is invalid');
               }
           }
        }
    });
});

app.get('/check-login', function(req, res){
   if(req.session && req.session.auth && req.session.auth.userId){
       res.send('You are logged in' + req.session.auth.userId.toString());
   }else{
       res.send('You are not logged in');
   }
});

app.get('/logout', function(req, res){
   delete req.session.auth;
   res.send('You are logged out');
});

var pool = new Pool(config);

app.get('/test-db', function (req, res) {
    
    pool.query('SELECT * FROM test', function(err, result){
       if(err){
           res.status(500).send(err.toString());
       } else{
           res.send(JSON.stringify(result.rows));
       }
    });
}); 

var names=[];

app.get('/submit', function (req, res) {
 var name = req.query.name;
 names.push(name);
 res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function (req, res) {
     console.log('hey 2');
    pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName] , function (err, result) {
        console.log('hey 1');
       if(err){
           res.status(500).send(err.toString());
       } else{
           if(result.rows.length === 0){
               res.status(404).send('Article Not Found');
           }else{
               var articleData = result.rows[0];
               res.send(CreateTemplate(articleData));
           }
       }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
