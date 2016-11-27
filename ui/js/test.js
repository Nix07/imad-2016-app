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
                register.value = 'Submit';
            }else if (request.status === 0) {
                alert('Message sent successfully');
                register.value = 'Submit';
            }
            else {
                console.log(request.status);
                alert('Error in sending message');
                register.value = 'Submit';
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
      request.send(JSON.stringify({name:name,subject:subject , message:message}));  
      register.value = 'Sending...';
  
  };