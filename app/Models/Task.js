export default class TaskList {
  /**
   * @param {{ name: string; id?: number; }} data
   */
  constructor(data) {
    this.name = data.name;
    this.id = data.id || Date.now(); // create a new one if the id isnt set on the passed in
  }
  get Template() {
    return `<div><p><button class="" onclick="app.TasksController.delete(${this.id})">X</button> ${this.name}</div>`
  }
}