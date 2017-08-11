var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var fs = require('fs');
var pathJSON = path.join(__dirname, 'data.json');
var clientPath = path.join(__dirname, 'client');



app.use(express.static(clientPath));
app.use(bodyParser.json());


app.route('/api/characters')
    .get(function(req, res){
        res.sendFile(pathJSON)
    });

app.route('/api/characters/house/:house')
    .get(function(req, res) {
        console.log('get single item');
        fs.readFile(pathJSON, 'utf-8', function(err, file){
            if (err){
                res.status(500);
                res.send('Unable to find single message.')
            }
            var house = req.params.house;
            console.log(house);
            var result;
            var data = JSON.parse(file);
            data.forEach(function(post){
                if (post.house === house){
                    result = post;
                }
            });
            if (result) {
                res.send(result);
            } else {
                res.send(404);
            }
        })
    });

app.route('/api/characters/one/:id')
    .get(function(req, res) {
        console.log('get single item');
        fs.readFile(pathJSON, 'utf-8', function(err, file){
            if (err){
                res.status(500);
                res.send('Unable to find single message.')
            }
            var id = req.params.id;
            console.log(id);
            var result;
            var data = JSON.parse(file);
            data.forEach(function(post){
                if (post.id === id){
                    result = post;
                }
            });
            if (result) {
                res.send(result);
            } else {
                res.send(404);
            }
        })
    });

app.listen(3000);
console.log('listening');