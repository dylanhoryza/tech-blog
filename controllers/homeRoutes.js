const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User
          
          // attributes: ['name'],
        },
      ],
    });

    // const commentData = await Comment.findAll({
     
    //   // where: { user_id: req.session.user_id },
    // })

    const commentData = await Comment.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: Blog}],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));
    console.log(comments);
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs);
    res.render('homepage', {
      blogs,
      comments
      
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/', async (req, res) => {
//   try {
//     const blogData = await Blog.findAll({
//       include: [
//         {
//           model: User,
//           // attributes: ['name'],
//         },
//         {
//           model: Comment, // Include comments related to each blog
//           include: [{ model: User }], // Optionally include user information for each comment
//         },
//       ],
//     });

//     // Optionally, if you want comments for a specific user, you can use this approach
//     // const commentData = await Comment.findAll({
//     //   where: { user_id: req.session.user_id },
//     //   include: [{ model: Blog, attributes: ['id'] }],
//     // });

//     const blogs = blogData.map((blog) => {
//       const plainBlog = blog.get({ plain: true });
//       // Extract comments for each blog and attach them to the plainBlog object
//       plainBlog.comments = plainBlog.Comments.map((comment) => comment.get({ plain: true }));
//       delete plainBlog.Comments; // Remove the Comments array from the plainBlog object
//       return plainBlog;
//     });

//     res.render('homepage', {
//       blogs,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });
    const user = userData.get({ plain: true });
    console.log(user);
    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/logout', (req, res) => {
  res.redirect('/');
});

module.exports = router;
