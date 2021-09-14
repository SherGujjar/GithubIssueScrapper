const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
function issues(url,filename,reponame){
    request(url,cb);
    function cb(err,response,html){
        if(err){
            console.log(err);
        }
        else{
            const $ = cheerio.load(html);
            const issuesArray = $('.Box.mt-3 .Link--primary')
            let arr = [];
            for(let i=0;i<$(issuesArray).length;i++){
                const link = $(issuesArray[i]).attr('href');
                arr.push(link);
            }
            const filePath=path.join(__dirname,filename,reponame+".json");
            console.log(filePath)
            fs.writeFileSync(filePath,JSON.stringify(arr,null,2))
        }
}


}


module.exports = {issues};
