const RuleEngine = require("../rule_engine/rule_engine");

class AbTestingRule{
    constructor({endpoint, method, host, enable, name, condition}){
        this.endpoint = new RegExp(endpoint);
        this.method = method;
        this.host = host;
        this.is_enables = enable;
        this.name = name;
        this.condition = new RuleEngine(condition);
    }

    testRule(request){
        // console.log("testRule request.url:",request.url, this.endpoint);
        let is_url_match = this.endpoint.test(request.url);
        // console.log("testRule result:", is_url_match);
        if(is_url_match){
            return this.condition.executeRule(request);
        } else {
            return false;
        }
    }
}

module.exports = AbTestingRule;