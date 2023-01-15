const moment = require("moment");

async function run () {
    return moment(new Date()).format('YYYY-MM-DD');
}

module.exports.run = run;