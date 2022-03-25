#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getWeatherAxios } from "./services/api.service.js";
import {
  printError,
  printSuccess,
  printHelp,
  printWeather,
} from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Token not added");
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Token saved");
  } catch (error) {
    printError(error);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("City not added");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("City saved");
  } catch (error) {
    printError(error);
  }
};

const getForecast = async () => {
  try {
    const weather = await getWeatherAxios();
    printWeather(weather);
  } catch (error) {
    if (error?.response?.status === 404) {
      console.log("City name is wrong. Please try again");
    } else if (error?.response?.status === 401) {
      console.log("Token is wrong. Please try enter correct token");
    } else {
      printError("Error :" + error.message);
    }
  }
};

const initCLI = async () => {
  const args = getArgs(process.argv);
  if (args.h) {
    // show help
    printHelp();
  }
  if (args.s) {
    // save city
    return saveCity(args.s);
  }
  if (args.t) {
    // save token
    return saveToken(args.t);
  }

  return getForecast();
};

initCLI();
