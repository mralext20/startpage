export default class TaskList {
  /**
   * @param {{ name: string; id?: number; }} data
   */
  constructor(data) {
    this.name = data.name;
    this.id = data.id || Date.now(); // create a new one if the id isnt set on the passed in
  }
  get Template() {
    return `<div><p><a class="btn" onclick="app.TasksController.delete(${this.id})">X</a> ${this.name}</div>`
  }
}