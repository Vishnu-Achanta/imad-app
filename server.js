var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var article = { 
        'article_one' : {
            title: 'Article One | Vishnu',
            heading: 'Article-One',
            date: '10/8/2017',
            content: ' Sorry I do not have any article right now',
        },
        
        'article_two' : {
            title: 'Article Two | Vishnu',
            heading: 'Article-Two',
            date: '10/8/2017',
            content: ' Sorry I do not have any article right now',
        },

        article_three : {
            title: 'Article Three | Vishnu',
            heading: 'Article-Three',
            date: '10/8/2017',
            content: ' Sorry I do not have any article right now',
        },

};

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
                ${date}
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

app.get('/:articleName', function (req, res) {
 var articleName = req.params.articleName;
 res.send(CreateTemplate(article[artcileName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
