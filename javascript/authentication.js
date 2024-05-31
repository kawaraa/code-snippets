"use strict";

// =============== Stateless Authentication System ===============

// illustrating of Web application In a stateless architecture
// This is a simplified code example illustrating how a stateless architecture might be implemented in a Node.js web application using Express.js

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware for JWT authentication
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authentication token is required" });
  }

  try {
    const decoded = jwt.verify(token, "secret_key");
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid authentication token" });
  }
};

// Route for retrieving blog posts (requires authentication)
app.get("/posts", authenticateUser, (req, res) => {
  // Retrieve blog posts from database
  const posts = [
    { id: 1, title: "Example Post 1", content: "Lorem ipsum dolor sit amet" },
    { id: 2, title: "Example Post 2", content: "Consectetur adipiscing elit" },
    // Additional posts...
  ];

  res.json(posts);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//

// =============== Session is a StateFull Authentication System (Solution-1) ===============

const express = require("express");
const cookie = require("cookie");

const users = [
  {
    name: "Ahmad",
    email: "info@gmail.com",
    password: "password",
    submit: "Submit",
    id: "id371wds59dw955ed594455dwd263user0wdwd633wd",
  },
];
const SessStore = [
  {
    userToken: "id0.20693325838861384user0.06555687407843447",
    cookieOptions: {
      domain: ".domain.com",
      path: "/",
      _expires: "2019-09-27T15:51:52.087",
      maxAge: 3600000,
      httpOnly: true,
      secure: false,
      sameSite: true,
    },
  },
  {
    anotherCookie: "Some_useful_string",
    cookieOptions: {
      maxAge: 3600000,
      sameSite: true,
    },
  },
];

function storeUser(newUser) {
  newUser.id = "id-user" + crypto.randomUUID();
  users.push(newUser);
  return newUser;
  // for hashing the password popular npm is bcrypt
}
function removeUser(id) {
  const index = users.findIndex((user) => user.id === id);
  users.splice(index - 1, 1);
  return true;
}
function checkUser(id, email) {
  if (email) return users.find((user) => user.email === email);
  return users.find((user) => user.id === id);
}
function checkUserCredentials(userCredentials) {
  const user = checkUser(null, userCredentials.email);
  if (!user) return null;
  if (user.password === userCredentials.password) return user;
  return null;
}
function authRequired(req, res, next) {
  const cookies = cookie.parse(req.headers.cookie);
  const userToken = cookies["userToken"];
  if (!userToken) return res.redirect("/login");
  const user = checkUser(userToken);
  if (!user) return res.redirect("/login");
  res.user = user;
  res.locals.user = user;
  const hour = 3600000;
  // req.session.cookie.expires = new Date(Date.now() + hour);
  // req.session.cookie.maxAge = hour;
  next();
}
function authNotRequired(req, res, next) {
  const cookies = cookie.parse(req.headers.cookie);
  const userToken = cookies["userToken"];
  if (!userToken) return next();
  const user = checkUser(userToken);
  if (!user) return next();
  return res.redirect("/");
}

const cookieOption = {
  // domain: ".domain.com", // this will include the subdomains as well
  // path: "/", // which URLs can the cookie be sent to
  expires: new Date(Date.now() + 900000), // when the cookie will expire
  // maxAge: 900000, // how log the cookie can last
  // httpOnly: true, // if true, no javascript can access the cookies, only accessible by server
  // secure: true //if true, it will only accept request from browser that use https
  // sameSite: true // means can only be sent from the domain, No CORS sharing.
  // signed: true // Indicates if the cookie should be signed
};
const app = express();
const appDirectory = process.cwd();

// app.set("trust proxy", 1); // trust first proxy
// app.set('title', 'My Site')
// app.use(express.static(appDirectory + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(["/user", "/logout"], authRequired);
app.use(["/signup", "/login"], authNotRequired);

app.get("/", authRequired, (req, res) => {
  const cookies = cookie.parse(req.headers.cookie);
  console.log("Cookie", cookies);
  res.send(getDashboard());
});
app.get("/user", (req, res) => {
  res.send({ user: "ahmad", id: "12312313Ahmad" });
});

app.get("/login", (req, res) => {
  console.log("object");
  res.send(getLoginForm());
});
app.post("/login", (req, res) => {
  const user = checkUserCredentials(req.body);
  if (!user) return res.send("Incorrect combination of Username / Password");
  // hash the cookie before sending it
  res.cookie("userToken", user.id, cookieOption);
  console.log("Logged in");
  res.redirect("/");
});

app.get("/signup", (req, res) => {
  res.send(getRegisterForm());
});
app.post("/signup", (req, res) => {
  const user = storeUser(req.body);
  if (!user) return res.send("Something wrong went please try again!");
  // hash the cookie before sending it
  res.cookie("userToken", user.id, cookieOption);
  console.log("Signed Up");
  res.redirect("/");
});

app.post("/logout", (req, res) => {
  res.clearCookie("userToken");
  console.log("Logged out");
  res.redirect("/login");
});

const getRegisterForm = () => `
<form method="post">
First Name: <input type="test" name="firstName" />
Last Name: <input type="test" name="LastName" />
Email: <input type="email" name="email" />
Confirm Email: <input type="email" name="confirmEmail" />
Password: <input type="password" name="password" />
Confirm Password: <input type="password" name="confirmPsw" />
<input type="submit" name="submit" />
</form>
`;
const getLoginForm = () => `
<form method="post">
Name: <input type="test" name="name" />
Email: <input type="email" name="email" />
Password: <input type="password" name="password" />
<input type="submit" name="Login" />
<a href="signup" >Signup</a>
</form>
`;
const getDashboard = () => `
<form method="post" action="/logout">
<h1> Welcome from Dashboard page <h1>
<input type="submit" name="submit" />
</form>
`;

// route for handling 404 requests(unavailable routes)
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(3000, () => console.log("The app is running at http://localhost:3000"));

//
// =============== Session is a StateFull Authentication System (Solution-2) ===============
// Using json web token
const express = require("express");
const cookie = require("cookie");
var jwt = require("jsonwebtoken");

const users = [
  {
    name: "Ahmad",
    email: "info@gmail.com",
    password: "password",
    submit: "Submit",
    id: "id371wds59dw955ed594455dwd263user0wdwd633wd",
  },
];

function storeUser(newUser) {
  newUser.id = "id-user" + crypto.randomUUID();
  users.push(newUser);
  return newUser;
  // for hashing the password use a popular npm called bcrypt
}
function removeUser(id) {
  const index = users.findIndex((user) => user.id === id);
  users.splice(index - 1, 1);
  return true;
}
function checkUser(id, email) {
  if (email) return users.find((user) => user.email === email);
  return users.find((user) => user.id === id);
}
function checkUserCredentials(userCredentials) {
  const user = checkUser(null, userCredentials.email);
  if (!user) return null;
  if (user.password === userCredentials.password) return user;
  return null;
}
function authRequired(req, res, next) {
  console.log("auth");
  const cookies = cookie.parse(req.headers.cookie);
  const userToken = cookies["userToken"];
  if (!userToken) return res.redirect("/login");
  const user = checkToken(userToken, "my-secret");
  if (!user) return res.redirect("/login");
  res.user = user;
  res.locals.user = user;
  const hour = 3600000;
  // req.session.cookie.expires = new Date(Date.now() + hour);
  // req.session.cookie.maxAge = hour;
  next();
}
function authNotRequired(req, res, next) {
  console.log("NotAuth");
  const cookies = cookie.parse(req.headers.cookie);
  const userToken = cookies["userToken"];
  if (!userToken) return next();
  const user = checkToken(userToken, "my-secret");
  if (!user) return next();
  return res.redirect("/");
}
function createToken(user, secretKey) {
  return jwt.sign(user, secretKey, { expiresIn: "1h" });
}
function checkToken(token, secretKey) {
  try {
    const decoded = jwt.verify(token, secretKey);
    const user = checkUser(decoded);
    return user;
  } catch (err) {
    return false;
  }
}
const cookieOption = {
  // domain: ".domain.com", // this will include the subdomains as well
  // path: "/", // which URLs can the cookie be sent to
  expires: new Date(Date.now() + 900000), // when the cookie will expire
  // maxAge: 900000, // how log the cookie can last
  // httpOnly: true, // if true, no javascript can access the cookies, only accessible by server
  // secure: true //if true, it will only accept request from browser that use https
  // sameSite: true // means can only be sent from the domain, No CORS sharing.
  // signed: true // Indicates if the cookie should be signed
};
const app = express();
const appDirectory = process.cwd();

// app.set("trust proxy", 1); // trust first proxy
// app.set('title', 'My Site')
// app.use(express.static(appDirectory + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(["/user", "/logout"], authRequired);
app.use(["/signup", "/login"], authNotRequired);

app.get("/", authRequired, (req, res) => {
  const cookies = cookie.parse(req.headers.cookie);
  console.log("Cookie", cookies);
  res.send(getDashboard());
});
app.get("/user", (req, res) => {
  res.send({ user: "ahmad", id: "12312313Ahmad" });
});

app.get("/login", (req, res) => {
  console.log("object");
  res.send(getLoginForm());
});
app.post("/login", (req, res) => {
  // Check the user and the password against the user in the database
  const user = checkUserCredentials(req.body);
  if (!user) return res.send("Incorrect combination of Username / Password");
  res.cookie("userToken", createToken(user, "my-secret"), cookieOption);
  console.log("Logged in");
  res.redirect("/");
});

app.get("/signup", (req, res) => {
  res.send(getRegisterForm());
});
app.post("/signup", (req, res) => {
  // Check the user and the password against the user in the database
  const user = storeUser(req.body);
  if (!user) return res.send("Something wrong went please try again!");
  res.cookie("userToken", createToken(user, "my-secret"), cookieOption);
  console.log("Signed Up");
  res.redirect("/");
});

app.post("/logout", (req, res) => {
  res.clearCookie("userToken");
  console.log("Logged out");
  res.redirect("/login");
});

const getRegisterForm = () => `
<form method="post">
First Name: <input type="test" name="firstName" />
Last Name: <input type="test" name="LastName" />
Email: <input type="email" name="email" />
Confirm Email: <input type="email" name="confirmEmail" />
Password: <input type="password" name="password" />
Confirm Password: <input type="password" name="confirmPsw" />
<input type="submit" name="submit" />
</form>
`;
const getLoginForm = () => `
<form method="post">
Name: <input type="test" name="name" />
Email: <input type="email" name="email" />
Password: <input type="password" name="password" />
<input type="submit" name="Login" />
<a href="register" >Signup</a>
</form>
`;
const getDashboard = () => `
<form method="post" action="/logout">
<h1> Welcome from Dashboard page <h1>
<input type="submit" name="submit" />
</form>
`;

// route for handling 404 requests(unavailable routes)
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(3000, () => console.log("The app is running at http://localhost:3000"));

/*
This how the token looks like when using google firebase auth

{
  "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhhMzY5M2YxMzczZjgwYTI1M2NmYmUyMTVkMDJlZTMwNjhmZWJjMzYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2stbXktd29yayIsImF1ZCI6ImstbXktd29yayIsImF1dGhfdGltZSI6MTU3NDE3MDY5MSwidXNlcl9pZCI6IjBGdWpZWFMwb0hnQnBjalNObDREUGJ6Z3lVNDMiLCJzdWIiOiIwRnVqWVhTMG9IZ0JwY2pTTmw0RFBiemd5VTQzIiwiaWF0IjoxNTc0NDE1MTY0LCJleHAiOjE1NzQ0MTg3NjQsImVtYWlsIjoiYWhtYTZkQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhaG1hNmRAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.aNvaI24AO8NN8ydZLQn9aNQ1znGrRdxRKcvx-_NRMzlnxCFwAiHvgq1qHV4YzXMy7igUaJor42TJ92XPDhlDJ2jAPPisTecbKrcWDJBsq6ezvul7Sz_YaqGFLFj60DolbdSp1kBubTFcf6njcM1eAwNoEuMSWu0-K8ozsuWrBKVifOLHfkZOcP76vhqPM78inYdRJyc7joJQbVmcW2WdPghxSrARM2GnOdgXo7X3EX3UR7EbL_MJDBcQqxws744pOZYBUQfJ4h-WcKyd5iCCUR65c610_6hnqmdPxuLTHO5DraJqrhxAVV0RzpIswwZBhv_ny34vzEmqDT1l8-KVvA",
  "expires_in": "3600",
  "token_type": "Bearer",
  "refresh_token": "AEu4IL2rbTyHC2HLSEThjfIiP9WtQxPP7LCf900FE96jJkB_eTe0dIlgbG-BZwJq9C30iztkUuEnYZJl2mh4pZv-Db9c1-fuuwjXkl6Vycb_6YNyzhfj85sMfR-dgWv4dkOL36gV19vmMEwayj3YqFujQSZLTu5nKH4xUexkc0_iFczIraAz7wPLWVyidTbGt4h3H2imaKGu",
  "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhhMzY5M2YxMzczZjgwYTI1M2NmYmUyMTVkMDJlZTMwNjhmZWJjMzYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2stbXktd29yayIsImF1ZCI6ImstbXktd29yayIsImF1dGhfdGltZSI6MTU3NDE3MDY5MSwidXNlcl9pZCI6IjBGdWpZWFMwb0hnQnBjalNObDREUGJ6Z3lVNDMiLCJzdWIiOiIwRnVqWVhTMG9IZ0JwY2pTTmw0RFBiemd5VTQzIiwiaWF0IjoxNTc0NDE1MTY0LCJleHAiOjE1NzQ0MTg3NjQsImVtYWlsIjoiYWhtYTZkQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhaG1hNmRAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.aNvaI24AO8NN8ydZLQn9aNQ1znGrRdxRKcvx-_NRMzlnxCFwAiHvgq1qHV4YzXMy7igUaJor42TJ92XPDhlDJ2jAPPisTecbKrcWDJBsq6ezvul7Sz_YaqGFLFj60DolbdSp1kBubTFcf6njcM1eAwNoEuMSWu0-K8ozsuWrBKVifOLHfkZOcP76vhqPM78inYdRJyc7joJQbVmcW2WdPghxSrARM2GnOdgXo7X3EX3UR7EbL_MJDBcQqxws744pOZYBUQfJ4h-WcKyd5iCCUR65c610_6hnqmdPxuLTHO5DraJqrhxAVV0RzpIswwZBhv_ny34vzEmqDT1l8-KVvA",
  "user_id": "0FujYXS0oHgBpcjSNl4DPbzgyU43",
  "project_id": "750453950020"
}

*/
