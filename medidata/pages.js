const ejs = require('ejs'),
fs = require('fs'),
config = require('./_config.json');

config.db = require('./db.json');

let pages = ['index', 'faq', 'contact'],
options = {

}

delete config.include;

for (let i = 0; i < pages.length; i++) {
  config.pages.current = pages[i];
  ejs.renderFile('./page/'+ pages[i] + '.tpl', config, function(err, str){
      if(err){return console.log(err)}

      fs.writeFile('./public/' + pages[i] + '.html', str, function(err){
        if(err){return console.log(err)}

      })
  });
}
