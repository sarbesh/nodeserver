const res = require('express/lib/response'),
models = require('../models');
const InvestmentModel = require('../models/investment');

exports.saveInvestment = (req,res) => {
    var investment = req.body;
    console.log(investment);
    var newInvestment = new InvestmentModel({
        type: investment.type,
        fy: investment.fy,
        year: investment.year,
        plan: investment.plam,
        issuer: investment.issuer,
        uniqueId: investment.uniqueId,
        premium: investment.premium,
        payTerm: investment.payTerm,
        term: investment.term,
        return: investment.return,
        comment: investment.comment
    })
    newInvestment.save( (err, response) => {
        if(err){
            console.log(err);
            res.json({message: "Database error", type: "error"});
        } else {
            console.log(response);
            res.send(response);
        }
    })
}

exports.getAll = (req,res) => {
    InvestmentModel.find((err,response) => {
        if(err){
            console.log(err);
        } else {
            console.log(response);
            res.send(response);
        }
    });
};

exports.deleteById = (req,res) => {
    var id = req.params.id;
    InvestmentModel.findByIdAndDelete(id, (err,data) => {
        if(err){
            res.json({message: err});
        } else {
            res.json({"message": id+" deleted","data": data});
        }
    })
}

exports.updateById = (req,res) => {
    InvestmentModel.findByIdAndUpdate(req.params.id, req.body, (err,data) => {
        if(err){
            console.log(err);
            res.json({"message": err});
        } else {
            res.json({"data": data});
        }
    })
}