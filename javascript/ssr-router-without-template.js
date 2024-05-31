const fs = require("fs");
const path = require("path");
const dirNames = fs.readdirSync(path.join(__dirname + "/pages"));

const addPage = (pagePath) => {
  const page = {};
  const controllerPath = path.join(__dirname + "/controller/" + pagePath.replace("hbs", "js"));
  const view = require("./pages/" + pagePath);
  if (!fs.existsSync(controllerPath)) page.render = view;
  else page.render = require(controllerPath).bind({ fetch, view, errorMessage });
  page.path = /home.hbs/gim.test(pagePath) ? "/" : pagePath.replace(".hbs", "");
  pages.push(page);
};

const lookForPages = (folderPath) => {
  const dirNames = fs.readdirSync(path.join(__dirname + "/pages/" + folderPath));
  dirNames.forEach((dirName) => {
    const filePath = path.join(__dirname + "/pages/" + folderPath + "/" + dirName);
    if (fs.statSync(filePath).isDirectory()) lookForPages(folderPath + "/" + dirName);
    else addPage(folderPath + "/" + dirName);
  });
};

dirNames.forEach((dirName) => {
  const filePath = path.join(__dirname + "/pages/" + dirName);
  if (fs.statSync(filePath).isDirectory()) lookForPages(dirName);
  else addPage("/" + dirName);
});

pages.forEach((page) => {
  if (page.private) app.use(page.path, firewall.authRequired);
  if (page.path === "/product") page.path += "/:id";
  if (page.path === "/checkout") return app.post(page.path, page.render);
  if (page.render.constructor.name === "AsyncFunction") return app.get(page.path, page.render);
  app.get(page.path, (req, res) => res.send(page.render(req, res)));
});
