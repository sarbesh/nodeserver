const express = require('express'), 
router = express.Router(),
core = require('../service/core');

router.route('/hello')
.get(core.hello);

/**
 * GET request to /books
 */
 router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'All Books were fetched'
    });
});

module.exports = router;