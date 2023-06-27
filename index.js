import express from 'express';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { getWeatherData } from './functions/weatherAPI.js';
import { UserInfo } from './functions/db.js';
import cron from 'node-cron';
import { collectAndStoreRainData } from './functions/collectAndStoreRainData.js';
import { calculateAndStoreStatistics } from './functions/calculateAndStoreStatistics.js';

const app = express();
const port = 4400;
app.use(express.urlencoded({ extended: true }));
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

  app.get('/', async (req, res) => {
    const currentPage = 'home'
    let options = { day: 'numeric', month: 'long', year: 'numeric' };
    let currentDate = new Date().toLocaleDateString('nl-NL', options);
    try {
        // Get the most recent UserInfo from the database
        const userInfo = await UserInfo.findOne().sort('-_id').exec();
        
        if (userInfo) { // check if userInfo is not null
            console.log(`Rendering index page with rain amount: ${userInfo.rainAmount}`);
            if (userInfo.rainBarrels == null) {
                res.render('zero', { currentDate: currentDate })
            } else {
                res.render('index', { userInfo: userInfo, currentDate: currentDate, currentPage })
            }
        } else { // in case userInfo is null
            res.render('zero', { currentDate: currentDate }) 
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.post('/firstInfo', async (req, res) => {  // Note the 'async' keyword added here
    console.log('firstInfo doet het');
    const userInfo = new UserInfo({
        roofSurface: req.body.boardingDak,
        rainBarrels: req.body.boardingPijpen,
        waterDrains: req.body.boardingTonnen,
        rainAmount: 0, 
        totalRainCollected: 0, // Initialize totalRainCollected to 0
        rainBarrelEmptied: false,
    });

    try {
        const doc = await userInfo.save();  // Await the save operation
        await updateWeatherData();  // Fetch and calculate weather data after saving
        return res.redirect('/');
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
});


app.get('/getUserInfo', (req, res) => {
    UserInfo.find({}, (err, userInfos) => {  // Find all UserInfo documents
        if (err) return res.status(500).send(err);
        return res.status(200).send(userInfos);  // Send the found documents back to the client
    });
});

app.get('/empty', (req, res) => {
    console.log(userInfo.rainAmount)
    if (userInfo.rainAmount > 1) {
        userInfo.rainAmount = 50
        console.log(userInfo.rainAmount)
        res.render('empty')
    } else {
        res.render('emptyError')
    }
});

app.get('/settings', async (req, res) => {
    const currentPage = 'settings';
    try {
        const userInfo = await UserInfo.findOne().sort('-_id').exec();
        res.render('settings', { userInfo: userInfo, currentPage });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/statistics', async (req, res) => {
    const currentPage = 'statistics';
    try {
        const userInfo = await UserInfo.findOne().sort('-_id').exec(); // Use appropriate DB call here

        res.render('statistics', { 
            userInfo: userInfo, 
            currentPage, 
            nextRainDay: userInfo.nextRainDay,
            fullRainBarrelDay: userInfo.fullRainBarrelDay,
            totalRainCollected: userInfo.totalRainCollected // new line
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/saved', (req, res) => {
    const currentPage = 'settings'
    res.render('saved', { userInfo: userInfo, currentPage })
})

app.post('/edit', async (req, res) => {
    const currentPage = 'settings';
    try {
        const updatedUserInfo = await UserInfo.findOneAndUpdate(
            {}, 
            {
                roofSurface: req.body.Dakoppervlak,
                waterDrains: req.body.Regenpijpen,
                rainBarrels: req.body.Regentonnen
            },
            {
                new: true, // This option asks mongoose to return the updated userInfo
                useFindAndModify: false // To deal with MongoDB deprecation warning
            }
        );

        if (!updatedUserInfo) {
            return res.status(404).send();
        }

        // Render the settings page with the updated user info
        return res.render('settings', { userInfo: updatedUserInfo, currentPage });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

app.get('/offline', (req, res) => {
    res.render('offline')
})

app.post('/empty', async (req, res) => {
    try {
        console.log('Emptying the rain barrel...');
        const userInfo = await UserInfo.findOne().sort('-_id').exec();
        userInfo.rainAmount = 50;
        userInfo.rainBarrelEmptied = true; // Set this to true when the rain barrel is emptied
        await userInfo.save();
        res.status(200).json({ message: "Rain barrel emptied successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to empty the rain barrel." });
    }
}); 

// /reset reset alle data.
app.get('/reset', async (req, res) => {
    try {
        await UserInfo.deleteMany({});
        res.send("All user data has been deleted.");
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

async function updateWeatherData() {
    try {
        const userInfo = await UserInfo.findOne().sort('-_id').exec();
        const data = await getWeatherData(52.37, 4.89, 'precipitation_sum', 'Europe/Berlin');
        await collectAndStoreRainData(data, userInfo);
        await calculateAndStoreStatistics(data, userInfo);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

cron.schedule('* * * * *', () => {
    console.log('Updating weather data...');
    updateWeatherData();
});

function server() {
    console.log('The server is running succesfully! at http://localhost:3000/');
}

app.listen(port, () => {
    console.log('The server is running successfully! at http://localhost:3000/');
});