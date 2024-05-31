const { countries } = require("k-utilities");

class Firewall {
  constructor(cookie, jwt, notFoundPage) {
    this.cookie = cookie;
    this.jwt = jwt;
    this.notFoundPage = notFoundPage;
    this.config = { ...env.FIREWALL, api: env.API };
    this.authRequired = this.authenticationRequired.bind(this);
    this.authNotRequired = this.authenticationNotRequired.bind(this);
  }

  authenticationRequired(request, response, next) {
    if (!request.user.id) return response.redirect("/auth/login");
    next();
  }
  authenticationNotRequired(request, response, next) {
    if (request.user.id) return response.redirect("/");
    next();
  }
}

module.exports = Firewall;
