export default class Weather {

  /**
   * @param {{ outTemp: string; insideTemp: string; wind: string; windGust: string; windDirection: string; rain: string; }} [data]
   */
  constructor(data) {
    this.outTemp = isNaN(parseFloat(data.outTemp)) ? undefined : parseFloat(data.outTemp)
    this.insideTemp = isNaN(parseFloat(data.insideTemp)) ? undefined : parseFloat(data.insideTemp)
    this.wind = isNaN(parseFloat(data.wind)) ? undefined : parseFloat(data.wind)
    let windGustParsed = isNaN(parseFloat(data.windGust)) ? undefined : parseFloat(data.windGust);
    this.windGust = windGustParsed == this.wind ? windGustParsed : undefined;
    this.windDirection = data.windDirection
    this.rain = isNaN(parseFloat(data.rain)) || parseFloat(data.rain) == 0 ? undefined : parseFloat(data.rain);
  }

  get Template() {
    let out = `<svg class="icon w-8"><use href="assets/sprites.svg#thermometer"></use></svg>:${this.outTemp}&#176;C <svg class="icon w-18"><use href="assets/sprites.svg#home"></use></svg>:${this.insideTemp}&#176;C`;
    if (this.wind) {
      let wind = ` \uD83C\uDF2C: ${this.windDirection} ${this.wind}`;
      if (this.windGust) {
        wind += `G${this.windGust}`
      }
      wind += ' MPH';
      out += wind;
    }
    if (this.rain) {
      out += `<svg class="icon w-12"><use href="assets/sprites.svg#raindrop"></use></svg>: ${this.rain} IN`
    }
    return out;
  }

}