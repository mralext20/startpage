export default class Time {
  /**
   * @param {Date} [time]
   */
  constructor(time) {
    let currentHour = time.getHours()
    if (currentHour > 12) {
      currentHour -= 12 // from 24 h
    }
    if (currentHour == 0) {// edge case when hours is 12
      currentHour = 12;
    }
    this.currentHour = currentHour;

    let currentMinute = time.getMinutes()
    this.currentMinutes = (currentMinute < 10 ? "0" : "") + currentMinute;
  }

  get Template() {
    return `${this.currentHour}:${this.currentMinutes}`
  }
}