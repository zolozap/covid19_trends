const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();
const path = require('path');

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/day/:days', (req, res) => {
    console.log("day get:",req.params.days)
    
    new Promise((resolve, reject) => {
        request({
            url: "https://disease.sh/v3/covid-19/historical?lastdays="+req.params.days
        }, function (err, resp, body) {
            if (err) resolve('Error')
            if (resp) console.log('ok')
            if (body) resolve(body)
        })
    }).then(value => { res.send(value) })
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'))
})

app.listen(3000)
