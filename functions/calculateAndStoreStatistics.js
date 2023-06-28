import { UserInfo } from './db.js';

export const calculateAndStoreStatistics = async (data, userInfo) => {
    let fullRainBarrelDay = '';
    let nextRainDay = '';
    let nextRainAmount = 0;

    // Tijdelijke variabele voor regenhoeveelheden
    let projectedRainAmount = userInfo.rainAmount;

    for (let index = 0; index < data.daily.precipitation_sum.length; index++) {
        const precipitation = data.daily.precipitation_sum[index];
        
        const rainInLitres = userInfo.roofSurface * precipitation;

        // Toevoegen aan projected hoeveelheid
        projectedRainAmount += rainInLitres;
        
        // Als het de eerste rainy day is noteer
        if (precipitation > 0 && nextRainDay === '') {
            nextRainDay = data.daily.time[index];
            nextRainAmount = precipitation;
        }

        // Als de ton vol is en het is de eerste keer
        if (projectedRainAmount >= 400 && fullRainBarrelDay === '') {
            fullRainBarrelDay = data.daily.time[index];
            // Stopt het toevoegen als het niet meer nodig is.
            break;
        }
    }

    userInfo.fullRainBarrelDay = fullRainBarrelDay ? fullRainBarrelDay : 'Niet bekend';
    userInfo.nextRainDay = nextRainDay ? nextRainDay : 'Geen regen verwacht komende 7 dagen';
    userInfo.nextRainAmount = nextRainAmount;

    // Save updated userInfo
    await userInfo.save();
}