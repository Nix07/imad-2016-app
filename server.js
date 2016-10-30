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

app.get('/css/bootstrap.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','css', 'bootstrap.css'));
});

app.get('/css/style2.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','css', 'style2.css'));
});

app.get('/js/jquery.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','js', 'jquery.js'));
});

app.get('/css/lightbox.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','css', 'lightbox.css'));
});

app.get('/js/bootstrap.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','js', 'bootstrap.js'));
});

app.get('/js/lightbox.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','js', 'lightbox.js'));
});

app.get('/index3.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index3.html'));
});

app.get('/index4.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index4.html'));
});

app.get('/about.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'about.html'));
});

app.get('/post.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'post.html'));
});

app.get('/butterfly.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'butterfly.html'));
});

app.get('/css/demo.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','css' ,'demo.css'));
});

app.get('/css/reset.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','css' ,'reset.css'));
});

app.get('/css/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','css', 'style.css'));
});

app.get('/js/jquery.easing.1.3.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','js', 'jquery.easing.1.3.js'));
});

app.get('/js/jquery.eislideshow.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','js', 'jquery.eislideshow.js'));
});

app.get('/js/jquery.eislideshow.js.bak', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','js', 'jquery.eislideshow.js.bak'));
});

app.get('/images/imge2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images', 'imge2.jpg'));
});

app.get('/images/imge3.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images','imge3.jpg'));
});

app.get('/images/img.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images', 'img.jpg'));
});

app.get('/images/img3.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images' ,'img3.jpg'));
});

app.get('/images/imge.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images','imge.jpg'));
});

app.get('/images/img2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'images','img2.jpg'));
});

app.get('/images/img.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images', 'img.jpg'));
});

app.get('/images/web2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images', 'web2.jpg'));
});

app.get('/images/solve.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images','solve.jpg'));
});

app.get('/images/pp1.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images', 'pp1.jpg'));
});

app.get('/images/pp2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images' ,'pp2.jpg'));
});

app.get('/images/pp3.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images','pp3.jpg'));
});

app.get('/images/pp4.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images' ,'pp4.jpg'));
});

app.get('/images/pp5.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images' ,'pp5.jpg'));
});

app.get('/images/pp6.jpeg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images' ,'pp6.jpeg'));
});

app.get('/images/pp7.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images' ,'pp7.jpg'));
});

app.get('/images/s1.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images' ,'s1.jpg'));
});

app.get('/images/s2.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images', 's2.jpg'));
});

app.get('/images/s3.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images', 's3.jpg'));
});

app.get('/images/s4.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images', 's4.jpg'));
});

app.get('/images/s5.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images' ,'s5.jpg'));
});

app.get('/images/s6.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images', 's6.jpg'));
});

app.get('/images/header.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images', 'header.jpg'));
});

app.get('/images/next.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images', 'next.png'));
});

app.get('/images/prev.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images' ,'prev.png'));
});

app.get('/images/close.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images', 'close.png'));
});

app.get('/images/loading.gif', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images', 'loading.gif'));
});

app.get('/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','main.js'));
});

app.get('/images/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','images' ,'madi.png'));
});

app.get('/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
