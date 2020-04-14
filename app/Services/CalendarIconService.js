import store from "../store.js";

class CalendarIconService {
  update() {
    let today = new Date();
    // https://www.gstatic.com/calendar/images/dynamiclogo/1x/cal_${DAY}.png 
    let url = `https://www.gstatic.com/calendar/images/dynamiclogo/1x/cal_${today.getDate()}.png`
    store.commit('calendarIcon', url);
  }
}

const service = new CalendarIconService();
export default service;
