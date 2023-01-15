const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json({ limit: 10_000_000 }));
const { exec } = require('./exec');

app.post('/exec', async function (req, res) {
    const script = req.body.script;
    const args = req.body.args;
    const result = await exec(script, args);
    res.send(JSON.stringify(result));
});

app.listen(port, () => {
    
});