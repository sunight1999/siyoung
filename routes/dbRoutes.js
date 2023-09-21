const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'siyoung'
});

con.connect(function(err) {
    if (err){
        throw err;
    }
});

router
    .post('/query/getAnimalHeatMap', (req, res) => {
        res.render('html/main.html')
    })
    .post('/query/getAllAnimalAddress', (req, res) => {
        con.query("select coord_x, coord_y from animal_registered_company", (err, rows) => {
            if (err){
                throw err;
            }

            res.json(rows);
        })
    })
    .post('/query/getAllAddress', (req, res) => {
        con.query("select address_road from animal_registered_company", (err, rows) => {
            if (err){
                throw err;
            }
    
            res.json(rows);
        });
    })
    .post('/query/setCoordinates', (req, res) => {
        console.log(req.body.addr);

        var query = 'update ' + req.body.table + ' set coord_x=' + req.body.x + ', coord_y=' + req.body.y + ' where ' + req.body.addr_col + '=\'' + req.body.addr + '\'';
        //console.log(query);
        con.query(query, (err, rows) => {
            if (err){
                res.status(500).json({message: 'failed to update row.'});
                throw err;
            }

            res.sendStatus(200);
        });
    })
    

module.exports = router;