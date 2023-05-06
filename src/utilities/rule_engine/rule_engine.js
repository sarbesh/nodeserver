const Condition = require("./condition_engine");
const Decision = require("./decision_engine");


class RuleEngine {
   constructor(object){
    // console.log("RuleEngine", object)
    this.condition = new Decision(object);
   }

   executeRule(data){
   //  console.log("executeRule", this);
    let result = this.condition.executeDecision(data);
    return result;
   }
}

module.exports = RuleEngine;