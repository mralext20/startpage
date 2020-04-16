import store from "../store.js";
import Task from "../Models/Task.js"

function _writeToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(store.State.tasks))
}


class TaskService {
  /**
   * @param {string} name
   */
  addTask(name) {
    let newtask = new Task({ name });
    let newTasks = [...store.State.tasks, newtask]
    store.commit('tasks', newTasks)

  }
  init() {
    let tasksString = localStorage.getItem("tasks");
    let tasks;
    if (tasksString) {
      let data = JSON.parse(tasksString)
      tasks = data.map(task => new Task(task))
    } else {
      tasks = [];
    }
    store.commit('tasks', tasks);
    store.subscribe('tasks', _writeToLocalStorage);
  }
  /**
   * @param {number} id
   */
  delete(id) {
    let tasks = store.State.tasks.filter(e => e.id != id);
    store.commit('tasks', tasks);
  }
  get JSONdump() {
    return JSON.stringify(store.State.tasks)
  }
  set JSONdump(json) {
    let data = JSON.parse(json)
    let parsed = data.map(e => new Task(e));
    store.commit('tasks', parsed)
  }
}

const service = new TaskService();
export default service;
