const express = require('express');
const testRoute = require('./routes/test');
const app = express();
const ejs = require('ejs')

const port = process.env.PORT || 3000;

app.use(express.json({
    limit: '50mb'
}));
app.set('view engine', ejs)
app.set('views', __dirname + '/public')
app.engine('html', ejs.renderFile)

app.listen(port, () => {
    console.log('server is listening on port ' + port);
});

// 정적 파일 처리
app.use(express.static(__dirname + '/public'));

// 라우트 처리
app.use('/', testRoute);

// 에러 처리
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        statusCode: res.statusCode,
        errMessage: err.errMessage
    });
});