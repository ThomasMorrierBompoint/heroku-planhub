const app = require('../app');

const request = require('request');

module.exports.test = (res, url) => {
    request('https://' + url.replace(/!/gi, '/'), function(error, response, html){
        if(!error) {
            res.send(response);
        } else {
            res.status(400).send({
                msg: 'An error occured',
                error: error
            });
        }
    });
}