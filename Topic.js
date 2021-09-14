const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const Issues = require('./issues')
const path = require('path');

function repos(err,response,html){
    if(err){
        console.log(err);
    }
    else{
        const $ = cheerio.load(html);
        const repository = $('article  h3 a[data-hydro-click]');
        const filename = $('.h1').text().trim();
        
        for(let i=0;i<16;i+=2){
            const repositoryLink = $(repository[i+1]).attr('href');
            const reponame = $(repository[i+1]).text().trim();
      //      console.log(reponame)
            const fullLink = "https://github.com/"+repositoryLink+"/issues";
            Issues.issues(fullLink,filename,reponame)
        }
    }
 

}




module.exports = {repos};