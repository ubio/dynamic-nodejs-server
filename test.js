const { exec } = require('./exec.js');

async function run() {
    const code = `
        const moment = require('moment');
        return moment(new Date(a)).format('YYYY-MM-DD');
    `
    console.log(await exec(code, { a: 'December 20 2021' }));
}

run();