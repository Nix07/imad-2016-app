var express = require('express');
var morgan = require('morgan');
var path = require('path');

var articles = {
        "article-one": {
        "title": "Article One | Nikhil Prakash",
        "heading": "Aricle One",
        "content":  `<p>
                        This is the first Article of the Web application.
                    </p>`
     },
        "article-two":  {
            "title": "Article Two | Nikhil Prakash",
            "heading": "Aricle Two",
            "content":  `<p>
                        This is the Second Article of the Web application.
                    </p>`
        },
        "article-three":  {
            "title": "Article Three | Nikhil Prakash",
            "heading": "Aricle Three",
            "content":  `<p>
                        This is the Third Article of the Web application.
                    </p>`
        },
};

function createtemplate(data){
var title = data.title;
var heading= data.heading;
var content= data.content;

    var htmltemplate = ` 
        <html>
        <head>
            <title>
                ${title}
            </title>
            <link href="/ui/style.css" rel="stylesheet" />
            <meta name="viewport" content="width-device-width, initial-scale=1" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href='/'>Home</a>
                </div>
                <hr>
                <div>
                    <h1>Welcome to ${heading}</h1>
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html> `;
    return htmltemplate;
}
    

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
});

app.get('/:articleName',function (req,res){
    var articleName = req.params.articleName;
   res.send(createtemplate(articles[articleName]));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

var names = [];
app.get('/submit-name/:name', function(req, res) {
	//get the name from request
	var name = req.params.name;
    names.push(name);
	//JSON Javascript Object Notation
	res.send(JSON.stringify(names));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
