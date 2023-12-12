document.addEventListener('DOMContentLoaded', function() {
  const newPostButton = document.querySelector('.new-btn');
  const contentSection = document.getElementById('contentSection');
  const updateSection = document.getElementById('updateSection');
  const updateButtons = document.querySelectorAll('.update-blog');
  const submitButtons = document.querySelectorAll('.post-update-btn');

  newPostButton.addEventListener('click', function() {
    console.log('clicked')
    // Toggle visibility of the content section
    contentSection.classList.toggle('hide');
  });

  const submitBlog = document.querySelector('.post-submit-btn');
  submitBlog.addEventListener('click', async function(event) {
    event.preventDefault();
    await postBlog();
  });


  updateButtons.forEach(updateButton => {
  updateButton.addEventListener('click', function(event) {
    event.preventDefault();
    const updateSection = updateButton.parentElement.nextElementSibling;
    updateSection.classList.toggle('hide');
  });
});

submitButtons.forEach(submitButton => {
  submitButton.addEventListener('click', async function(event) {
    event.preventDefault();
    const blogId = submitButton.dataset.blogId;
    await updateBlog(blogId);
  })
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


// Update blog function
async function updateBlog(blogId) {
  const title = document.querySelector(`#blog-title-update-${blogId}`).value;
  const description = document.querySelector(`#blog-content-update-${blogId}`).value;
  // const blogId = event.target.dataset.blogId;

  if (blogId !== null) {
  try {
    const response = await fetch(`/api/blog/${blogId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('blog updated');
    }
    
  } catch (error) {
    console.log('Error:', error);
    alert('Error occured while updating blog')
  }
  }
   
}
