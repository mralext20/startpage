import store from "../store.js";

class CalendarIconService {
  update() {
    let today = new Date();
    store.commit('calendarIcon', `calendar-${today.getDate()}`);
  }
}

const service = new CalendarIconService();
export default service;
