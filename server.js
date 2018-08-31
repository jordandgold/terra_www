'use strict';

var auth = require('http-auth');


var basic = auth.basic(
    {
      file: __dirname + "/users.htpasswd"
    }
);



var express = require('express'),
    exphbs  = require('express-handlebars'),
	yaml = require('js-yaml'),
    fileSync = require('fs'),
	app = express();

app.use(auth.connect(basic));


// Create `ExpressHandlebars` instance with a default layout.
var hbs = exphbs.create({
    defaultLayout: 'full-width',
    partialsDir: [
        'views/components/'
    ],
});


var helpers = require('handlebars-helpers')();

var path = require('path');

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '/public')));



function createPages() {

    let page_registry = yaml.safeLoad(fileSync.readFileSync('./views/register.pages.yml', 'utf8')),
        component_registry = yaml.safeLoad(fileSync.readFileSync('./views/pages/documentation/components/register.components.yml', 'utf8'));

    page_registry.forEach((page)=>{

        let input_data = yaml.safeLoad(fileSync.readFileSync('./views/pages/' + page.url + '/data.yml'));

        app.get('/' + page.url, function (req, res) {
            res.render('pages/' + page.url + '/' + page.name, input_data);
        });

    });

    component_registry.forEach((component)=>{

        let input_data = yaml.safeLoad(fileSync.readFileSync('./views/pages/documentation/components/' + component + '/data.yml'));

        app.get('/documentation/components/' + component, function (req, res) {
            res.render('pages/documentation/components/' + component + '/' + component, input_data);
        });

    });

}

app.get('/', function (req, res) {
    let input_data = yaml.safeLoad(fileSync.readFileSync('./views/pages/homepage/data.yml'));
    res.render('pages/homepage/homepage', input_data);
});

createPages();

app.get('*', function(req, res){
  res.render('pages/404/404', {layout: 'full-width', title: '404 | Terra Design System'});
});

app.listen(process.env.PORT || 3000, function () {
    console.log('server listening on: 3000');
});