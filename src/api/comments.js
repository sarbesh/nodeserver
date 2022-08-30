const comments = require('../service/comments'),
    express = require('express'),
    router = express.Router();

router.route('/comments').get(comments.read_comments);

router.route('/comments').post(comments.create_comments);


module.exports = router;

