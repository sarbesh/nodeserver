const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
    type: String,
    fy: String,
    year: Number,
    plan: String,
    issuer: String,
    uniqueId: String,
    premium: Number,
    payTerm: Number,
    payTill: {
        type: Number,
        default: function(){
            return this.year+this.payTerm;
        }
    },
    term: Number,
    returnAt: {
        type: Number,
        default: function(){
            return this.year+this.term;
        }
    },
    return: Number,
    comment: String
});

module.exports = mongoose.model('investment',InvestmentSchema,'Investment');