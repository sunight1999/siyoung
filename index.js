const express = require('express');
const testRoute = require('./routes/test');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json({
    limit: '50mb'
}));

app.listen(port, () => {
    console.log('server is listening on port ' + port);
});

// 라우트 처리
app.use('/', testRoute);

// 정적 파일 처리
app.use(express.static(__dirname + '/public'));

// 에러 처리
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        statusCode: res.statusCode,
        errMessage: err.errMessage
    });
});