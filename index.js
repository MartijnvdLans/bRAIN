import express from 'express';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { getWeatherData } from './functions/weatherAPI.js';

const app = express();
const port = 4500;
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
    "rainAmount": null,
    "waterDrains": null,
    "rainBarrels": null,
    "roofSurface": null,
    "rainBarrelEmptied": false,
}

function testRainCollection() {
    if (!userInfo.rainBarrelEmptied) {
    let fakeData = {
      daily: {
        precipitation_sum: [ 5.00, 2.00] // Adjust these values for different tests
      }
    };
  
    let totalRain = 0;
    fakeData.daily.precipitation_sum.forEach((precipitation) => {
      totalRain += precipitation;
    });
    
    userInfo.roofSurface = 34; 
    userInfo.rainAmount = Math.round(totalRain * userInfo.roofSurface);;
    if (userInfo.rainAmount > 400) {
        userInfo.rainAmount = 400;
    }
    console.log(`Total rain collected: ${userInfo.rainAmount}`);
}
  }
  
  // Run the test
  testRainCollection();

  app.get('/', (req, res) => {
    const currentPage = 'home'
    let options = { day: 'numeric', month: 'long', year: 'numeric' };
    let currentDate = new Date().toLocaleDateString('nl-NL', options);
    console.log(`Rendering index page with rain amount: ${userInfo.rainAmount}`);
    if (userInfo.rainBarrels == null) {
        res.render('zero', { currentDate: currentDate })
    } else {
        res.render('index', { userInfo: userInfo, currentDate: currentDate, currentPage })
    }
});

app.get('/test', (req, res) => {
    const currentPage = 'home'
    let options = { day: 'numeric', month: 'long', year: 'numeric' };
    let currentDate = new Date().toLocaleDateString('nl-NL', options);
    console.log(`Rendering index page with rain amount: ${userInfo.rainAmount}`);
    if (userInfo.rainBarrels == null) {
        res.render('zero', { currentDate: currentDate })
    } else {
        res.render('index', { userInfo: userInfo, currentDate: currentDate, currentPage })
    }
});

app.get('/firstInfo', (req, res) => {
    // console.log(req.query.Dakoppervlak)
    userInfo.roofSurface = req.query.boardingDak
    userInfo.rainBarrels = req.query.boardingPijpen
    userInfo.waterDrains = req.query.boardingTonnen
    res.redirect('/')
})

app.get('/empty', (req, res) => {
    console.log(userInfo.rainAmount)
    if (userInfo.rainAmount > 1) {
        userInfo.rainAmount = 100
        console.log(userInfo.rainAmount)
        res.render('empty')
    } else {
        res.render('emptyError')
    }
})

app.get('/settings', (req, res) => {
    const currentPage = 'settings'
    res.render('settings', { userInfo: userInfo, currentPage })
})

app.get('/statistics', (req, res) => {
    const currentPage = 'statistics'
    res.render('statistics', { userInfo: userInfo, currentPage })
})

app.get('/saved', (req, res) => {
    const currentPage = 'settings'
    res.render('saved', { userInfo: userInfo, currentPage })
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

app.post('/empty', (req, res) => {
    console.log('Emptying the rain barrel...');
    userInfo.rainAmount = 100;
    userInfo.rainBarrelEmptied = true; // Set this to true when the rain barrel is emptied
    res.status(200).json({ message: "Rain barrel emptied successfully." });
});



getWeatherData(52.52, 13.41, 'precipitation_sum', 'Europe/Berlin')
    .then(data => {
        if (!userInfo.rainBarrelEmptied) {
            let totalRain = userInfo.rainAmount || 0; // Start with the current amount of rain in the barrel
            let fullRainBarrelDay = '';
            let nextRainDay = '';
            let nextRainAmount = 0;
            data.daily.precipitation_sum.some((precipitation, index) => {
                totalRain += (precipitation * userInfo.roofSurface);
                if (totalRain > 400) { // Assuming 400 is the capacity of the barrel
                    fullRainBarrelDay = data.daily.time[index];
                    return true; // Stop the iteration when the barrel is full
                }
                if (precipitation > 0 && nextRainDay === '') {
                    nextRainDay = data.daily.time[index];
                    nextRainAmount = precipitation;
                }
                return false;
            });
            
            userInfo.rainAmount = parseFloat((totalRain > 400 ? 400 : totalRain).toFixed(1)); // rainAmount niet boven de 400.
            userInfo.fullRainBarrelDay = fullRainBarrelDay ? fullRainBarrelDay : 'Geen volle ton in de komende 7 dagen.';
            userInfo.nextRainDay = nextRainDay ? nextRainDay : 'Geen regen verwacht komende 7 dagen';
            userInfo.nextRainAmount = nextRainAmount;

            console.log(data)
            console.log(`Total rain collected: ${userInfo.rainAmount}`);
            console.log(`Day when the barrel will be full: ${userInfo.fullRainBarrelDay}`);
            console.log(`Next day of rain: ${userInfo.nextRainDay}`);
            console.log(`Amount of rain on next rainy day: ${userInfo.nextRainAmount}`);
        }
    })
    .catch(error => console.error(`Error: ${error}`));



function server() {
    console.log('The server is running succesfully! at http://localhost:3000/');
}

app.listen(port, server)