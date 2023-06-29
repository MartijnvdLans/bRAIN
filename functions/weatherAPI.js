import fetch from 'node-fetch';

export const getWeatherData = async (latitude, longitude, daily, timezone) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=${daily}&timezone=${encodeURIComponent(timezone)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      // The response was not OK, throw an error
      throw new Error(data.message || 'Unknown error occurred while fetching weather data');
    }

    // Return data if everything went well
    return data;
  } catch (error) {
    // The error could be from fetch or if the response was not ok.
    console.error(`Error: ${error}`);
    throw error; // This will allow the calling function to handle the error as needed
  }
};

