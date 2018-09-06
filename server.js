const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let logVar = `${now}: ${req.method} ${req.url}`;
    console.log(logVar);
    fs.appendFile('server.log', logVar + '\n', (e) => {
        e ? console.log(e) : null;
    });
    next();
});

/* app.use((req, res, next) => {
    res.render('maintenance.hbs');
}); */

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to this website.'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});