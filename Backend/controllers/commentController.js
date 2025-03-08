const Comment = require('../models/Comment');

const deleteComment = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(401).json({ error: 'Los comentarios sólo pueden eliminarse por un administrador' });
  } else {
    const comment = await Comment.findByPk(req.params.id);
    await comment.destroy();
  
    res.json(comment.toJSON());
  }
}

module.exports = { deleteComment };