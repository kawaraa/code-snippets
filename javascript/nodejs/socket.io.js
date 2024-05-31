("use strict");
const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const ws = require("socket.io")(server);

const chat = { users: [], typing: [] };
function login(user, id) {
  const index = chat.users.findIndex(usr => usr.userName === user.userName);
  if (index < 0) {
    user.id = id;
    chat.users.push(user);
  } else {
    chat.users[index].id = id;
    chat.users[index].status = "online";
  }
  return chat.users;
}
function logout(id) {
  chat.users.forEach(user => (user.id === id ? (user.status = "offline") : null));
  return chat.users;
}
function handleTypingStatus(data, newTypingUser) {
  const mySet = new Set(chat.typing);
  if (!newTypingUser) return chat.typing.filter(type => type !== data.name);
  !mySet.has(data.name) ? mySet.add(data.name) : mySet.delete(data.name);
  return [...mySet];
}

ws.on("connection", socket => {
  console.log(socket.id, ": Connected");
  socket.on("LOG_IN", data => {
    ws.sockets.emit("LOG_IN", login(data, socket.id));
    console.log(data.userName, " Logged in");
  });

  socket.on("MESSAGE", data => {
    console.log("Message from", data.userName);
    socket.broadcast.emit("MESSAGE", data);
  });

  socket.on("TYPE", data => {
    socket.broadcast.emit("TYPE", handleTypingStatus(data, true));
    console.log(data.name, " is typing");
  });

  socket.on("STOP_TYPING", data => {
    socket.broadcast.emit("STOP_TYPING", handleTypingStatus(data, false));
    console.log("Stopped typing");
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("LOG_OUT", logout(socket.id));
    console.log(socket.id, ": Disconnected");
  });
});

server.listen(3000);
console.log("Running... ");

// the client side
/*
  const socket = this.props.webSocket("http://localhost:3000", { origins, path });

    socket.on("connect", () => socket.emit("LOG_IN", this.props.user));
    socket.on("disconnect", reason => {
      console.log("Reason of disconnecting: ", reason);
      socket.emit("LOG_OUT", this.props.user);
    });
    socket.on("MESSAGE", data => this.addMessage(data));
    socket.on("TYPE", data => this.stopTyping(data));
    socket.on("STOP_TYPING", data => this.stopTyping(data));
    socket.on("LOG_IN", data => this.login(data));
    socket.on("LOG_OUT", data => this.login(data));
    socket.on("connect_error", error => {});
    socket.on("error", error => {});
    socket.on("connect_timeout", timeout => {});
*/

// convert data to buffer
// const byteArray = new Uint8Array(data);
// socket.send(byteArray.buffer);
