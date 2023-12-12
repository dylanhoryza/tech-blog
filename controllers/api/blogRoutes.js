const router = require('express').Router();
const { Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:blogId', async (req, res) => {
  try {
    const blogData = await Blog.update(req.body, {
      where: {id:req.params.blogId}
    })
    res.json({blogData, message: "blog updated"});
  } catch (error) {
    res.status(500).json(error);
  }
});

// just for testing

router.get('/allblogs', async (req, res) => {
  try {
    const blogData = await Blog.findAll()
    res.json(blogData);
  } catch (error) {
    res.status(500).json(error);
  }
})

router.delete('/:blogId', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.blogId,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No budget found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/userblog/', async (req, res) => {
  try {
    const userBlogData = await User.findOne({
      where: {id: req.session.user_id},
      include: [Blog]
    })
    res.status(200).json(userBlogData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
})


module.exports = router;