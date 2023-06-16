import fetch from 'node-fetch';

export const getWeatherData = (latitude, longitude, daily, timezone) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=${daily}&timezone=${encodeURIComponent(timezone)}`;

  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(`Error: ${error}`));
}

