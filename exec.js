const fs = require('fs');
const child_process = require('child_process');
const crypto = require('crypto');
const { assert } = require('console');

module.exports = { exec };

async function exec(script, args) {
    const scriptHash = hash(script);
    if (!exists(scriptHash)) {
        await save(script);
    }
    const code = '(function run () {' + Object.keys(args).map(key => `${key} = ${JSON.stringify(args[key])};`).join(';') + script + '})();';
    return eval(code);
}

function hash(script) {
    return sha256(script);
}

function exists(hash) {
    const scriptPath = `./scripts/${hash}.js`;
    return fs.existsSync(scriptPath);
}

async function save(script) {
    const scriptHash = hash(script);
    const scriptPath = `./scripts/${scriptHash}.js`;
    if (!fs.existsSync(scriptPath)) {
        console.log('saving', script);
        fs.writeFileSync(scriptPath, script);
        await install(scriptPath);
    }
}

async function install(scriptPath) {
    const script = fs.readFileSync(scriptPath).toString();
    const deps = [];

    // extract the import dependecies from the script
    const importRegex = /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/ig;
    const importMatches = script.matchAll(importRegex);

    for (const match of importMatches) {
        deps.push(match[4]);
    }

    // extract the require depdencies from the script
    const requireRegex = /require\(['"](.*?)['"]\)/g;
    const requireMatches = script.matchAll(requireRegex);

    for (const match of requireMatches) {
        deps.push(match[1]);
    }

    // check to see which dependencies are already installed
    const missingDeps = [];
    deps.forEach(dep => {
        const exists = fs.existsSync('./node_modules/' + dep);
        if (!exists) {
            missingDeps.push(dep);
        }
    });

    for (dep of missingDeps) {
        child_process.execSync('npm install ' + dep, {stdio: [0, 1, 2]});
    }
}

function sha256(message) {
    return crypto.createHash('sha256').update(message).digest('hex');
}