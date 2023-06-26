import { UserInfo } from './db.js';

export const collectAndStoreRainData = async (data, userInfo) => {
    const currentDayPrecipitation = data.daily.precipitation_sum[0];
    let totalRain = userInfo.rainAmount || 0;

    totalRain += (currentDayPrecipitation * userInfo.roofSurface);
    userInfo.totalRainCollected = userInfo.totalRainCollected ? userInfo.totalRainCollected + (currentDayPrecipitation * userInfo.roofSurface) : (currentDayPrecipitation * userInfo.roofSurface); // new line

    userInfo.rainAmount = parseFloat((totalRain > 400 ? 400 : totalRain).toFixed(1));

    // Save updated userInfo
    await userInfo.save();
}