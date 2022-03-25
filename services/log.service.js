import chalk from "chalk";
import dedent from "dedent-js";
import { getIcon } from "./api.service.js";

const printError = (error) => {
  console.log(chalk.bgRed(" Error ") + " " + error);
};
const printSuccess = (msg) => {
  console.log(chalk.bgGreen(" Success ") + " " + msg);
};
const printHelp = () => {
  console.log(
    dedent(`${chalk.bgCyan(" HELP ")} 
	 Without any parameters  - show weather
	 -h - show help
	 -s [CITY] - set the city
	 -t [API_KEY] - set the api key`)
  );
};
const printWeather = (res) => {
  console.log(
    dedent(`${chalk.bgYellowBright(" SUCCESS ")} 
		 The weather in ${res.name} is:
		${getIcon(res.weather[0].icon)}  ${res.weather[0].description}
		Temp: ${res.main.temp.toFixed(0)} t° ( feels like ${res.main.feels_like.toFixed(0)} t° )
		Temp min: ${res.main.temp_min.toFixed(0)} t°
		Temp max: ${res.main.temp_max.toFixed(0)} t°
		Pressure: ${res.main.pressure.toFixed(0)} mm
		Humidity: ${res.main.humidity.toFixed(0)} %

		Wind speed: ${res.wind.speed.toFixed(1)} m/sec
		`)
  );
};

export { printError, printSuccess, printHelp, printWeather };
