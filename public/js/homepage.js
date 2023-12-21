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
// async function postComment(blogId) {
//   const text = document.getElementById(`comment-${blogId}`).value;
//   // const blogId = document.querySelector('input[name="blog-id"]').value;
//   try {
//     const response = await fetch('/api/comment/', {
//       method: 'POST',
//       body: JSON.stringify({ text }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       console.log('comment added');
//       const blogPost = document.querySelector(`#commentSection-${blogId}`);
  
//   // Create a new element for the comment
//   const newComment = document.createElement('div');
//   newComment.classList.add('comment'); 
  
  
//   newComment.innerHTML = `
//     <p>${text}</p>
//     <!-- Any additional comment details or styling -->
//   `;
  
//   // Append the new comment to the blog post
//   blogPost.appendChild(newComment);
//     }
    
//   } catch (error) {
//     console.error('Error', error);
//     alert('Error occured while adding comment');
//   }
// }

async function postComment(blogId) {
  const text = document.getElementById(`comment-${blogId}`).value;

  try {
    const response = await fetch('/api/comment/', {
      method: 'POST',
      body: JSON.stringify({ text, blog_id: blogId }), // Include the blog_id in the request body
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const newCommentData = await response.json(); // Retrieve the newly created comment data from the response

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


// const commentFormHandler = async function(event) {
//   event.preventDefault();

//   const postId = document.querySelector('input[name="post-id"]').value;
//   const body = document.querySelector('textarea[name="comment-body"]').value;

//   if (body) {
//     await fetch('/api/comment', {
//       method: 'POST',
//       body: JSON.stringify({
//         postId,
//         body
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     document.location.reload();
//   }
// };

// document
//   .querySelector('#new-comment-form')
//   .addEventListener('submit', commentFormHandler);