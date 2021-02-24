const fs = require('fs');
const http = require('http');
const url = require('url');
const tpl = require('art-template');
const server = http.createServer();
let comments = [
    {
        uname: 'miles',
        content: '哈哈哈',
        date: '2019-01-01'
    },
    {
        uname: 'miles',
        content: '哈哈哈',
        date: '2019-01-01'
    },
    {
        uname: 'miles',
        content: '哈哈哈',
        date: '2019-01-01'
    },
    {
        uname: 'miles',
        content: '哈哈哈',
        date: '2019-01-01'
    },
    {
        uname: 'miles',
        content: '哈哈哈',
        date: '2019-01-01'
    },
];
server.on('request', (req, res) => {
    let newurl = url.parse(req.url, true);
    let pathurl = newurl.pathname;
    if (pathurl === '/') {
        fs.readFile('./views/index.html', (err, data) => {
            if (err) {
                return res.end('not found 404');
            };
            let newData = tpl.render(data.toString(), {
                comment: comments,
            });
            res.end(newData);
        });
    } else if (pathurl.includes('/public/')) {
        fs.readFile(`.${pathurl}`, (err, data) => {
            if (err) {
                return res.end('not found 404');
            };
            res.end(data);
        });
    } else if (pathurl === '/post') {
        fs.readFile('./views/post.html', (err, data) => {
            if (err) {
                return res.end('not found 404');
            };
            res.end(data);
        });
    } else if (pathurl === '/pinglun') {
        console.log(newurl);
        let comment = newurl.query;
        comment.date = '2019-01-01';
        comments.unshift(comment);
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    } else {
        fs.readFile('./views/404.html', (err, data) => {
            if (err) {
                res.end('not found 404');
            };
            res.end(data);
        });
    };
});
server.listen(4999, () => console.log('runngin'));