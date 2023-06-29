import fetch from "node-fetch";

export const getWeatherData = async (latitude, longitude, daily, timezone) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=${daily}&timezone=${encodeURIComponent(
    timezone
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unknown error occurred while fetching weather data"
      );
    }

    return data;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};
