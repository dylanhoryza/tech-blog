const router = require('express').Router();
const { Comment, User, Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      }, {
        // include: [Blog],
      });
    res.status(200).json(newComment);
  } catch (error) {
    res.status(400).json(error);
  }
})

router.get('/allcomments', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: {model: Blog},
    })
    res.json(commentData);
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;