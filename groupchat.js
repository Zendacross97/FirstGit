const express = require('express');
const chat = express();
const fs = require('fs');
const bodyParser = require('body-parser');

chat.use(bodyParser.urlencoded({ extended: false }));

chat.get('/login', (req, res, next) => {
    res.send(`
        <form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/login" method="POST">
            <input id="username" type="text" name="username" placeholder="username">
            <button type="submit">Login</button>
        </form>
    `);
});

chat.post('/login', (req, res, next) => {
    res.redirect('/');
});

chat.get('/', (req, res, next) => {
    fs.readFile('chat.txt', (err, data) => {
        if (err) {
            console.log(err);
            data='No messages yet';
        }
        res.send(`
            <h1>Chat Messages</h1>
            <div>${data.toString().replace(/\n/g, '<br>')}</div><br>
            <form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')">
                <input type="hidden" id="username" name="username">
                <input id="message" type="text" name="message" placeholder="message">
                <button type="submit">Send</button>
            </form>
        `);
        
    });
});

chat.post('/', (req, res, next) => {
    fs.appendFile('chat.txt', `${req.body.username}: ${req.body.message}\n`, (err) => {//for fs.writeFile we can use {flag: 'a'} to append
        if (err) {
            console.log(err);
            res.send('<h1>Error sending message</h1>');
        } else {
            res.redirect('/');
        }
    });
});

chat.listen(3000, () => {
    console.log('Server is running');
});