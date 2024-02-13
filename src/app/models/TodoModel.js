/**
 * TODO Model as defined in Strapi
 */
import { dismiss, edit, save } from "../controllers/TodoController";

class TodoModel {
  constructor(user, title, description, finished = false, id = undefined) {
    this.user = user;
    this.description = description;
    this.finished = finished;
    this.id = id;
  }

  // save todo to strapi
  async save() {
    const id = await save(this);
    if (!id) {
      throw new Error("Todo could not be saved");
    }
    this.id = id;
    return true;
  }

  async edit() {
    if (!this.id) {
      throw new Error("Cannot edit TODO before it was saved");
    }
    const edited = await edit(this);

    if (!edited) {
      throw new Error("Todo could not be edited");
    }
    return true;
  }

  async dismiss() {
    if (!this.id) {
      throw new Error("Cannot delete TODO before i was saved");
    }
    const dismissed = await dismiss(this);
    if (!dismissed) {
      throw new Error("Todo could not be deleted");
    }
    return true;
  }
}

export default TodoModel;
