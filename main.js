const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const Topic = require('./Topic');


const url = "https://github.com/topics"; 


request(url,cb);

function cb(err,response,html){
    if(err){
        console.log(err);
    }
    else{
        const $ = cheerio.load(html);
        const threeTopic = $('.container-lg.p-responsive.mt-6 ul li');
        for(let i = 0;i<$(threeTopic).length;i++){
            const link = $(threeTopic[i]).find('a').attr('href');
            const topicName = $(threeTopic[i]).find('.lh-condensed').text().trim();
    //        console.log(topicName)
            const filepath = path.join(__dirname,topicName)
            makeDir(filepath) 
            const fullink = "https://github.com"+link;
            console.log(fullink)
            request(fullink,Topic.repos)
        }
    }
}

function makeDir(filePath){
    if(fs.existsSync(filePath)==false){
        fs.mkdirSync(filePath);
    }
}