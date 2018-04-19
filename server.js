'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
	yaml = require('js-yaml'),
    fileSync = require('fs'),
	app = express();

// Create `ExpressHandlebars` instance with a default layout.
var hbs = exphbs.create({
    defaultLayout: 'main',
    partialsDir: [
        'views/components/'
    ]
});

var path = require('path');

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '/public')));

function createPages() {

    let page_registry = yaml.safeLoad(fileSync.readFileSync('./views/register.pages.yml', 'utf8'));

    page_registry.forEach((page)=>{

        let input_data = yaml.safeLoad(fileSync.readFileSync('./views/pages' + page.url + '/data.yml'));

        app.get(page.url, function (req, res) {
            // let data = yaml.safeLoad(fileSync.readFileSync('./views/pages' + page.url + '/data.yml', 'utf8'));
            res.render('pages' + page.url + '/' + page.name, input_data);
        });

    });

}

app.get('/', function (req, res) {
    res.render('pages/homepage/homepage', {layout: 'main', title: 'SketchUp | 3D For Everyone'});
});

createPages();

app.get('*', function(req, res){
  res.render('pages/404/404', {layout: 'main', title: 'SketchUp | 3D For Everyone'});
});

// app.get('/pricing', function (req, res) {
//     let data = yaml.safeLoad(fileSync.readFileSync('./views/pages/pricing/data.yml', 'utf8'));
//     res.render('pages/pricing/pricing', data);
// });

app.listen(3000, function () {
    console.log('server listening on: 3000');
});
