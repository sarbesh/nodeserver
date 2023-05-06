const AbTestingRule= require("./abrule");
const axios = require('axios');


/**
 * @type {Array.<AbTestingRule>}
 */
const abtesting_rules = [];

/**
 * 
 * @param {AbTestingRule[]} config 
 * @returns 
 */
module.exports = function({config}){
    config.forEach(x => {
        console.log("Added:", x);
        abtesting_rules.push(new AbTestingRule(x));
    })
    return async(req, res, next) => {
        try{
            let is_proxy = false;
            abtesting_rules.forEach(async(x) => {
                // console.log("testing:", x);
                if(x.testRule(req)){
                    console.log("got hit for:", x.name);
                    is_proxy = true;
                    // res.redirect(x.host);
                    //TODO: redirect logic
                    let proxy_response = await axios({
                        method: req.method,
                        url: req.url,
                        baseURL: x.host,
                        data: req.body,
                        headers: req.headers
                    });
                    console.log(proxy_response);
                    return res.send(proxy_response.body);
                }
            });
            if(!is_proxy){
                return next();
            }
        } catch(error){
            console.log("Error:", error);
            next();
            res.send(500);
        }
    }
}