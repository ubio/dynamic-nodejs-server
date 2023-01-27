const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json({ limit: 10_000_000 }));
const { exec } = require('./exec');

app.get('/', function (req, res) {
    res.send('ok');
});

app.post('/exec', async function (req, res) {
    const script = req.body.script;
    const args = req.body.args;
    try {
        const result = await exec(script, args);
        res.send(JSON.stringify(result));
    } catch (err) {
        res.status(500).send({ error: err, stack: err.stack });
    }
});

app.listen(port, () => {
    console.log('Listening on ' + port);
});