import CalendarIconService from "../Services/CalendarIconService.js";
import store from "../store.js";

//Private
function _draw() {
  let calendarIconURL = store.State.calendarIcon;
  console.log(calendarIconURL);
  let target = document.getElementById('calenderIcon');
  // @ts-ignore
  target.src = calendarIconURL;
}

//Public
export default class CalendarIconController {
  constructor() {
    store.subscribe("calendarIcon", _draw);
    CalendarIconService.update()
    // how long until tomarrow?
    let now = new Date();
    let later = new Date();
    later.setDate(now.getDate() + 1) // set the later's day to tomarrow
    later.setHours(0, 0, 1, 0); // set the later's time to 0:0:1.0;

    let timediff = Math.abs(later - now);
    setTimeout(() => {
      CalendarIconService.update();
      setInterval(() => {
        CalendarIconService.update()
      }, 24 * 60 * 60 * 1000); // 24 hours * 06 minutes * 60 seconds * 1000 ms
    }, timediff);
  }
}
