export default class Time {
  /**
   * @param {Date} [time]
   */
  constructor(time) {
    let currentHour = time.getHours()
    if (currentHour > 12) {
      currentHour -= 12
    }
    this.currentHour = (currentHour < 10 ? "0" : "") + currentHour;
    if (currentHour == 0) {
      this.currentHour = 12;
    }
    let currentMinute = time.getMinutes()
    this.currentMinutes = (currentMinute < 10 ? "0" : "") + currentMinute;
  }

  get Template() {
    return `${this.currentHour}:${this.currentMinutes}`
  }
}