import { UserInfo } from './db.js';

export const calculateAndStoreStatistics = async (data, userInfo) => {
    console.log(data)
    let fullRainBarrelDay = '';
    let nextRainDay = '';
    let nextRainAmount = 0;

    data.daily.precipitation_sum.some((precipitation, index) => {
        if (userInfo.rainAmount > 400 && fullRainBarrelDay === '') {
            fullRainBarrelDay = data.daily.time[index];
        }
        if (precipitation > 0 && nextRainDay === '') {
            nextRainDay = data.daily.time[index];
            nextRainAmount = precipitation;
        }
        return false;
    });

    userInfo.fullRainBarrelDay = fullRainBarrelDay ? fullRainBarrelDay : 'Geen volle ton in de komende 7 dagen.';
    userInfo.nextRainDay = nextRainDay ? nextRainDay : 'Geen regen verwacht komende 7 dagen';
    userInfo.nextRainAmount = nextRainAmount;

    // Save updated userInfo
    await userInfo.save();
}