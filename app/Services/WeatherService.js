import store from "../store.js";
import config from "../config.js"
import Weather from "../Models/Weather.js";
import { getJson } from "../utils.js"


class WeatherService {
  async update() {
    let ferinhight, celcius
    try {
      ferinhight = await getJson(config.weatherFUrl)
      celcius = await getJson(config.weatherCUrl)
    } catch (error) {
      return
    }

    let weather = new Weather(
      {
        outTemp: celcius.stats.current.outTemp,
        insideTemp: celcius.stats.current.insideTemp,
        windDirection: ferinhight.stats.current.windDirText.trim(),
        wind: ferinhight.stats.current.windSpeed,
        windGust: ferinhight.stats.current.windGust,
        rain: ferinhight.stats.sinceMidnight.rainSum
      })
    store.commit('weather', weather)

  }
}

const service = new WeatherService();
export default service;
