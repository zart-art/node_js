import axios from "axios";
// import https from "https";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const getWeatherAxios = async () => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  const city = await getKeyValue(TOKEN_DICTIONARY.city);

  if (!token) {
    throw new Error(
      "There is no token. Please set token using flag -t [API_KEY]. Token can be registered with the https://openweathermap.org/"
    );
  }
  if (!city) {
    throw new Error("Please set the city using flag -s [CITY]");
  }

  const { data } = await axios.get(BASE_URL, {
    params: {
      q: city,
      appid: token,
      lang: "ru",
      units: "metric",
    },
  });
  return data;
};

const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case "01":
      return "☀️";
    case "02":
      return "🌤️";
    case "03":
      return "☁️";
    case "04":
      return "☁️";
    case "09":
      return "🌧️";
    case "10":
      return "🌦️";
    case "11":
      return "🌩️";
    case "13":
      return "❄️";
    case "50":
      return "🌫️";
  }
};

export { getWeatherAxios, getIcon };

// const getWeatherHttps = async (city) => {
//   const token = await getKeyValue(TOKEN_DICTIONARY.token);
//   if (!token) {
//     throw new Error(
//       "There is no token. Please set token using flag -t [API_KEY]. Token can be registered with the https://openweathermap.org/"
//     );
//   }
//   const url = new URL(`${BASE_URL}`);
//   url.searchParams.append("q", city);
//   url.searchParams.append("appid", token);
//   url.searchParams.append("lang", "ru");
//   url.searchParams.append("units", "metric");
//   https.get(url, (response) => {
//     let res = "";
//     response.on("data", (chunk) => {
//       res += chunk;
//     });

//     response.on("end", () => {
//     //   console.log(res);
//     });
//   });
// };
