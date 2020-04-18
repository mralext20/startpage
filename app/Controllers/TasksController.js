import TasksService from "../Services/TasksService.js";
import store from "../store.js";

//Private

const _settingsTemplate = /*html*/`
<input id="JSONdump" type="text"/>
<a class="btn" onclick="app.TasksController.import(document.getElementById('JSONdump'))" title="import">
  <svg class="icon w-16">
    <use href="assets/sprites.svg#upload">
    </use>
  </svg>
</a>
&NonBreakingSpace;
<a class="btn" onclick="app.TasksController.export(document.getElementById('JSONdump'))" title="export">
  <svg class="icon w-16">
    <use href="assets/sprites.svg#download">
    </use>
  </svg>
</a>
`

function _draw() {
  let target = document.getElementById('tasksList');
  if (!store.State.tasksShowSettings) {
    let tasks = store.State.tasks

    let template = "";
    tasks.forEach(task => {
      template += task.Template;
    })
    target.innerHTML = template;
  } else {
    target.innerHTML = _settingsTemplate;
    // @ts-ignore
    document.getElementById('JSONdump').value = TasksService.JSONdump
  }
}

//Public
export default class TasksController {
  constructor() {
    store.subscribe("tasks", _draw);
    store.subscribe("tasksShowSettings", _draw);
    TasksService.init()
  }

  /**
   * @param {HTMLInputElement} element
   */
  addTask(element) {

    TasksService.addTask(element.value);
    element.value = ""
    element.focus();
  }
  /**
   * @param {number} id
   */
  delete(id) {
    TasksService.delete(id);
  }

  toggleSettings() {
    store.commit('tasksShowSettings', !store.State.tasksShowSettings);
  }
  /** @param {HTMLInputElement} elm */
  import(elm) {
    TasksService.JSONdump = elm.value;
    this.toggleSettings()
  }
  /** @param {HTMLInputElement} elm */
  export(elm) {
    elm.value = TasksService.JSONdump;
    elm.select();
    document.execCommand('copy');
  }
}