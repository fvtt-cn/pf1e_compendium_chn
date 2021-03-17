var fs = require('fs');
console.log(JSON.parse(fs.readFileSync('./pf1e_cn_compendium/module.json', 'utf8')).version);
