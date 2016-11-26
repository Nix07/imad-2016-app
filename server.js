var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user: 'nix07',
    database: 'nix07',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use( session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));

function createtemplate2(data){ 
    var heading = data.heading;
    var date = data.date;
    var author = data.author;
    var content = data.content;
        var htmltemplate = `
        <!DOCTYPE html> 
<html>
	<head>
		<title>My Blog</title>
		<link rel="icon" href="/images/madi.png" type="image/png">
		<link rel="stylesheet" href="/css/bootstrap.css">
		<link rel="stylesheet" href="/css/style2.css">
		<script src="/js/jquery.js"></script>
		<script src="/js/bootstrap.js"></script>
		<script src="https://use.fontawesome.com/a772b32689.js"></script>
	</head>

	<body>
		<nav class="navbar navbar-custom">
			<div class="container-fluid">
				<div class="navbar-header">
					<a class="navbar-brand" href="#">The Blog</a>
				</div>
				
				<ul class="nav navbar-nav navbar-right">
					<li><a href="/">Home</a></li>
					<li><a href="/index3.html">The Blog</a></li>
					<li><a href="/about.html">About Me</a></li>
					<li><a href="/index4.html">Gallery</a></li>
					<li><a href="/index5.html">Login/Register</a></li>
				</ul>
			</div>
		</nav>
		<header style="background: url(/images/header.jpg)">
			<div class="text-center">
				<h1>The Blog</h1>
			<div class="lead">
				'The Blog' for dummies...
			</div>
			</div>
		</header>
		<div class="row">
			<div class="col-md-8 col-md-offset-2">
				<div class="posts" style="padding: 10px;">
					<h1><a href="#">${heading}</a></h1>
					<p>${date.toDateString()} | ${author}</p>
					 ${content}
				</div>
			</div>
		</div>
		<div class="row" style="padding: 20px">
		    <div class="col-md-8 col-md-offset-2">
        		<h4 class="page-header">Comments</h4>
                <div id="comment_form"></div>
    			<div id="comments">
                    <div style="text-align: center;">Loading comments...</div>
                </div>
                <script type="text/javascript" src="/ui/article.js"></script>
            </div>
		</div>
	<footer>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
						<hr>
						<ul class="list-inline text-center">
	                        <li style="font-size:4;">Made with ♥ by <b>Nikhil Prakash</b></li>
	                        <li>
	                            <a href="https://twitter.com/imnix07">
	                                <span class="fa-stack fa-lg">
	                                    <i class="fa fa-circle fa-stack-2x"></i>
	                                    <i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
	                                </span>
	                            </a>
	                        </li>
	                        <li>
	                            <a href="https://www.facebook.com/nix.prakash">
	                                <span class="fa-stack fa-lg">
	                                    <i class="fa fa-circle fa-stack-2x"></i>
	                                    <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
	                                </span>
	                            </a>
	                        </li>
	                        <li>
	                            <a href="https://github.com/nix07">
	                                <span class="fa-stack fa-lg">
	                                    <i class="fa fa-circle fa-stack-2x"></i>
	                                    <i class="fa fa-github fa-stack-1x fa-inverse"></i>
	                                </span>
	                            </a>
	                        </li>
	                    </ul>
                    </div>
                </div>
            </div>
        </footer>
	</body>
</html>
        `;
    return htmltemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index2.html'));
});


function hash (input, salt) {
    // How do we create a hash?
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}


app.get('/hash/:input', function(req, res) {
   var hashedString = hash(req.params.input, 'this-is-some-random-string');
   res.send(hashedString);
});

app.post('/create-user', function (req, res) {
   // username, password
   // {"username": "tanmai", "password": "password"}
   // JSON
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created: ' + username);
      }
   });
});

app.post('/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
    if (username==='' || password==='') {
        alert("Field can't be empty!");
        console.log('yes');
        return;
    }
    
    if (username.length===0 || password.length===0){
        alert("Field can't be empty!");
        console.log('yes3');
        return;
    }
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
                
                // Set the session
                req.session.auth = {userId: result.rows[0].id};
                // set cookie with a session id
                // internally, on the server side, it maps the session id to an object
                // { auth: {userId }}
                
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});

app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});

app.get('/logout', function (req, res) {
   delete req.session.auth;
   res.send(`
        <!DOCTYPE html> 
    <html>
    	<head>
    		<title>My Blog</title>
		<link rel="icon" href="/images/madi.png" type="image/png">
    		<link rel="stylesheet" href="/css/bootstrap.css">
    		<link rel="stylesheet" href="/css/style2.css">
    		<script src="/js/jquery.js"></script>
    		<script src="/js/bootstrap.js"></script>
    	</head>
    
    	<body>
    		<nav class="navbar navbar-custom">
    			<div class="container-fluid">
    				<div class="navbar-header">
    					<a class="navbar-brand" href="#">The Blog</a>
    				</div>
    				
    				<ul class="nav navbar-nav navbar-right">
    					<li><a href="/">Home</a></li>
    					<li><a href="/index3.html">The Blog</a></li>
    					<li><a href="/about.html">About Me</a></li>
    					<li><a href="/index4.html">Gallery</a></li>
    					<li><a href="/index5.html">Login/Register</a></li>
    				</ul>
    			</div>
    		</nav>
    		<header style="background: url(/images/header.jpg)">
    			<div class="text-center">
    				<h1>The Blog</h1>
    			<div class="lead">
    				'The Blog' for dummies...
    			</div>
    			</div>
    		</header>
    		<div class="jumbotron text-center"><h3>You are Logged Out</h3></div>
    		<footer>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
						<hr>
						<ul class="list-inline text-center">
	                        <li style="font-size:4;">Made with ♥ by <b>Nikhil Prakash</b></li>
	                        <li>
	                            <a href="https://twitter.com/imnix07">
	                                <span class="fa-stack fa-lg">
	                                    <i class="fa fa-circle fa-stack-2x"></i>
	                                    <i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
	                                </span>
	                            </a>
	                        </li>
	                        <li>
	                            <a href="https://www.facebook.com/nix.prakash">
	                                <span class="fa-stack fa-lg">
	                                    <i class="fa fa-circle fa-stack-2x"></i>
	                                    <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
	                                </span>
	                            </a>
	                        </li>
	                        <li>
	                            <a href="https://github.com/nix07">
	                                <span class="fa-stack fa-lg">
	                                    <i class="fa fa-circle fa-stack-2x"></i>
	                                    <i class="fa fa-github fa-stack-1x fa-inverse"></i>
	                                </span>
	                            </a>
	                        </li>
	                    </ul>
                    </div>
                </div>
            </div>
        </footer>
    	</body>
    </html>
        `);
});

var pool = new Pool(config);

app.get('/get-articles', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT * FROM article ORDER BY date DESC', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.get('/get-comments/articles/:articleName', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT comment.*, "user".username FROM article, comment, "user" WHERE article.title = $1 AND article.id = comment.article_id AND comment.user_id = "user".id ORDER BY comment.timestamp DESC', [req.params.articleName], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.post('/submit-comment/articles/:articleName', function (req, res) {
   // Check if the user is logged in
    if (req.session && req.session.auth && req.session.auth.userId) {
        // First check if the article exists and get the article-id
        pool.query('SELECT * from article where title = $1', [req.params.articleName], function (err, result) {
            if (err) {
                res.status(500).send(err.toString());
            } else {
                if (result.rows.length === 0) {
                    res.status(400).send('Article not found');
                } else {
                    var articleId = result.rows[0].id;
                    // Now insert the right comment for this article
                    pool.query(
                        "INSERT INTO comment (comment, article_id, user_id) VALUES ($1, $2, $3)",
                        [req.body.comment, articleId, req.session.auth.userId],
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err.toString());
                            } else {
                                res.status(200).send('Comment inserted!');
                            }
                        });
                }
            }
       });     
    } else {
        res.status(403).send('Only logged in users can comment');
    }
});

app.post('/message', function (req, res) {
   // username, password
   // {"username": "tanmai", "password": "password"}
   // JSON
   var name = req.body.name;
   //var email = req.body.email;
   var subject = req.body.subject;
   //var salt = crypto.randomBytes(128).toString('hex');
   //var dbString = hash(password, salt);
   pool.query('INSERT INTO messages (name, subject, message) VALUES ($1, $2, $3)',[name, subject, message], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('Message sent : ' + subject);
      }
   });
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
                res.send(createtemplate2(articleData));
            }
        }
    });
});

app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
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

app.get('/ui/js/test.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','js', 'test.js'));
});


app.get('/ui/js/test.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','js', 'test.js'));
});

app.get('/ui/article.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article.js'));
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

app.get('/index5.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index5.html'));
});

app.get('/articles/index5.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index5.html'));
});

app.get('/about.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'about.html'));
});

app.get('/butterfly.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'butterfly.html'));
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

app.get('/fonts/glyphicons-halflings-regular.eot', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','fonts', 'glyphicons-halflings-regular.eot'));
});

app.get('/fonts/glyphicons-halflings-regular.svgt', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','fonts', 'glyphicons-halflings-regular.svg'));
});

app.get('/fonts/glyphicons-halflings-regular.ttf', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','fonts', 'glyphicons-halflings-regular.ttf'));
});

app.get('/fonts/glyphicons-halflings-regular.woff', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','fonts', 'glyphicons-halflings-regular.woff'));
});

app.get('/fonts/glyphicons-halflings-regular.woff2', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','fonts', 'glyphicons-halflings-regular.woff2'));
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
