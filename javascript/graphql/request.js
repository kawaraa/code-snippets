const query1 = `
  query {
    Todo(id:5514){
      task
    }
  }
`;

const query = `
  mutation($input: NewTodo!) {
  CreateTodo(input: $input) {
    task
  }
}`;
const variables = { input: { task: "Hello World", priority: "low" } };

const url = "http://localhost:3010/service_graphql";
const opts = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query, variables })
};

fetch(url, opts)
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);

fetch(url, opts)
  .then(res => res.json())
  .then(
    ({ data }) => `
        <p>
          Favorite Lift: ${data.Lift.name} 
          Status: ${data.Lift.status}
        </p>
  `
  )
  .then(text => (document.body.innerHTML = text))
  .catch(console.error);
