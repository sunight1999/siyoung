const express = require('express');
const router = express.Router();

router
    .get('/', (req, res) => {
        res.render('html/main.html')
    })
    .get('/test', (req, res) => {
        res.json({
            sucess: true,
            test: 'test'
        });
    });

module.exports = router;