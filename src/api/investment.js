const express = require("express"),
router = express.Router(),
service = require('../service/investment_service');

router.route("/")
.post(service.saveInvestment);

router.route("/")
.get(service.getAll);

router.route("/:id")
.delete(service.deleteById);

router.route("/:id")
.put(service.updateById);

module.exports=router;