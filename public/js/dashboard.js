document.addEventListener('DOMContentLoaded', function() {
  const newPostButton = document.querySelector('.new-btn');
  const contentSection = document.getElementById('contentSection');

  newPostButton.addEventListener('click', function() {
    console.log('clicked')
    // Toggle visibility of the content section
    contentSection.classList.toggle('hide');
  });

  const submitBlog = document.querySelector('.post-submit-btn');
  submitBlog.addEventListener('click', async function(event) {
    event.preventDefault();
    await postBlog();
  })
});

// Create new Blog post

async function postBlog() {
  const title = document.querySelector('#blog-title').value;
  const description = document.querySelector('#blog-content').value;

  try {
    const response = await fetch('/api/blog/', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log('blog added successfully');
    }
    
  } catch (error) {
    console.log('Error:', error);
    alert('Error occured while creating new blog')
    
  }
}