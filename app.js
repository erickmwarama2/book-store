const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res) => {
    res.status(404);
    // res.send('<h1> Page not found </h1>');
    res.sendFile(path.join(__dirname, 'views', '404.html'));
});

// app.use('/', (req, res, next) => {
//     console.log('This always runs');
//     next();
// });


// const server = http.createServer(app);
// server.listen(3050, () => {
//     console.log('listening on port 3050');
// });
app.listen(3050, () => {
    console.log('app listening on 3050');
});

function rqListener(req, res) {
    // console.log(req);
    // process.exit();

    // console.log(req.url);
    // console.log(req.method);
    // console.log(req.headers);

    const url = req.url;

    if (url == '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title> Enter message </title></head>');
        res.write('<body><form action="/message" method="POST"><input name="message" type="text"/><button type="submit"> Send </button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url == '/message' && req.method == 'POST') {
        const body = [];
        req.on('data', function(chunk) {
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', function() {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            // fs.writeFileSync('message.txt', message);
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });

        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first page </title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
}

// const server = http.createServer(rqListener);

// server.listen(3040, () => {
//     console.log('listening on port 3040');
// });