class Action {
  // constructor(url) {
  //   this.url = url || "http://localhost:3001/gateway_graphql";
  // }
  static async post(query, variables = {}) {
    const url = "http://localhost:3001/graphql_app";
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    };
    const data = await fetch(url, opts).then((res) => res.json());
    return data.data;
  }

  static async fetch(query, variables) {
    const data = await this.post(query, variables);
    return data.todos;
  }

  static async create(todo) {
    const query = `mutation ($input:NewTodo!){
      createTodo(input:$input){
        id
        task
        priority
        status
        timestamp
      }
    }`;
    const data = await this.post(query, { input: todo });
    return data.createTodo;
  }

  static async update(updatedTodo) {
    const variables = {
      id: updatedTodo.id,
      task: updatedTodo.task,
      priority: updatedTodo.priority,
      status: updatedTodo.status,
    };
    const query = `mutation ($input:UpdatedTodo!){
      updateTodo(input:$input){
        id
        task
        priority
        status
        timestamp
      }
    }`;
    const data = await this.post(query, { input: variables });
    return data.updateTodo;
  }

  static async delete(todo) {
    const query = `mutation {
      deleteTodo(id: "${todo.id}")
    }`;
    const data = await this.post(query);
    return data.deleteTodo;
  }
}
