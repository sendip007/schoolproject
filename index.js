const express = require('express')
const constants = require('./constants')
const mockArticles=constants.mockArticles
const app = express()
const port = 3000
const https = require('https');
const request = require('request');

app.get('/', (req, res) => res.send('The server is live'))
app.get('/news', (req, res) =>{
    let queryParams=req.query
    if (queryParams.hasOwnProperty('q')){
        request('https://newsapi.org/v2/top-headlines?category=entertainment&language=en&apiKey=4e96082c9ca2451ea7bbdffc2078039a', { json: true }, (err, _res, body) => {
        if (err) { return console.log(err); }
        // url=body.url
        // exp=body.explanation
        // console.log(_res.body);
        return res.send({message:_res.body,query:queryParams,error:null})
        });
        
    } else{
        return res.status(412).send({message:null,query:null,error:'q not specified in query'})
    }   
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))