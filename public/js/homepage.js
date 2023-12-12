document.addEventListener('DOMContentLoaded', function() {
 
const addCommentBtns = document.querySelectorAll('.add-comment-btn');
const submitCommentBtns = document.querySelectorAll('.submit-comment');
 
for (const addCommentBtn of addCommentBtns) {
  addCommentBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const commentForm = this.nextElementSibling;
    if (commentForm.classList.contains('hide')) {
      commentForm.classList.remove('hide');
    } else {
      commentForm.classList.add('hide');
    }
  });
}

submitCommentBtns.forEach(submitCommentBtn => {
  submitCommentBtn.addEventListener('click', async function(event) {
    event.preventDefault();
    console.log('comment posted');
    const blogId = submitCommentBtn.dataset.blogId;
    await postComment(blogId);
    
  })
})

});


// add comment to blog
async function postComment(blogId) {
  const text = document.getElementById(`comment-${blogId}`).value;
  try {
    const response = await fetch('/api/comment/', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('comment added');
      const blogPost = document.querySelector(`#commentSection-${blogId}`);
  
  // Create a new element for the comment
  const newComment = document.createElement('div');
  newComment.classList.add('comment'); // Add a class to style the comment
  
  // Construct the comment HTML structure
  newComment.innerHTML = `
    <p>${text}</p>
    <!-- Any additional comment details or styling -->
  `;
  
  // Append the new comment to the blog post
  blogPost.appendChild(newComment);
    }
    
  } catch (error) {
    console.error('Error', error);
    alert('Error occured while adding comment');
  }
}
