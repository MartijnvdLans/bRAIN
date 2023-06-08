import express from 'express';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { getWeatherData } from './functions/weatherAPI.js';

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
        precipitation_sum: [ 2.00, 2.00] // Adjust these values for different tests
      }
    };
  
    let totalRain = 0;
    fakeData.daily.precipitation_sum.forEach((precipitation) => {
      totalRain += precipitation;
    });
    
    userInfo.roofSurface = 32; 
    userInfo.rainAmount = (totalRain * userInfo.roofSurface).toFixed(1);
    if (userInfo.rainAmount > 200) {
        userInfo.rainAmount = 200;
    }
    console.log(`Total rain collected: ${userInfo.rainAmount}`);
}
  }
  
  // Run the test
  testRainCollection();

  app.get('/', (req, res) => {
    console.log(`Rendering index page with rain amount: ${userInfo.rainAmount}`);
    if (userInfo.rainBarrels == null) {
        res.render('zero')
    } else {
        res.render('index', { userInfo: userInfo })
    }
});

app.get('/test', (req, res) => {
    testRainCollection(); 
    res.render('index', { userInfo: userInfo });
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

app.post('/empty', (req, res) => {
    console.log('Emptying the rain barrel...');
    userInfo.rainAmount = 0;
    userInfo.rainBarrelEmptied = true; // Set this to true when the rain barrel is emptied
    res.status(200).json({ message: "Rain barrel emptied successfully." });
});

app.get('/', (req, res) => {
    console.log(`Serving the main page with rainAmount = ${userInfo.rainAmount}`);
    // Rest of your code...
});

getWeatherData(52.30, 5.62, 'precipitation_sum', 'Europe/Berlin')
    .then(data => {
        // Only update rainAmount if the rain barrel has not been emptied
        if (!userInfo.rainBarrelEmptied) {
            // Your existing code...
        }
    })
    .catch(error => console.error(`Error: ${error}`));

    getWeatherData(52.30, 5.62, 'precipitation_sum', 'Europe/Berlin')
    .then(data => {
        if (!userInfo.rainBarrelEmptied) {
            // Your existing code...
       
        let totalRain = 0;
        data.daily.precipitation_sum.forEach((precipitation) => {
            totalRain += precipitation;
        });
        userInfo.rainAmount = parseFloat((totalRain * userInfo.roofSurface).toFixed(1));
      
        console.log(`Total rain collected: ${userInfo.rainAmount}`);
    }
    })
    .catch(error => console.error(`Error: ${error}`));


function server() {
    console.log('The server is running succesfully! at http://localhost:3000/');
}

app.listen(port, server)