const http = require("http");
const fs = require("fs");

class Server {
  constructor(config, htmlResolver, reactResolver, logger) {
    this.config = config;
    this.htmlResolver = htmlResolver;
    this.reactResolver = reactResolver;
    this.logger = logger;
    this.initialize();
  }

  initialize() {
    this.config.port = process.env.PORT || 3000;
    this._publicDir = process.cwd() + "/client/static";
    this._proxy = http.createServer(this.config.options, this.onRequest.bind(this));
  }
  start() {
    // - get the host ip and put in console.log
    // console.log(this._proxy.ip);
    this.url = `http://localhost:${this.config.port}`;

    this._proxy.listen(this.config.port, () => this.logger.info(`Server is running at: ${this.url}`));
  }
  onRequest(request, response) {
    // this.logger.info(
    //   `Serve => ${request.protocol}://${request.get("host", "ip address") + request.url} :${new Date()}`
    // );
    console.log("Root: ", request.url);

    // Website you wish to allow to connect
    response.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    // Request headers you wish to allow
    response.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader("Access-Control-Allow-Credentials", true);

    // serving static file by file name
    if (this.serveStaticHtmlFile(request, response)) return;

    if (/^\/shopping_cart/.test(request.url)) {
      return this.reactResolver.resolve(request, response, this.config.shoppingCart, false);
    }
    if (/^\/search/.test(request.url)) {
      //  navbar + search bar + filter based on typed item + search result + footer
      return this.htmlResolver.resolve(request, response, this.config.search, false);
    }
    if (/^\/category/.test(request.url)) {
      //  navbar + search bar + filter based on selected category + search result + footer
      return this.htmlResolver.resolve(request, response, this.config.category, false);
    }
    if (/^\/item/.test(request.url)) {
      // navbar + item by id + footer
      return this.htmlResolver.resolve(request, response, this.config.item, false);
    }
    switch (request.url) {
      case "/navbar":
        this.htmlResolver.resolveLayout(request, response, true);
        break;
      case "/footer":
        this.htmlResolver.resolveLayout(request, response);
        break;
      default:
        // navbar + search bar + slide + suggested products + category list + footer
        this.htmlResolver.resolveHomePage(request, response, this.config.homepage, false);
    }
  }
  serveStaticHtmlFile(request, response) {
    const url = this._publicDir + request.url;
    const filePath = /\s(\.html)$/.test(url) ? url : url + ".html";

    const exist = fs.existsSync(filePath);
    if (!exist) return false;

    const stream = fs.createReadStream(filePath);

    stream.on("error", (error) => {
      response.statusCode = 500;
      response.end(`Something unexpected happened please try again!`);
    });

    stream.on("open", () => {
      response.writeHeader(200, { "Content-type": "text/html" });
      stream.pipe(response);
    });

    return true;
    // Or  maps file extention to MIME types by using this.config.mimeType
  }
}

// function getLocalNetworkIpAddress() {
//   const nets = require("os").networkInterfaces();
//   const results = {};

//   for (const name of Object.keys(nets)) {
//     for (const net of nets[name]) {
//       // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
//       if (net.family === "IPv4" && !net.internal) {
//         if (!results[name]) results[name] = [];
//         results[name].push(net.address);
//       }
//     }
//   }
//   return results["en0"] && results["en0"][0] ? results["en0"][0] : null;
// }

// const hostname = getLocalNetworkIpAddress();

// server.listen(port, "0.0.0.0", () => {
//   console.log(
//     `Server running
//       On local machine at: http://localhost:${port}
//       ${hostname ? `On local network at: http://${hostname}:${port}` : ""}`
//   );
// });

const server = new Server(http, {});
server.start();

// Setup SSL
// Setup Logging
// Setup Authentication & Authorization
// Setup Caching, and also for not server side rendering app
// Setup Content Compression
// Setup Rates Limit

// =============== Server with redirect to HTTPS ===============

// const express = require("express");
// const path = require("path");
// const fs = require("fs");
// const https = require("https");

// const httpPort = 80;
// const httpsPort = 443;
// const key = fs.readFileSync("./certs/localhost.key");
// const cert = fs.readFileSync("./certs/localhost.crt");

/**
 * To generate the self-signed certificates, go to the certs folder and run the following on the command line.
 *
 * openssl req -x509 -out localhost.crt -keyout localhost.key -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -extensions EXT -config <(printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
 */

// const app = express();
// const server = https.createServer({ key: key, cert: cert }, app);

// app.use((request, response, next) => {
//   if (!request.secure) {
//     return response.redirect("https://" + request.headers.host + request.url);
//   }
//   next();
// });

// app.use(express.static(path.join(__dirname, "public")));

// app.listen(httpPort, function () {
//   console.log(`Listening on port ${httpPort}!`);
// });

// server.listen(httpsPort, function () {
//   console.log(`Listening on port ${httpsPort}!`);
// });
