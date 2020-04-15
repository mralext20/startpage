import TasksService from "../Services/TasksService.js";
import store from "../store.js";

//Private
function _draw() {
  let tasks = store.State.tasks
  let template = "";
  tasks.forEach(task => {
    template += task.Template;
  })
  let target = document.getElementById('tasksList');
  target.innerHTML = template;
}

//Public
export default class TasksController {
  constructor() {
    store.subscribe("tasks", _draw);
    TasksService.init()
  }

  /**
   * @param {Event} event
   */
  addTask(event) {
    event.preventDefault();
    let form = event.target
    // @ts-ignore
    TasksService.addTask(form.newTask.value);
    // @ts-ignore
    form.newTask.value = "";
    // @ts-ignore
    form.newTask.focus();
  }
  /**
   * @param {number} id
   */
  delete(id) {
    TasksService.delete(id);
  }
}