var register = document.getElementById('submit_btn');
  register.onclick = function () {
      // Create a request object
      var request = new XMLHttpRequest();
      // Capture the response and store it in a variable
      request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            // Take some action
            if (request.status === 200) {
                alert('Message sent successfully');
                register.value = 'Registered!';
            }else if (request.status === 0) {
                alert('Message sent successfully');
                register.value = 'Registered!';
            }
            else {
                console.log(request.status);
                alert('Error in sending message');
                register.value = 'Register';
            }
        }
      };
      
      // Make the request
      var name = document.getElementById('name').value;
      var subject = document.getElementById('subject').value;
      var message = document.getElementById('message').value;
       if (name==='' || message==='' || subject==='') {
           alert("Field can't be empty!");
           return;
        }
        
        if (name.length===0 || message.length===0 || subject.length===0){
            alert("Field can't be empty!");
            return;
        }
      request.open('POST', '/message', true);
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify({name:name, subject:subject , message:message}));  
      register.value = 'Sending...';
  
  };

/*app.post('/message', function (req, res) {
   // username, password
   // {"username": "tanmai", "password": "password"}
   // JSON
   var name = req.body.name;
   var email = req.body.email;
   var subject = req.body.subject;
   var message = req.body.message;
   //var salt = crypto.randomBytes(128).toString('hex');
   //var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (name, email, subject, message) VALUES (name, email, subject, message)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('Message sent : ' + subject);
      }
   });
});*/