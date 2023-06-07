import express from 'express';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended : true}))

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


// set templating engine
app.set('view engine', 'ejs');
//where the templates are stored
app.set('views', 'views');

// public folder location
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
// Routing

let userInfo = {
    "rainAmount": 180,
    "waterDrains": 2,
    "rainBarrels": 1,
    "roofSurface": 20,
}

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/empty', (req, res) => {
    console.log(userInfo.rainAmount)
    if (userInfo.rainAmount > 1) {
        userInfo.rainAmount = 0
        console.log(userInfo.rainAmount)
        res.render('empty')
    } else {
        res.render('emptyError')
    }
})

app.get('/settings', (req, res) => {
    res.render('settings', { userInfo: userInfo })
})

app.get('/saved', (req, res) => {
    res.render('saved', { userInfo: userInfo })
})

app.get('/edit', (req, res) => {
    // console.log(req.query.Dakoppervlak)
    userInfo.roofSurface = req.query.Dakoppervlak
    userInfo.rainBarrels = req.query.Regenpijpen
    userInfo.waterDrains = req.query.Regentonnen
    res.redirect('/saved')
})

app.get('/offline', (req, res) => {
    res.render('offline')
})

function server() {
    console.log('The server is running succesfully! at http://localhost:3000/');
}

app.listen(port, server)