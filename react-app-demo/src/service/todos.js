class TodoService {
  constructor() {
    // this.url = "";
    this.todos = [];
  }
  async get() {
    // Query string can be here.
    return [...this.todos];
  }

  async create(todo) {
    // Validation can be here.
    todo.id = crypto.randomUUID();
    todo.timestamp = Date.now();
    this.todos.push(todo);
    return todo;
  }
  async delete(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
    return { success: true };
  }
  async update(todo) {
    // Validation can be here.
    const index = this.todos.findIndex((t) => t.id === todo.id);
    this.todos[index].task = todo.task;
    this.todos[index].status = todo.status;
    this.todos[index].priority = todo.priority;
    this.todos[index].timestamp = Date.now();
    return { success: true };
  }
}

export default new TodoService();
