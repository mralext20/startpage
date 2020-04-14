import store from "../store.js";
import Time from "../Models/Time.js"

class TimeService {
  update() {
    store.commit('time', new Time(new Date()));
  }
}

const service = new TimeService();
export default service;
