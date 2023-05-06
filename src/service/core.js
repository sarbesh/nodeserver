const request = require('request');
const moment = require('moment');
const constants = require('../utilities/constants');
const _ = require('lodash');
const e = require('express');
const abtesting = require('../utilities/rule_engine/condition_engine');
const RuleEngine = require('../utilities/rule_engine/rule_engine');
const config = require("../config");

exports.hello = (req, res) => {
    console.log("Got hello");
    return res.send('{"message":"Hello world!"}');
};

exports.search_vaccine_pincode = (req, res) => {
    if (!req.body.pincode) {
        return res.status(400).send('{"message":"Pincode is required"}');
    }
    if (req.body.age && req.body.age <= 0) {
        return res.status(400).send('{"message":"Age should be greater than 0"}');
    }
    pincode = req.body.pincode;
    date = req.body.date ? req.body.date : moment().format('DD-MM-YYYY');
    age = req.body.age ? req.body.age : 0;
    logger.put('info', '[core][search_vaccine_pincode]' + JSON.stringify(req.body));
    uri = 'v2/appointment/sessions/public/calendarByPin?pincode=' + pincode + '&date=' + date;
    request.get({
        url: constants.cowin_url + uri,
        json: true
    }, (err, response, body) => {
        if (err) {
            logger.put('error', '[core][search_vaccine_pincode][Error]' + err);
            return res.status(500).send(err);
        } else if (response.statusCode === 200) {
            let data = [];
            body.centers.flatMap(cnt => {
                cnt.sessions.flatMap(sess => {
                    let precaution_dose = sess.available_capacity - (sess.available_capacity_dose1 + sess.available_capacity_dose2);
                    if (sess.available_capacity > 0 && (sess.allow_all_age === 'true' || (sess.min_age_limit <= age && sess.max_age_limit >= age))) {
                        logger.put('debug', '[core][search_vaccine_pincode][Data]Session:' + sess.session_id + ' Date:' + sess.date + ' capacity:' + sess.available_capacity);
                        data.push({
                            'center_id': cnt.center_id,
                            'center_name': cnt.name,
                            'center_address': cnt.address,
                            'fee_type': cnt.fee_type,
                            'session': sess.session_id,
                            'date': sess.date,
                            'available_capacity': sess.available_capacity,
                            'available_capacity_dose1': sess.available_capacity_dose1,
                            'available_capacity_dose2': sess.available_capacity_dose2,
                            'available_capacity_precaution': precaution_dose,
                            'min_age_limit': sess.min_age_limit,
                            'max_age_limit': sess.max_age_limit,
                            'allow_all_age': sess.allow_all_age,
                            'vaccine': sess.vaccine
                        });
                    }
                });
            });
            logger.put('info', '[core][search_vaccine_pincode][Success]');
            return res.status(200).send(data);
        } else {
            logger.put('info', '[core][search_vaccine_pincode][Error]');
            return res.status(response.statusCode).send(body);
        }
    });
}

exports.testing_method = (req, res) => {
    try {
        return res.status(200).send({ result: config.server_name });
    } catch (error) {
        return res.status(500).send({ "error": error.message });
    }
}