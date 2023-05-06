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

router.route('/search_vaccine_pincode').post(core.search_vaccine_pincode);

router.route('/testing_api').post(core.testing_method);

module.exports = router;