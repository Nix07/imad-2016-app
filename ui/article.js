// Eg: coco98.imad.hasura-app.io/articles/article-one will result in article-one
var currentArticleTitle = window.location.pathname.split('/')[2];

function loadCommentForm () {
    var commentFormHtml = `
        <div class="row">
			<div class="col-md-12">
				<div class="well">
					<div class="text-right">
						<button class="btn btn-danger" data-target="#comment" data-toggle="modal">Leave a reply</button>
					</div>
					<br>
					<div class="modal fade" id="comment">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<button class="close" data-dismiss="modal">&times;</button>
									<h4 class="modal-title">Comment Box</h4>
								</div>
								<div class="modal-body">
									<form>
										<div class="form-group">
											<textarea class="form-control" rows="5" style="font-size: 20px; color: grey;" id="comment_text" placeholder="Enter your comment here..."></textarea>
										</div>
									</form>
								</div>
								<div class="modal-footer">
									<button class="btn btn-danger" data-dismiss="modal" id="submit">Submit </button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
        `;
    var cmt = document.getElementById('comment_form');
    cmt.innerHTML = commentFormHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('submit');
    submit.onclick = function () {
        // Create a request object
        var comments = document.getElementById('comment_text').value;
        if (comments==='') {
           alert("Comment can't be empty!");
           return;
        }
    
        if (comments.length===0){
            alert("Comment can't be empty!");
            return;
        }
        var request = new XMLHttpRequest();
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
                if (request.status === 200) {
                    // clear the form & reload all the comments
                    // Make the request
                    document.getElementById('comment_text').value = '';
                    loadComments();    
                } else {
                    alert('Error! Could not submit comment');
                }
                submit.value = 'Submit';
          }
        };
        
        // Make the request
        var comment = document.getElementById('comment_text').value;
        request.open('POST', '/submit-comment/articles/' + currentArticleTitle, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({comment: comment}));  
        submit.value = 'Submitting...';
        
    };
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadCommentForm(this.responseText);
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function escapeHTML (text)
{
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}

function loadComments () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var comments = document.getElementById('comments');
            console.log(request.status);
            if (request.status === 200) {
                var content = '';
                var commentsData = JSON.parse(this.responseText);
                for (var i=0; i< commentsData.length; i++) {
                    var time = new Date(commentsData[i].timestamp);
                    content += `
                    
                    <div class="well">
					<span class="lead">${commentsData[i].username}</span>
					<span class="pull-right" style="font-family: 'PT Mono', monospace;">${time.toLocaleTimeString()} on ${time.toLocaleDateString()}</span><hr>
					<p style="font-family: 'PT Mono', monospace;">
						${escapeHTML(commentsData[i].comment)}
					</p>
				</div>
				`;
                }
                comments.innerHTML = content;
            } else {
                comments.innerHTML= 'Oops! Could not load comments!';
            }
        }
    };
    
    request.open('GET', '/get-comments/articles/' + currentArticleTitle, true);
    request.send(null);
}


// The first thing to do is to check if the user is logged in!
loadLogin();
loadComments();
