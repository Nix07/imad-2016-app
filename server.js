var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'nix07',
    database: 'nix07',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

function createtemplate(data){
    var title = data.title;
    var heading= data.heading;
    var date = data.date;
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
                        ${date.toDateString()}
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
  res.sendFile(path.join(__dirname, 'ui', 'index2.html'));
});

var pool = new Pool(config);

app.get('/test-db', function (req, res) {
  // make a select request
  // result the response with the results
  pool.query('SELECT * FROM test', function (err,result){
      if(err){
          res.status(500).send(err.toString());
      }else {
          res.send(JSON.stringify(result.rows));
      }
  });
});

var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req, res) {
	//get the name from request
	var name = req.query.name;
    names.push(name);
	//JSON Javascript Object Notation
	res.send(JSON.stringify(names));
});


app.get('/articles/:articleName',function (req,res){
   // var articleName = req.params.articleName;
    
    pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function(err,result){
        if(err){
            res.status(500).send(err.toString());
        } else {
            if(result.rows.length === 0 ){
                res.status(404).send('Article not found');
            }
            else{
                var articleData = result.rows[0];
                res.send(createtemplate(articleData));
            }
        }
    });
});

app.get('/ui/bootstrap.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'bootstrap.css'));
});

app.get('/ui/jquery.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'jquery.js'));
});

app.get('/ui/lightbox.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'lightbox.css'));
});

app.get('/ui/bootstrap.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'bootstrap.js'));
});

app.get('/ui/lightbox.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'lightbox.js'));
});

app.get('/ui/index3.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index3.html'));
});

app.get('/ui/butterfly.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'butterfly.html'));
});

app.get('/ui/imge2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'imge2.jpg'));
});

app.get('/ui/imge3.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'imge3.jpg'));
});

app.get('/ui/img.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'img.jpg'));
});

app.get('/ui/img3.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'img3.jpg'));
});

app.get('/ui/imge.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'imge.jpg'));
});

app.get('/ui/img2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'img2.jpg'));
});

app.get('/ui/img.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'img.jpg'));
});

app.get('/ui/web2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'web2.jpg'));
});

app.get('/ui/solve.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'solve.jpg'));
});

app.get('/ui/pp1.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'pp1.jpg'));
});

app.get('/ui/pp2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'pp2.jpg'));
});

app.get('/ui/pp3.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'pp3.jpg'));
});

app.get('/ui/pp4.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'pp4.jpg'));
});

app.get('/ui/s1.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 's1.jpg'));
});

app.get('/ui/s2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 's2.jpg'));
});

app.get('/ui/s3.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 's3.jpg'));
});

app.get('/ui/s4.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 's4.jpg'));
});

app.get('/ui/s5.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 's5.jpg'));
});

app.get('/ui/s6.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 's6.jpg'));
});

app.get('/ui/next.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'next.png'));
});

app.get('/ui/prev.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'prev.png'));
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

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
