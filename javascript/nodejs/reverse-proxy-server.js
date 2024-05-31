"use strict";
const http = require("http");
const ws = require("ws");

class FrontClientResolver {
  constructor(http, config) {
    this.http = http;
    this.config = config;
  }

  handleRequest(clientReq, clientRes) {
    const options = {
      hostname: this.config.hostname,
      port: this.config.port,
      path: clientReq.url,
      method: clientReq.method,
      headers: clientReq.headers
    };

    const serverReq = this.http.request(options, serverRes => {
      clientRes.writeHead(serverRes.statusCode, serverRes.headers);
      serverRes.pipe(
        clientRes,
        { end: true }
      );
    });

    serverReq.on("error", err => {
      console.log("Connection Error:", err);
      clientRes.status(404).end("Something wrong happened, Please try again later");
    });

    clientReq.pipe(
      serverReq,
      { end: true }
    );
  }
}

class LiveChatResolver {
  constructor(clientSocket, webSocket, url) {
    this.clientSocket = clientSocket;
    this.webSocket = webSocket;
    this.url = url;
  }
  start() {
    this.clientSocket.on("connection", (clientSocket, req) => {
      const serverSocket = new this.webSocket(this.url);
      this.linkSockets(clientSocket, serverSocket);
    });
  }
  linkSockets(cltSocket, svrSocket) {
    const clientSocket = this.webSocket.createWebSocketStream(cltSocket);
    const serverSocket = this.webSocket.createWebSocketStream(svrSocket);
    serverSocket.setEncoding("utf8");
    clientSocket.pipe(serverSocket).pipe(clientSocket);
  }
}

class ReverseProxyServer {
  constructor(http, ws, config, frontClient, liveChat, logger) {
    this._proxy = http.createServer(this.onRequest.bind(this));
    this.chatSocket = new ws.Server({ server: this._proxy, path: "/chat" });
    this.webSocket = ws;
    this.config = config;
    this.frontClientResolver = frontClient;
    this.graphqlAppResolver = graphqlApp;
    this.LiveChatResolver = liveChat;
    this.logger = logger;
  }

  start() {
    // - get the host ip and put in console.log
    // console.log(this._proxy.ip);
    this.url = `http://localhost:${this.config.port}`;
    const chatResolver = new this.LiveChatResolver(this.chatSocket, this.webSocket, this.config.chatUrl);
    chatResolver.start();

    this._proxy.listen(this.config.port || 8080, () =>
      this.logger.info(`ReverseProxyServer is running at: ${this.url}`)
    );
  }
  onRequest(request, response) {
    // this.logger.info(
    //   `Serve => ${request.protocol}://${request.get("host", "ip address") + request.url} :${new Date()}`
    // );

    switch (request.url) {
      case "/graphql":
      case "/graphql_app":
        this.graphqlAppResolver.handleRequest(request, response);
        break;
      default:
        this.frontClientResolver.handleRequest(request, response);
    }
  }
}

const frontClient = new FrontClientResolver(http, config);
const server = new ReverseProxyServer(http, ws, {}, frontClient, LiveChatResolver, "logger");
server.start();

module.exports = ReverseProxyServer;

// GET localhost:3000/ <=> localhost:3000      (frontClient)
// POST localhost:3000/ <=> localhost:3001     (GraphqlApp)
// GET localhost:3000/chat <=> localhost:3002  (livChat)
