const app = require('../app');

const request = require('request');
const cheerio = require('cheerio');

module.exports.test = (res, url) => {
    //console.log(url.replace(/!/gi, '/'));

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

module.exports.getSiteMap = (res, url) => {
    request('https://' + url.replace(/!/gi, '/'), function(error, response, html){
        var $ = cheerio.load(html);
        var aElems = $('.body-container ul a');
        var urls = [];

        for (var i in aElems) {
            if (aElems[i] && aElems[i].attribs && aElems[i].attribs.href) {
                urls.push(aElems[i].attribs.href);
            }
        }

        res.send(urls);
    });
}