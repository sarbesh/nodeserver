const Condition = require('./condition_engine');

class Decision{
    /**
     * 
     * @param {Condition} condition 
     */
    constructor(condition) {
        // console.log("Decision", condition);
        this.ALL = condition.AND && Array.isArray(condition.AND) ? condition.AND.map(x => new Decision(x)): undefined;
        this.ANY = condition.OR && Array.isArray(condition.OR) ? condition.OR.map(x => new Decision(x)): undefined;
        this.NOT = condition.NOT && !Array.isArray(condition.NOT) ? new Decision(condition.NOT): undefined;
        this.condition = condition;
    }

    executeDecision(data_to_validate) {
        // console.log("executeDecision", this)
        if (this.ALL || this.ANY || this.NOT) {
            if (this.ALL && Array.isArray(this.ALL)) {
                // console.log("running AND");
                return this.ALL.every(x => x.executeDecision(data_to_validate));
            } else if (this.ANY && Array.isArray(this.ANY)) {
                // console.log("running OR");
                return this.ANY.some(x => x.executeDecision(data_to_validate));
            } else if (this.NOT && this.NOT instanceof Decision) {
                // console.log("running NOT");
                return !this.NOT.executeDecision(data_to_validate);
            } else if(this.NOT && Array.isArray(this.NOT)){
                throw new Error("NOT passed is array needs to be a Decision Object")
            }
        } else {
            // console.log("decision consition:", this);
            return new Condition(this.condition.source, this.condition.path, this.condition.operation, this.condition.value).getConditionResult(data_to_validate);
        }
    }
}

module.exports = Decision;