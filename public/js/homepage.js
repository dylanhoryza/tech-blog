document.addEventListener('DOMContentLoaded', function() {
 
const addCommentBtns = document.querySelectorAll('.add-comment-btn');
const submitCommentBtns = document.querySelectorAll('.submit-comment');

//event listener to show comment section
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
// event listener for submitting comment button
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
      body: JSON.stringify({ text, blog_id: blogId }), 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const newCommentData = await response.json(); 

      // Create a new element for the comment
      const newComment = document.createElement('div');
      newComment.classList.add('card', 'custom-card', 'comment');

      newComment.innerHTML = `
        <div class="card-body">
          <p class="card-text">${newCommentData.text}</p>
        </div>
      `;

      const commentSection = document.querySelector(`#commentSection-${blogId}`);
      commentSection.appendChild(newComment);

      // Clear the comment textarea after posting
      document.getElementById(`comment-${blogId}`).value = '';

      console.log('Comment added successfully');
    } else {
      console.error('Failed to add comment');
      alert('Failed to add comment');
    }
  } catch (error) {
    console.error('Error', error);
    alert('Error occurred while adding comment');
  }
}


